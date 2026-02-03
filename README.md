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
  "theme": {
    "mode": "system",
    "light": "karasu-snow",
    "dark": "karasu-night"
  }
}
```

OpenCode themes reference **ANSI 0–255**. For best fidelity, set your terminal ANSI palette to Karasu (Ghostty/iTerm2).

### VS Code / Cursor

Use the VS Code extension in `platforms/vscode/` (Cursor supports VS Code themes):

```bash
node scripts/build-themes.mjs
```

Package with `vsce package` if you want a VSIX.

## Development

Regenerate themes:
```bash
node scripts/build-themes.mjs
```

Check cursor/ANSI parity:
```bash
node scripts/check-consistency.mjs
```

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
