#!/usr/bin/env bash
# One-time per clone: git hooks that run ensure-bmad.sh after checkout/merge (hooks live in .git/, never pushed).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOKS="$ROOT/.git/hooks"
ENSURE="$ROOT/scripts/ensure-bmad.sh"

if [[ ! -x "$ENSURE" ]]; then
  chmod +x "$ENSURE"
fi

write_hook() {
  local name="$1"
  cat >"$HOOKS/$name" <<EOF
#!/bin/sh
"$ENSURE" || true
EOF
  chmod +x "$HOOKS/$name"
}

write_hook post-checkout
write_hook post-merge

echo "Installed local hooks: post-checkout, post-merge → scripts/ensure-bmad.sh"
