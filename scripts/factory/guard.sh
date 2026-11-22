#!/usr/bin/env bash
# PreToolUse hook. Hard stops that no agent can talk its way past:
#   - pushing to main/master, force-pushing, merging PRs (merge to main = production deploy)
#   - editing vendored shadcn primitives in src/components/ui/
# Exit 2 blocks the tool call and shows stderr to Claude.
set -uo pipefail

input="$(cat)"

# Only enforce inside factory runs (launcher sets FACTORY_RUN=1; interactive runs live on factory/* branches).
# Normal sessions, where you push to main yourself to deploy, are unaffected.
branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
case "$branch" in factory/*) ;; *) [ "${FACTORY_RUN:-}" = "1" ] || exit 0 ;; esac

tool="$(printf '%s' "$input" | jq -r '.tool_name // empty')"

block() { echo "BLOCKED by scripts/factory/guard.sh: $*" >&2; exit 2; }

case "$tool" in
  Bash)
    cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"
    if printf '%s' "$cmd" | grep -qE '(^|[;&|[:space:]])gh[[:space:]]+pr[[:space:]]+merge'; then
      block "merging PRs is a human step (merging to main deploys the site)."
    fi
    if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+push'; then
      if printf '%s' "$cmd" | grep -qE '(--force|--force-with-lease|[[:space:]]-f([[:space:]]|$)|[[:space:]]\+)'; then
        block "force-push is not allowed."
      fi
      if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+push([^;&|]*)([[:space:]:]|HEAD:)(main|master)([[:space:]]|$|;|&)'; then
        block "pushing to main is not allowed; push factory/<slug> and open a PR."
      fi
      if printf '%s' "$cmd" | grep -qE 'git[[:space:]]+push[[:space:]]*($|;|&)' && { [ "$branch" = "main" ] || [ "$branch" = "master" ]; }; then
        block "bare 'git push' while on $branch is not allowed."
      fi
    fi
    ;;
  Edit|Write|MultiEdit|NotebookEdit)
    path="$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_input.notebook_path // empty')"
    case "$path" in
      */src/components/ui/*|src/components/ui/*)
        block "src/components/ui/ is vendored shadcn; don't edit it as part of a feature." ;;
    esac
    ;;
esac
exit 0
