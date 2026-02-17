# カラス (Karasu)

Karasu is a terminal-first colorscheme with two variants: **Night** (dark) and **Snow** (light).

## Repo Layout

```
palette/     # Source of truth
platforms/   # Platform packages
scripts/     # Build + consistency checks
lua/         # Neovim plugin
colors/      # Neovim entrypoints
```

## Install

Manual per-app install is the default and safest path. The sections below only add theme files unless you choose otherwise.

### Neovim

```lua
{
  'scozu/karasu',
  lazy = false,
  priority = 1000,
  config = function()
    require('karasu').setup({ mode = "night" }) -- "night", "snow", "auto"
  end
}
```

Colorscheme commands:
```
:colorscheme karasu-night
:colorscheme karasu-snow
```

### Ghostty

```bash
mkdir -p ~/.config/ghostty/themes
cp /path/to/karasu/platforms/ghostty/karasu-night ~/.config/ghostty/themes/
cp /path/to/karasu/platforms/ghostty/karasu-snow ~/.config/ghostty/themes/
```

Config example:
```
theme = dark:karasu-night,light:karasu-snow
```

### Zed

```bash
mkdir -p ~/.config/zed/extensions/karasu
cp -r /path/to/karasu/platforms/zed/* ~/.config/zed/extensions/karasu/
```
Select **Karasu Night** or **Karasu Snow** in Zed.

### OpenCode

```bash
mkdir -p ~/.config/opencode/themes
cp /path/to/karasu/platforms/opencode/themes/karasu-night.json ~/.config/opencode/themes/
cp /path/to/karasu/platforms/opencode/themes/karasu-snow.json ~/.config/opencode/themes/
```

Config example:
```json
{
  "theme": "karasu-night"
}
```

OpenCode themes reference **ANSI 0–255**. For best fidelity, set your terminal ANSI palette to Karasu (Ghostty/iTerm2).

`"theme"` as a plain string is the safest cross-version setting.
If you're on OpenCode `>=1.2.0` and want auto light/dark switching, run:

```bash
./scripts/install-all.sh --configure-opencode --opencode-mode system
```

### VS Code / Cursor

Use the VS Code extension in `platforms/vscode/` (Cursor supports VS Code themes):

```bash
bun run ./scripts/build-themes.mjs
```

Package with `vsce package` if you want a VSIX.
Marketplace links will be added here after the first public release.

### Optional: Install all app theme assets

This helper script copies Karasu theme files for Ghostty, OpenCode, and Zed in one run:

```bash
./scripts/install-all.sh
```

By default it does not edit app config files and does not run Neovim sync.

Examples:

```bash
# Configure OpenCode theme safely (with backup)
./scripts/install-all.sh --configure-opencode

# Configure OpenCode system mode when supported
./scripts/install-all.sh --configure-opencode --opencode-mode system

# Sync Neovim plugin and auto-stash dirty local edits first
./scripts/install-all.sh --sync-neovim --neovim-auto-stash
```

## Development

Regenerate themes:
```bash
bun run ./scripts/build-themes.mjs
```

Check cursor/ANSI parity:
```bash
bun run ./scripts/check-consistency.mjs
```

Neovim smoke checks:
```bash
bun run ./scripts/check-neovim-smoke.mjs
```

OpenCode compatibility checks:
```bash
bun run ./scripts/check-opencode-config-compat.mjs
```

## Release Checklist

1. `bun run ./scripts/build-themes.mjs`
2. `bun run ./scripts/check-consistency.mjs`
3. `bun run ./scripts/check-vscode-theme.mjs`
4. `bun run ./scripts/check-neovim-smoke.mjs`
5. `bun run ./scripts/check-opencode-config-compat.mjs`
6. Validate a fresh asset install with `./scripts/install-all.sh`

## Migration Notes

- If OpenCode fails with `Invalid input: expected string, received object theme`, set:
  - `"theme": "karasu-night"` in `~/.config/opencode/opencode.json`
  - or rerun `./scripts/install-all.sh --configure-opencode`.
- If Neovim shows highlight-group spam on startup after updating Karasu, run:
  - `nvim --headless '+Lazy! sync karasu' +qa`
  - or run `./scripts/install-all.sh --sync-neovim --neovim-auto-stash`.

## Platform Docs

- [Neovim](platforms/neovim/README.md)
- [Ghostty](platforms/ghostty/README.md)
- [Zed](platforms/zed/README.md)
- [OpenCode](platforms/opencode/themes/README.md)
- [VS Code](platforms/vscode/README.md)
- [Cursor](platforms/cursor/README.md)
- [iTerm2](platforms/iterm2/README.md)

## References

Karasu draws inspiration from:
- [Gruvbox Material Dark](https://github.com/sainnhe/gruvbox-material)
- [Kanagawa Dragon](https://github.com/rebelot/kanagawa.nvim)
- [Kanso](https://github.com/webhooked/kanso.nvim)
- [Black Metal (Gorgoroth)](https://github.com/metalelf0/black-metal-theme-neovim)
