#!/usr/bin/env bash
# Copy five BMAD planning skills into .cursor/skills with Spendify plan-* names.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AGENTS="$ROOT/.agents/skills"
CURSOR="$ROOT/.cursor/skills"
OVERRIDES="$ROOT/scripts/planning-skills-overrides"

# source_dir:dest_name
PAIRS=(
  "bmad-forge-idea:plan-forge"
  "bmad-spec:plan-spec"
  "bmad-architecture:plan-architecture"
  "bmad-ux:plan-ux"
  "bmad-create-epics-and-stories:plan-stories"
)

mkdir -p "$CURSOR"

for pair in "${PAIRS[@]}"; do
  src_name="${pair%%:*}"
  dest_name="${pair##*:}"
  src="$AGENTS/$src_name"
  dest="$CURSOR/$dest_name"
  if [[ ! -d "$src" ]]; then
    echo "skip (missing): $src_name"
    continue
  fi
  rm -rf "$dest"
  cp -R "$src" "$dest"
  skill_md="$dest/SKILL.md"
  if [[ -f "$skill_md" ]]; then
    sed -i '' "s/^name: ${src_name}/name: ${dest_name}/" "$skill_md"
    case "$dest_name" in
      plan-forge)
        sed -i '' "1,/^---$/ s|^description:.*|description: 'Spendify planning — pressure-test a half-formed idea in conversation (@plan-forge). Optional forged-idea.md under _bmad-output/forge/. Triggers: plan-forge, forge an idea, pressure-test this idea.'|" "$skill_md"
        ;;
      plan-spec)
        sed -i '' "1,/^---$/ s|^description:.*|description: 'Spendify planning — SPEC.md + companions under _bmad-output/specs/ (@plan-spec). Triggers: plan-spec, create a spec, break this into stories.'|" "$skill_md"
        ;;
      plan-architecture)
        sed -i '' "1,/^---$/ s|^description:.*|description: 'Spendify planning — ARCHITECTURE-SPINE.md (@plan-architecture). Triggers: plan-architecture, architecture spine, create the architecture.'|" "$skill_md"
        ;;
      plan-ux)
        sed -i '' "1,/^---$/ s|^description:.*|description: 'Spendify planning — DESIGN.md + EXPERIENCE.md (@plan-ux). Triggers: plan-ux, create UX design, plan the UX.'|" "$skill_md"
        ;;
      plan-stories)
        sed -i '' "1,/^---$/ s|^description:.*|description: 'Spendify planning — epics and stories (@plan-stories). Triggers: plan-stories, create epics and stories.'|" "$skill_md"
        ;;
    esac
  fi
  override="$OVERRIDES/${dest_name}.toml"
  customize="$dest/customize.toml"
  if [[ -f "$override" && -f "$customize" ]]; then
    python3 "$ROOT/scripts/merge-planning-skill-customize.py" "$customize" "$override"
    echo "  merge $dest_name ← planning-skills-overrides"
  fi
  echo "  ok $dest_name"
done

if [[ -d "$AGENTS" ]]; then
  for d in "$AGENTS"/bmad-*; do
    [[ -e "$d" ]] || continue
    rm -rf "$d"
  done
fi

# Drop legacy bmad-* folder names under .cursor/skills if present.
for legacy in bmad-forge-idea bmad-spec bmad-architecture bmad-ux bmad-create-epics-and-stories; do
  rm -rf "$CURSOR/$legacy"
done

echo "Planning skills ready under $CURSOR (invoke @plan-forge, @plan-spec, …)."
