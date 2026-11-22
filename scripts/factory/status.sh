#!/usr/bin/env bash
# Show the state of every feature-factory run (main checkout + all worktrees) and held hot-file locks.
set -uo pipefail
ROOT="$(cd "$(git rev-parse --git-common-dir)/.." && pwd)"

printf '%-42s %-16s %s\n' "RUN" "STATE" "PR / NOTE"
for s in "$ROOT"/.factory/runs/*/status.md "$ROOT"/.claude/worktrees/*/.factory/runs/*/status.md; do
  [ -f "$s" ] || continue
  run="$(basename "$(dirname "$s")")"
  state="$(grep -m1 -E '^STATE:' "$s" | sed 's/^STATE:[[:space:]]*//')"
  pr="$(grep -m1 -oE 'https://github.com/[^ )]+/pull/[0-9]+' "$s" || true)"
  printf '%-42s %-16s %s\n' "$run" "${state:-?}" "$pr"
done

latest="$(ls -d "$ROOT"/.factory/batches/*/ 2>/dev/null | tail -1)"
if [ -n "$latest" ] && [ -f "$latest/state.json" ]; then
  echo
  echo "Latest batch $(basename "$latest"):"
  jq -r 'to_entries[] | "  \(.key)\t\(.value.state)\t\(.value.items|join(" + "))\t<- \(.value.depends_on|join(","))\t\(.value.pr)"' "$latest/state.json" | column -t -s $'\t'
fi

echo
echo "Locks:"; "$ROOT/scripts/factory/lock.sh" list | sed 's/^/  /'
echo
echo "Running claude loops: $(pgrep -f 'feature-factory' | wc -l | tr -d ' ')"
