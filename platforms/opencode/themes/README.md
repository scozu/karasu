# Karasu for OpenCode

## Install

```bash
mkdir -p ~/.config/opencode/themes
cp /path/to/karasu/platforms/opencode/themes/karasu.json ~/.config/opencode/themes/
```

`~/.config/opencode/tui.json`:
```json
{
  "$schema": "https://opencode.ai/tui.json",
  "theme": "karasu"
}
```

`karasu` matches OpenCode's built-in theme convention: Night colors in dark mode and Snow colors in light mode.

OpenCode theme selection belongs in `tui.json`, not `opencode.json`.
Custom themes are resolved from `~/.config/opencode/themes`, `<project>/.opencode/themes`, and `./.opencode/themes`, with later locations overriding earlier ones.

## Color Notes

Karasu OpenCode themes use explicit hex values for stable, deterministic rendering.
Matching your terminal ANSI palette to Karasu (Ghostty/iTerm2) is optional, but improves cross-tool consistency.
For best results, run OpenCode in a truecolor terminal.
