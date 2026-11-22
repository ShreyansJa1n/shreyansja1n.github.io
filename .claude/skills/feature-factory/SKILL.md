---
name: feature-factory
description: Take one feature (a GitHub issue like #12, or a free-text request) through spec, plan, implement, verify, review, and PR using dedicated subagents. Stops at an open PR; never merges.
argument-hint: "<#issue | issue URL | free-text feature request>"
disable-model-invocation: true
---

# Feature factory: orchestrator

You are the orchestrator for ONE feature. You coordinate subagents and enforce gates. You never edit files under `src/` yourself, and you never merge or push to `main`.

Request: $ARGUMENTS

## 0. Setup
1. Read `CLAUDE.md` (briefly; the agents will read it in full).
2. **Intake.**
   - If the request contains one or more issue refs (`#N`, bare numbers, or issue URLs; the batch launcher may combine several into one run): for each, run `gh issue view N --json number,title,body,labels,comments` and `gh issue edit N --add-label factory:in-progress` (create the label with `gh label create factory:in-progress --force` if needed). ISSUES=all the numbers, TITLE=the first issue's title.
   - Otherwise: ISSUES=none, TITLE=a short summary of the request.
3. **Branch and slug.** If the current branch is `factory/<something>`, SLUG=<something> (the launcher set it up). Otherwise SLUG = kebab-case of TITLE (max 40 chars, prefixed `<N>-` when there is an issue), then `git fetch origin main && git checkout -b factory/$SLUG origin/main`. Refuse to proceed if the working tree has uncommitted changes unrelated to this run.
4. RUN=`.factory/runs/$SLUG`. `mkdir -p $RUN/shots`. Write `$RUN/request.md` with the raw request, plus every issue's title, body, and comments. If the launcher left `$RUN/context.md` (batch context: combined issues, and the spec/plan of parent features this one builds on), keep it; every agent below gets pointed at it.
5. PORT = `$FACTORY_PORT` if set, else pick 8100 + a random number 0–99 and confirm it's free with `lsof -i :PORT`.
6. BASE = `$FACTORY_BASE` if set, else `origin/main`. Use it for every diff and gate. For a stacked feature it is the parent's branch, so gates see only this feature's changes.
   PR_BASE = `$FACTORY_PR_BASE` if set, else `main`. A stacked feature's PR targets its parent's branch.
7. Write `$RUN/status.md` with `STATE: SPEC` and keep it updated at every step below (STATE, iteration, last gate results). The launcher and `scripts/factory/status.sh` read it.

## 1. Spec and plan
Dispatch `architect`:
> Run dir: $RUN. Read $RUN/request.md, $RUN/context.md if it exists, and CLAUDE.md. Use the templates in .claude/skills/feature-factory/templates/. Write $RUN/spec.md and $RUN/plan.md.

If it returns `BLOCKED: ...`: set STATE: BLOCKED in status.md, post the question with `gh issue comment` on each of ISSUES (if any) or print it, remove the in-progress label, and stop.

**Footprint lock.** Run `scripts/factory/lock.sh acquire $SLUG $RUN/plan.md --wait 1800`. This serializes runs that touch the same hot files (`src/site.json`, `src/pages/Index.tsx`, `src/index.css`, `tailwind.config.ts`) across all parallel loops. If it times out, set STATE: QUEUED_TIMEOUT and stop.

## 2. Build loop (max 3 iterations)
For i = 1..3:

a. Set STATE: BUILD i. Dispatch `implementer`:
   > Run dir: $RUN. Implement $RUN/plan.md to satisfy $RUN/spec.md. (If i > 1: Fix every item in $RUN/feedback.md, nothing else.)

b. **Gate 0, deterministic (you run it, no agent):** `npm run lint 2>&1 | tail -50` and `npm run build 2>&1 | tail -50`. Only lint errors in files in the Footprint count. On failure, write the output to `$RUN/feedback.md` and go to the next iteration without running the other gates.

c. Set STATE: VERIFY i. Dispatch **in parallel, in one message**:
   - `conventions-guard`: "Run dir: $RUN. Base: $BASE."
   - `verifier`: "Run dir: $RUN. Port: $PORT."

d. Set STATE: REVIEW i. Dispatch `reviewer`: "Run dir: $RUN. Base: $BASE." Don't pass it the implementer's summary; it reviews artifacts and the diff cold.

e. **Decide.** Read `$RUN/conventions.md`, `$RUN/verify.md`, `$RUN/review.md`. Pass = conventions RESULT PASS, verify RESULT PASS, and zero `blocker` findings.
   - Pass: break.
   - Fail: overwrite `$RUN/feedback.md` with the failing items only (convention FAILs, failed criteria, blocker findings), each with file:line and the requested change. Next iteration.

If iteration 3 still fails: set STATE: NEEDS_HUMAN, release the lock (`scripts/factory/lock.sh release $SLUG`), comment a summary of the outstanding blockers on each of ISSUES (if any), leave the branch uncommitted for inspection, and stop. Do not open a PR.

## 3. Ship
Set STATE: SHIP. Dispatch `shipper`:
> Branch: factory/$SLUG. Issues: $ISSUES. PR base: $PR_BASE. Run dir: $RUN.

Then `scripts/factory/lock.sh release $SLUG`.
- PR URL returned: STATE: DONE, record the URL.
- `CONFLICT`: STATE: CONFLICT. Leave the work committed on the branch for a human.

## 4. Report
Final message (and `$RUN/status.md`): STATE, PR URL, iterations used, gate results per iteration, and reviewer nits carried into the PR.

## Rules
- Pass file paths to agents, not pasted content. The files in $RUN are the contract between steps.
- One agent per step; don't do an agent's job yourself if it fails. Retry a crashed agent once, then treat it as a gate failure.
- Never weaken a gate to get a pass (no disabling lint rules, no editing acceptance criteria after the architect step).
- Never run `gh pr merge`, never push to `main`, never force-push.
