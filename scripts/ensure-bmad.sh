#!/usr/bin/env bash
# Reinstall BMAD into this repo when gitignored install files are missing (e.g. after git clean -fdX).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MARKER="$ROOT/.agents/skills/bmad-help/SKILL.md"

if [[ -f "$MARKER" ]]; then
  exit 0
fi

echo "BMAD install missing under $ROOT — running local reinstall (not committed to git)."
cd "$ROOT"
exec npx bmad-method install -y --action update --tools cursor --modules bmm
