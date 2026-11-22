#!/usr/bin/env python3
"""Run many feature-factory loops in parallel, respecting dependencies between features.

  scripts/factory/launch.sh '#12' '#15' "add a testimonials section"
  scripts/factory/launch.sh --label factory -j 3
  scripts/factory/launch.sh --wait-merge '#12' '#15'
  scripts/factory/launch.sh --dry-run '#12' '#15'

Flow:
  1. Resolve items (issues + free text) and read "Depends on #N" style declarations from issue bodies.
  2. Batch planning: the batch-planner agent (Opus) writes .factory/batches/<id>/graph.json
     (skipped for a single item or with --no-plan). Declared dependencies are always enforced.
  3. You confirm the graph ([y]es / [e]dit / [n]o), unless --yes.
  4. Run in waves, at most -j sessions at once. Each node = one worktree + one headless Claude session.
     Dependents:
       stacked (default)  start as soon as the parent's PR is open; branch from factory/<parent>
                          and open their PR against it (a stacked PR).
       --wait-merge       start only after the parent's PR is merged; branch from origin/main.
     If a parent fails (BLOCKED / NEEDS_HUMAN / CONFLICT), its dependents are skipped.

Options:
  -j N            max concurrent sessions (default 3)
  --label L       also enqueue open issues labeled L that aren't already in progress / PR-open
  --base REF      base for root features (default origin/main); must contain the factory files
  --wait-merge    dependents wait for the parent PR to be merged instead of stacking
  --no-plan       skip the batch planner; use only dependencies declared in issue bodies
  --graph FILE    use an existing graph.json (e.g. one you edited) instead of planning
  --yes           don't ask for confirmation
  --dry-run       plan and print the waves, start nothing
  --tmux          run each feature as a visible, interactive Claude session in its own tmux window
                  (plus a "dashboard" window running status.sh). Inside tmux: windows are added to the
                  current session. Outside: a detached session "factory" is created; attach with
                  `tmux attach -t factory`. You can watch every session and answer permission prompts.
"""
import argparse
import datetime as dt
import json
import os
import re
import shlex
import shutil
import signal
import socket
import subprocess
import sys
import time

DEP_RE = re.compile(r"\b(?:depends on|blocked by|requires|after)\s+#(\d+)", re.I)
TERMINAL_OK = "DONE"
FINAL_STATES = {"DONE", "BLOCKED", "NEEDS_HUMAN", "CONFLICT", "QUEUED_TIMEOUT"}


class TmuxProc:
    """Popen-like handle for an interactive Claude session in a tmux window.

    Interactive sessions don't exit when the skill finishes, so the run counts as finished when its
    status.md reaches a final state (the window stays open for you to inspect), or when you close the window.
    """

    def __init__(self, window_id, status_path):
        self.wid, self.status = window_id, status_path

    def poll(self):
        if os.path.exists(self.status):
            m = re.search(r"^STATE:\s*(\S+)", open(self.status).read(), re.M)
            if m and m.group(1) in FINAL_STATES:
                return 0
        r = subprocess.run(["tmux", "list-windows", "-a", "-F", "#{window_id}"], text=True, capture_output=True)
        return None if self.wid in r.stdout.split() else 1

    def terminate(self):
        subprocess.run(["tmux", "kill-window", "-t", self.wid], capture_output=True)


def sh(cmd, cwd=None, check=True, capture=True):
    r = subprocess.run(cmd, cwd=cwd, text=True, capture_output=capture)
    if check and r.returncode != 0:
        raise RuntimeError(f"{' '.join(cmd)} failed:\n{r.stderr or r.stdout}")
    return (r.stdout or "").strip()


def kebab(s, n=40):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:n].rstrip("-")


def issue_number(item):
    m = re.fullmatch(r"#?(\d+)", item.strip()) or re.search(r"/issues/(\d+)", item)
    return int(m.group(1)) if m else None


def port_free(p):
    with socket.socket() as s:
        return s.connect_ex(("127.0.0.1", p)) != 0


class Launcher:
    def __init__(self, a):
        self.a = a
        common = sh(["git", "rev-parse", "--path-format=absolute", "--git-common-dir"])
        self.root = os.path.dirname(common)
        os.chdir(self.root)
        self.logs = os.path.join(self.root, ".factory", "logs")
        os.makedirs(self.logs, exist_ok=True)
        self.batch = os.path.join(self.root, ".factory", "batches", dt.datetime.now().strftime("%Y%m%d-%H%M%S"))
        os.makedirs(self.batch, exist_ok=True)
        self.next_port = 8100
        self.pr_state_cache = {}
        self.session = None

    # ---------- tmux ----------
    def setup_tmux(self):
        if not shutil.which("tmux"):
            sys.exit("--tmux needs tmux (brew install tmux)")
        dash = f"while true; do clear; {shlex.quote(os.path.join(self.root, 'scripts', 'factory', 'status.sh'))}; sleep 5; done"
        if os.environ.get("TMUX"):
            self.session = sh(["tmux", "display-message", "-p", "#S"])
            names = sh(["tmux", "list-windows", "-t", self.session, "-F", "#{window_name}"]).split()
            if "dashboard" not in names:
                sh(["tmux", "new-window", "-d", "-t", f"{self.session}:", "-n", "dashboard", "-c", self.root, dash])
            print(f"tmux: adding windows to this session ({self.session}). Ctrl-b w to pick one.")
        else:
            self.session = "factory"
            if subprocess.run(["tmux", "has-session", "-t", self.session], capture_output=True).returncode != 0:
                sh(["tmux", "new-session", "-d", "-s", self.session, "-n", "dashboard", "-c", self.root, dash])
            print("tmux: sessions run in tmux session 'factory'. In another terminal: tmux attach -t factory")

    # ---------- 1. items ----------
    def resolve_items(self):
        items = list(self.a.items)
        if self.a.label:
            out = sh(["gh", "issue", "list", "--state", "open", "--label", self.a.label, "--limit", "100",
                      "--json", "number,labels"])
            for i in json.loads(out or "[]"):
                names = {l["name"] for l in i["labels"]}
                if not names & {"factory:in-progress", "factory:pr-open"}:
                    items.append(f"#{i['number']}")
        seen, resolved = set(), []
        for it in items:
            n = issue_number(it)
            key = f"#{n}" if n else it
            if key in seen:
                continue
            seen.add(key)
            rec = {"item": key, "issue": n, "title": it, "body": "", "declared": []}
            if n:
                info = json.loads(sh(["gh", "issue", "view", str(n), "--json", "title,body,state"]))
                rec.update(title=info["title"], body=info["body"] or "", state=info["state"])
                rec["declared"] = sorted({int(x) for x in DEP_RE.findall(rec["body"])} - {n})
            resolved.append(rec)
        self.items = {r["item"]: r for r in resolved}
        with open(os.path.join(self.batch, "items.json"), "w") as f:
            json.dump(resolved, f, indent=2)
        with open(os.path.join(self.batch, "items.md"), "w") as f:
            for r in resolved:
                f.write(f"## {r['item']}  {r['title']}\n\n")
                if r["declared"]:
                    f.write(f"Declared dependencies: {', '.join('#%d' % d for d in r['declared'])}\n\n")
                f.write((r["body"] or "(free-text request, no issue body)") + "\n\n")

    # ---------- 2. graph ----------
    def default_graph(self):
        return {"nodes": [{"id": f"n{i+1}", "items": [k], "depends_on": [], "reason": "no planner"}
                          for i, k in enumerate(self.items)], "external": [], "notes": ""}

    def plan(self):
        gpath = os.path.join(self.batch, "graph.json")
        if self.a.graph:
            shutil.copy(self.a.graph, gpath)
        elif self.a.no_plan or len(self.items) == 1:
            with open(gpath, "w") as f:
                json.dump(self.default_graph(), f, indent=2)
        else:
            print(f"Planning batch of {len(self.items)} with batch-planner (Opus)...")
            log = open(os.path.join(self.batch, "planner.log"), "w")
            r = subprocess.run(
                ["claude", "-p", f"Batch dir: {self.batch}. Read {self.batch}/items.md, then write {self.batch}/graph.json.",
                 "--agent", "batch-planner", "--permission-mode", "acceptEdits"],
                cwd=self.root, stdout=log, stderr=subprocess.STDOUT, timeout=1800)
            if r.returncode != 0 or not os.path.exists(gpath):
                sys.exit(f"batch planner failed; see {self.batch}/planner.log (or rerun with --no-plan)")
        self.load_graph(gpath)
        return gpath

    def load_graph(self, gpath):
        g = json.load(open(gpath))
        nodes = {n["id"]: n for n in g["nodes"]}
        errs = []
        covered = [it for n in g["nodes"] for it in n["items"]]
        for it in self.items:
            c = covered.count(it)
            if c != 1:
                errs.append(f"item {it} appears in {c} nodes (must be exactly 1)")
        for it in covered:
            if it not in self.items:
                errs.append(f"unknown item {it}")
        # Enforce declared in-batch dependencies even if the planner dropped them.
        node_of = {it: n["id"] for n in g["nodes"] for it in n["items"]}
        g.setdefault("external", [])
        for it, rec in self.items.items():
            for d in rec["declared"]:
                dep_item = f"#{d}"
                if dep_item in node_of:
                    a, b = node_of[it], node_of[dep_item]
                    if a != b and b not in nodes[a]["depends_on"]:
                        nodes[a]["depends_on"].append(b)
                elif not any(e.get("item") == it and e.get("depends_on_issue") == d for e in g["external"]):
                    g["external"].append({"item": it, "depends_on_issue": d, "note": "declared in issue, not in batch"})
        for n in g["nodes"]:
            for d in n["depends_on"]:
                if d not in nodes:
                    errs.append(f"{n['id']} depends on unknown node {d}")
            first = n["items"][0]
            rec = self.items.get(first, {})
            n["slug"] = kebab(f"{rec['issue']}-{rec['title']}" if rec.get("issue") else " ".join(first.split()[:6]))
        if errs:
            sys.exit("invalid graph.json:\n  " + "\n  ".join(errs))
        # Topological levels (also detects cycles).
        level, remaining = {}, dict(nodes)
        while remaining:
            ready = [k for k, n in remaining.items() if all(d in level for d in n["depends_on"])]
            if not ready:
                sys.exit(f"dependency cycle among: {', '.join(remaining)}")
            for k in ready:
                level[k] = 1 + max([level[d] for d in remaining[k]["depends_on"]] or [0])
                del remaining[k]
        self.graph, self.nodes, self.level = g, nodes, level
        with open(gpath, "w") as f:
            json.dump(g, f, indent=2)

    def show(self):
        mode = "wait-for-merge" if self.a.wait_merge else "stacked PRs"
        print(f"\nBatch {os.path.basename(self.batch)}  ({mode}, {self.a.j} at a time, root base {self.a.base})")
        for w in sorted(set(self.level.values())):
            print(f"\n  wave {w}:")
            for k, n in self.nodes.items():
                if self.level[k] != w:
                    continue
                deps = f"  <- {', '.join(n['depends_on'])}" if n["depends_on"] else ""
                print(f"    {k:4} {' + '.join(n['items'])}  [factory/{n['slug']}]{deps}")
                print(f"         {n.get('reason', '')}")
        for e in self.graph.get("external", []):
            print(f"\n  ! external: {e['item']} depends on #{e['depends_on_issue']} (not in batch): {e.get('note', '')}")
        if self.graph.get("notes"):
            print(f"\n  planner notes: {self.graph['notes']}")
        print()

    def confirm(self, gpath):
        while not self.a.yes:
            ans = input("Run this plan? [y]es / [e]dit graph.json / [n]o: ").strip().lower()
            if ans == "y":
                return
            if ans == "n":
                sys.exit("aborted")
            if ans == "e":
                subprocess.run([os.environ.get("EDITOR", "vi"), gpath])
                self.load_graph(gpath)
                self.show()

    # ---------- 3. execution ----------
    def wt(self, n):
        return os.path.join(self.root, ".claude", "worktrees", n["slug"])

    def run_status(self, n):
        p = os.path.join(self.wt(n), ".factory", "runs", n["slug"], "status.md")
        state, pr = "UNKNOWN", ""
        if os.path.exists(p):
            txt = open(p).read()
            m = re.search(r"^STATE:\s*(\S+)", txt, re.M)
            state = m.group(1) if m else state
            m = re.search(r"https://github\.com/\S+/pull/\d+", txt)
            pr = m.group(0) if m else ""
        return state, pr

    def pr_merged(self, n):
        now = time.time()
        cached = self.pr_state_cache.get(n["id"])
        if cached and now - cached[1] < 60:
            return cached[0]
        r = subprocess.run(["gh", "pr", "view", f"factory/{n['slug']}", "--json", "state", "-q", ".state"],
                           text=True, capture_output=True)
        merged = r.stdout.strip() == "MERGED"
        self.pr_state_cache[n["id"]] = (merged, now)
        return merged

    def write_context(self, n, wt):
        run = os.path.join(wt, ".factory", "runs", n["slug"])
        os.makedirs(run, exist_ok=True)
        parents = [self.nodes[d] for d in n["depends_on"]]
        lines = [f"# Batch context for {' + '.join(n['items'])}", "",
                 f"Batch: {os.path.basename(self.batch)}. Planner reason: {n.get('reason', '')}", ""]
        if len(n["items"]) > 1:
            lines += ["This run combines several issues into one feature: " + ", ".join(n["items"]),
                      "The PR must close all of them.", ""]
        if parents:
            how = ("Its code is ALREADY in this branch (stacked). Build on it; don't redo it."
                   if not self.a.wait_merge else "It is merged into main, which this branch starts from.")
            lines += ["## Builds on", ""]
            for p in parents:
                lines += [f"### {' + '.join(p['items'])} (branch factory/{p['slug']}, PR {p.get('pr', '?')})", how, ""]
                prun = os.path.join(self.wt(p), ".factory", "runs", p["slug"])
                for f in ("spec.md", "plan.md"):
                    fp = os.path.join(prun, f)
                    if os.path.exists(fp):
                        lines += [f"#### Parent {f}", "", open(fp).read(), ""]
        with open(os.path.join(run, "context.md"), "w") as f:
            f.write("\n".join(lines))

    def start(self, n):
        log = open(os.path.join(self.logs, f"{n['slug']}.log"), "a")
        parents = [self.nodes[d] for d in n["depends_on"]]
        stacked = bool(parents) and not self.a.wait_merge
        if stacked:
            base_ref, pr_base = f"factory/{parents[0]['slug']}", f"factory/{parents[0]['slug']}"
        else:
            sh(["git", "fetch", "-q", "origin"])
            base_ref, pr_base = self.a.base, self.a.base.split("/", 1)[-1] if self.a.base.startswith("origin/") else self.a.base
        wt, branch = self.wt(n), f"factory/{n['slug']}"
        while not port_free(self.next_port):
            self.next_port += 1
        port, self.next_port = self.next_port, self.next_port + 1
        log.write(f"=== {dt.datetime.now()} start {n['items']} base={base_ref} pr_base={pr_base} port={port}\n")
        log.flush()
        try:
            if not os.path.isdir(wt):
                exists = subprocess.run(["git", "show-ref", "-q", "--verify", f"refs/heads/{branch}"]).returncode == 0
                sh(["git", "worktree", "add", wt, branch] if exists else ["git", "worktree", "add", "-b", branch, wt, base_ref])
            for extra in parents[1:] if stacked else []:
                r = subprocess.run(["git", "merge", "--no-edit", f"factory/{extra['slug']}"], cwd=wt, text=True,
                                   capture_output=True)
                if r.returncode != 0:
                    subprocess.run(["git", "merge", "--abort"], cwd=wt)
                    raise RuntimeError(f"CONFLICT merging second parent factory/{extra['slug']}")
            subprocess.run(["npm", "ci", "--prefer-offline", "--no-audit", "--no-fund", "--loglevel=error"],
                           cwd=wt, stdout=log, stderr=subprocess.STDOUT, check=True)
            self.write_context(n, wt)
            # A re-run reuses the worktree; move the old status aside so it isn't mistaken for this run's result.
            sp = os.path.join(wt, ".factory", "runs", n["slug"], "status.md")
            if os.path.exists(sp):
                os.replace(sp, sp.replace("status.md", "status.prev.md"))
        except Exception as e:  # noqa: BLE001
            log.write(f"setup failed: {e}\n")
            n["state"] = "SETUP_FAILED"
            return
        fenv = {"FACTORY_RUN": "1", "FACTORY_PORT": str(port), "FACTORY_BASE": base_ref, "FACTORY_PR_BASE": pr_base}
        prompt = "/feature-factory " + " ".join(n["items"])
        if self.session:
            cmd = f"{shlex.quote(shutil.which('claude'))} --permission-mode acceptEdits {shlex.quote(prompt)}"
            args = ["tmux", "new-window", "-d", "-P", "-F", "#{window_id}", "-t", f"{self.session}:",
                    "-n", n["slug"][:28], "-c", wt]
            for k, v in fenv.items():
                args += ["-e", f"{k}={v}"]
            wid = sh(args + [cmd])
            status = os.path.join(wt, ".factory", "runs", n["slug"], "status.md")
            n["proc"] = TmuxProc(wid, status)
            log.write(f"running interactively in tmux window {wid} ({self.session}:{n['slug'][:28]})\n")
        else:
            n["proc"] = subprocess.Popen(["claude", "-p", prompt, "--permission-mode", "acceptEdits"],
                                         cwd=wt, env=dict(os.environ, **fenv), stdout=log, stderr=subprocess.STDOUT)
        n["state"] = "RUNNING"
        print(f"  started {n['id']} {' + '.join(n['items'])} on {branch} (base {base_ref}, port {port})")

    def finish(self, n):
        subprocess.run([os.path.join(self.root, "scripts", "factory", "lock.sh"), "release", n["slug"]],
                       capture_output=True)
        state, pr = self.run_status(n)
        n["state"], n["pr"] = state, pr
        print(f"  finished {n['id']} {' + '.join(n['items'])}: {state} {pr}")

    def save_state(self):
        out = {k: {"items": n["items"], "slug": n["slug"], "depends_on": n["depends_on"],
                   "state": n.get("state", "PENDING"), "pr": n.get("pr", "")} for k, n in self.nodes.items()}
        with open(os.path.join(self.batch, "state.json"), "w") as f:
            json.dump(out, f, indent=2)

    def run(self):
        for n in self.nodes.values():
            n["state"] = "PENDING"

        def stop(*_):
            print("\ninterrupted: stopping running sessions")
            for n in self.nodes.values():
                if n.get("proc") and n["proc"].poll() is None:
                    n["proc"].terminate()
                    self.finish(n)
            self.save_state()
            sys.exit(130)

        signal.signal(signal.SIGINT, stop)
        while True:
            for n in self.nodes.values():
                if n["state"] == "RUNNING" and n["proc"].poll() is not None:
                    self.finish(n)
            running = sum(n["state"] == "RUNNING" for n in self.nodes.values())
            for k in sorted(self.nodes, key=lambda k: self.level[k]):
                n = self.nodes[k]
                if n["state"] not in ("PENDING", "WAITING_MERGE"):
                    continue
                deps = [self.nodes[d] for d in n["depends_on"]]
                if any(d["state"] not in ("PENDING", "RUNNING", "WAITING_MERGE", TERMINAL_OK) for d in deps):
                    n["state"] = "SKIPPED"
                    print(f"  skipped {k}: a dependency failed")
                    continue
                if any(d["state"] != TERMINAL_OK for d in deps):
                    continue
                if self.a.wait_merge and deps and not all(self.pr_merged(d) for d in deps):
                    if n["state"] != "WAITING_MERGE":
                        print(f"  {k} waiting for you to merge: {', '.join(d.get('pr') or d['slug'] for d in deps)}")
                    n["state"] = "WAITING_MERGE"
                    continue
                if running < self.a.j:
                    self.start(n)
                    running += n["state"] == "RUNNING"
            self.save_state()
            if all(n["state"] not in ("PENDING", "RUNNING", "WAITING_MERGE") for n in self.nodes.values()):
                break
            time.sleep(5)

        print("\nBatch finished:")
        for k, n in self.nodes.items():
            print(f"  {k:4} {n['state']:14} {' + '.join(n['items']):30} {n.get('pr', '')}")
        if not self.a.wait_merge and any(n["depends_on"] for n in self.nodes.values()):
            print("\nStacked PRs: merge parents first. After a parent merges, run "
                  "scripts/factory/cleanup.sh --yes to retarget its children to main.")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("items", nargs="*")
    ap.add_argument("-j", type=int, default=3)
    ap.add_argument("--label")
    ap.add_argument("--base", default="origin/main")
    ap.add_argument("--wait-merge", action="store_true")
    ap.add_argument("--no-plan", action="store_true")
    ap.add_argument("--graph")
    ap.add_argument("--yes", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--tmux", action="store_true")
    a = ap.parse_args()

    if not shutil.which("claude"):
        sys.exit("claude CLI not found")
    L = Launcher(a)
    sh(["git", "fetch", "-q", "origin"])
    if subprocess.run(["git", "cat-file", "-e", f"{a.base}:.claude/skills/feature-factory/SKILL.md"],
                      capture_output=True).returncode != 0 and not a.dry_run:
        sys.exit(f"error: {a.base} doesn't contain .claude/skills/feature-factory yet.\n"
                 "       Merge the factory setup into main first, or pass --base <branch-that-has-it>.")
    L.resolve_items()
    if not L.items:
        sys.exit("nothing to do (pass items or --label)")
    gpath = L.plan()
    L.show()
    if a.dry_run:
        print(f"(dry run) graph at {gpath}")
        return
    L.confirm(gpath)
    if a.tmux:
        L.setup_tmux()
    L.run()


if __name__ == "__main__":
    main()
