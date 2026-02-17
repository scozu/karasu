# Karasu Palette

Source of truth for all colors.

## Files
- `night.json` — Night palette
- `snow.json` — Snow palette
- `tokens.json` — Shared UI tokens (cursor, selection, diff, search)
- `colors.lua` — Lua palette module (legacy)

## Workflow
1. Edit `night.json`, `snow.json`, or `tokens.json`
2. Run `bun run ./scripts/build-themes.mjs`
3. Run `bun run ./scripts/check-consistency.mjs`
