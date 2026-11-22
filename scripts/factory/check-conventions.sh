#!/usr/bin/env bash
# Deterministic convention checks for a feature diff.
# Usage: scripts/factory/check-conventions.sh [BASE]   (default BASE=origin/main)
# Checks only lines ADDED relative to the merge base (committed + working tree + untracked),
# so pre-existing violations elsewhere in the repo don't fail a feature.
set -uo pipefail

BASE="${1:-origin/main}"
cd "$(git rev-parse --show-toplevel)" || exit 2

MB="$(git merge-base "$BASE" HEAD 2>/dev/null || echo "$BASE")"
fails=0
pass() { echo "PASS: $*"; }
fail() { echo "FAIL: $*"; fails=$((fails + 1)); }

# Content rules apply to what ships on the site, not to tooling/docs (which describe the rules).
SCOPE=(src index.html)

# Added lines as "file:+content", from tracked changes.
added_lines() {
  git diff -U0 "$MB" -- "${SCOPE[@]}" | awk '
    /^\+\+\+ b\// { file = substr($0, 7); next }
    /^\+\+\+/     { file = ""; next }
    /^\+/         { if (file != "") print file ":" substr($0, 2) }
  '
  # Untracked (new, not yet added) files count as fully added.
  git ls-files --others --exclude-standard -- "${SCOPE[@]}" | while read -r f; do
    [ -f "$f" ] && grep -Iq . "$f" && awk -v f="$f" '{ print f ":" $0 }' "$f"
  done
}

ADDED="$(added_lines)"

# 1. No em-dashes (literal or HTML entity). En-dashes are fine.
hits="$(printf '%s\n' "$ADDED" | grep -nE '—|&mdash;' || true)"
if [ -n "$hits" ]; then
  fail "em-dash in added lines (use commas, periods, parens, or 'and'):"
  printf '%s\n' "$hits" | sed 's/^[0-9]*:/    /'
else
  pass "no em-dashes added"
fi

# 2. "new-grad" appears exactly once in rendered page code (src, excluding blog markdown).
count="$(grep -rioE 'new[- ]grad' src --include='*.ts' --include='*.tsx' --include='*.json' --include='*.css' 2>/dev/null | wc -l | tr -d ' ')"
if [ "$count" = "1" ]; then
  pass "'new-grad' appears exactly once"
else
  fail "'new-grad' appears $count times in src (must be exactly 1, in ForRecruiters.tsx)"
fi

# 3. No root-level site.json (src/site.json is canonical).
if [ -e site.json ]; then fail "root site.json exists; src/site.json is the only content file"; else pass "no root site.json"; fi

# 4. Vendored shadcn primitives untouched.
ui_changed="$( { git diff --name-only "$MB" -- src/components/ui; git ls-files --others --exclude-standard -- src/components/ui; } | sort -u)"
if [ -n "$ui_changed" ]; then
  fail "src/components/ui/ is vendored; changed: $(echo "$ui_changed" | tr '\n' ' ')"
else
  pass "src/components/ui/ untouched"
fi

# 5. Retired role framing not reintroduced.
hits="$(printf '%s\n' "$ADDED" | grep -inE 'primary (ios|focus)|secondary (backend|focus)' || true)"
if [ -n "$hits" ]; then
  fail "retired 'primary iOS / secondary backend' framing added:"
  printf '%s\n' "$hits" | sed 's/^[0-9]*:/    /'
else
  pass "no primary/secondary role framing"
fi

# 6. Lose It! present-tense smell (heuristic; the conventions-guard agent makes the final call).
hits="$(printf '%s\n' "$ADDED" | grep -iE 'lose it' | grep -iE '\b(currently|am working|is working|now (building|shipping|working))\b' || true)"
if [ -n "$hits" ]; then
  fail "Lose It! copy looks present-tense (co-op ended Dec 2025):"
  printf '%s\n' "$hits" | sed 's/^/    /'
else
  pass "no present-tense Lose It! copy detected"
fi

# 7. src/site.json still parses.
if node -e 'JSON.parse(require("fs").readFileSync("src/site.json","utf8"))' 2>/dev/null; then
  pass "src/site.json is valid JSON"
else
  fail "src/site.json is not valid JSON"
fi

echo
if [ "$fails" -gt 0 ]; then echo "RESULT: FAIL ($fails)"; exit 1; fi
echo "RESULT: PASS"
