#!/usr/bin/env python3
# Merges scripts/planning-skills-overrides/<skill>.toml into .cursor/skills/<skill>/customize.toml.
# Scalars in [workflow]: override wins. Arrays: append new entries only.

from __future__ import annotations

import re
import sys
import tomllib
from pathlib import Path


def _toml_string(value: str) -> str:
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def _set_scalar_line(text: str, key: str, value: str) -> str:
    line = f"{key} = {_toml_string(value)}"
    pattern = re.compile(rf"^{re.escape(key)} = .*$", re.MULTILINE)
    if pattern.search(text):
        return pattern.sub(line, text, count=1)
    # Insert after [workflow] header
    block = re.search(r"^\[workflow\]\s*$", text, re.MULTILINE)
    if not block:
        return text + f"\n[workflow]\n{line}\n"
    insert_at = block.end()
    return text[:insert_at] + f"\n{line}" + text[insert_at:]


def _append_array_entries(text: str, key: str, entries: list) -> str:
    if not entries:
        return text
    # Find array block key = [ ... ]
    pattern = re.compile(
        rf"^{re.escape(key)} = \[(.*?)\]",
        re.MULTILINE | re.DOTALL,
    )
    match = pattern.search(text)
    if not match:
        return text
    inner = match.group(1)
    existing = set(re.findall(r'"([^"]*)"', inner))
    to_add = [e for e in entries if e not in existing]
    if not to_add:
        return text
    additions = ",\n  ".join(_toml_string(e) for e in to_add)
    if inner.strip():
        new_inner = inner.rstrip() + f",\n  {additions},\n"
    else:
        new_inner = f"\n  {additions},\n"
    return text[: match.start(1)] + new_inner + text[match.end(1) :]


def merge_customize(customize_path: Path, override_path: Path) -> None:
    with override_path.open("rb") as f:
        override = tomllib.load(f)
    workflow = override.get("workflow", {})
    if not workflow:
        return

    text = customize_path.read_text(encoding="utf-8")
    for key, value in workflow.items():
        if isinstance(value, str):
            text = _set_scalar_line(text, key, value)
        elif isinstance(value, list) and all(isinstance(x, str) for x in value):
            text = _append_array_entries(text, key, value)
    customize_path.write_text(text, encoding="utf-8")


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: merge-planning-skill-customize.py <customize.toml> <override.toml>", file=sys.stderr)
        return 2
    merge_customize(Path(sys.argv[1]), Path(sys.argv[2]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
