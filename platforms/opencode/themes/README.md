# Karasu for OpenCode

## Install

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

## ANSI Notes

OpenCode themes reference **ANSI 0–255**. For best fidelity in the terminal UI and desktop beta, set your terminal ANSI palette to Karasu (Ghostty/iTerm2).
