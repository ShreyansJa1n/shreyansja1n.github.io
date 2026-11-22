#!/usr/bin/env bash
# Hot-file locks shared by every worktree of this repo, so parallel feature loops
# don't both edit src/site.json / Index.tsx / index.css and collide at merge time.
#
#   lock.sh acquire <slug> <plan.md> [--wait SECONDS]   all-or-nothing; polls until free or timeout
#   lock.sh release <slug>                              drop every lock held by <slug>
#   lock.sh list
#
# Locks live in <git-common-dir>/factory-locks, which all worktrees share.
set -uo pipefail

HOT_FILES="src/site.json src/pages/Index.tsx src/index.css tailwind.config.ts src/App.tsx"

COMMON="$(cd "$(git rev-parse --git-common-dir)" && pwd)"
LOCKDIR="$COMMON/factory-locks"
mkdir -p "$LOCKDIR"

lockname() { echo "$1" | tr '/' '_'; }

footprint() {
  # Lines like "- path" under a "## Footprint" heading, until the next heading.
  awk '/^## Footprint/{on=1; next} /^## /{on=0} on && /^- /{sub(/^- +/, ""); gsub(/`/, ""); print $1}' "$1"
}

hot_in_plan() {
  local f h
  for f in $(footprint "$1"); do
    for h in $HOT_FILES; do [ "$f" = "$h" ] && echo "$h"; done
  done | sort -u
}

try_acquire() { # slug, files...; returns 0 if all acquired, else releases partial and returns 1
  local slug="$1"; shift
  local got="" f d
  for f in "$@"; do
    d="$LOCKDIR/$(lockname "$f")"
    if mkdir "$d" 2>/dev/null; then
      echo "$slug" > "$d/owner"; got="$got $d"
    elif [ "$(cat "$d/owner" 2>/dev/null)" = "$slug" ]; then
      : # already ours
    else
      echo "busy: $f held by $(cat "$d/owner" 2>/dev/null || echo '?')" >&2
      for d in $got; do rm -rf "$d"; done
      return 1
    fi
  done
  return 0
}

cmd="${1:-}"; shift || true
case "$cmd" in
  acquire)
    slug="$1"; plan="$2"; shift 2
    wait=0
    [ "${1:-}" = "--wait" ] && wait="${2:-0}"
    files="$(hot_in_plan "$plan")"
    if [ -z "$files" ]; then echo "no hot files in footprint; no lock needed"; exit 0; fi
    start=$(date +%s)
    while :; do
      # shellcheck disable=SC2086
      if try_acquire "$slug" $files; then echo "acquired: $(echo $files)"; exit 0; fi
      [ $(( $(date +%s) - start )) -ge "$wait" ] && { echo "timeout waiting for locks" >&2; exit 1; }
      sleep 30
    done
    ;;
  release)
    slug="$1"
    for d in "$LOCKDIR"/*; do
      [ -d "$d" ] && [ "$(cat "$d/owner" 2>/dev/null)" = "$slug" ] && rm -rf "$d" && echo "released $(basename "$d")"
    done
    exit 0
    ;;
  list)
    for d in "$LOCKDIR"/*; do [ -d "$d" ] && echo "$(basename "$d" | tr '_' '/')  ->  $(cat "$d/owner")"; done
    exit 0
    ;;
  *) echo "usage: lock.sh acquire <slug> <plan.md> [--wait S] | release <slug> | list" >&2; exit 2 ;;
esac
