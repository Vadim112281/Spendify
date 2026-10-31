#!/usr/bin/env bash
# Reinstall BMAD core when gitignored install files are missing (e.g. after git clean -fdX).
# Planning skills live under .cursor/skills/ — run sync-planning-skills.sh after a full BMAD install.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CORE_MARKER="$ROOT/_bmad/scripts/memlog.py"

if [[ -f "$CORE_MARKER" ]]; then
  exit 0
fi

echo "BMAD core missing under $ROOT — running local reinstall (not committed to git)."
cd "$ROOT"
npx bmad-method install -y --action update --tools cursor --modules bmm
"$ROOT/scripts/sync-planning-skills.sh"
