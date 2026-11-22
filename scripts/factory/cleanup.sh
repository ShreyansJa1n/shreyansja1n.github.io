#!/usr/bin/env bash
# 1. Restack: open factory PRs whose base is a factory/* branch that has been merged get retargeted to main.
#    (GitHub only does this automatically when the merged branch is deleted, and this repo doesn't
#    auto-delete head branches.)
# 2. Remove factory worktrees (and local branches) whose PR is merged or closed.
# Dry run unless --yes.
set -uo pipefail
ROOT="$(cd "$(git rev-parse --git-common-dir)/.." && pwd)"; cd "$ROOT" || exit 2
YES=0; [ "${1:-}" = "--yes" ] && YES=1

echo "Stacked PRs:"
gh pr list --state open --limit 100 --json number,headRefName,baseRefName \
  -q '.[] | select(.headRefName|startswith("factory/")) | select(.baseRefName|startswith("factory/")) | "\(.number) \(.headRefName) \(.baseRefName)"' |
while read -r num head base; do
  pstate="$(gh pr view "$base" --json state -q .state 2>/dev/null || echo NONE)"
  if [ "$pstate" = "MERGED" ]; then
    if [ "$YES" = 1 ]; then
      gh pr edit "$num" --base main >/dev/null && echo "  retargeted #$num ($head) from $base to main"
    else
      echo "  would retarget #$num ($head): parent $base is merged"
    fi
  else
    echo "  keep #$num ($head) stacked on $base (parent PR $pstate)"
  fi
done

echo "Worktrees:"
for wt in .claude/worktrees/*/; do
  [ -d "$wt" ] || continue
  branch="$(git -C "$wt" rev-parse --abbrev-ref HEAD 2>/dev/null)"
  case "$branch" in factory/*) ;; *) continue ;; esac
  state="$(gh pr view "$branch" --json state -q .state 2>/dev/null || echo NONE)"
  case "$state" in
    MERGED|CLOSED)
      # Don't remove a parent whose stacked children are still open; they branch from it.
      children="$(gh pr list --state open --base "$branch" --json number -q 'length' 2>/dev/null || echo 0)"
      if [ "${children:-0}" != "0" ] && [ "$YES" != 1 ]; then
        echo "  keep   $wt ($branch, PR $state, $children stacked PR(s) still target it; retarget first)"
        continue
      fi
      if [ "$YES" = 1 ]; then
        git worktree remove --force "$wt" && git branch -D "$branch" >/dev/null && echo "  removed $wt ($state)"
      else
        echo "  would remove $wt ($branch, PR $state)"
      fi ;;
    *) echo "  keep   $wt ($branch, PR $state)" ;;
  esac
done
[ "$YES" = 1 ] || echo "(dry run; pass --yes to apply)"
