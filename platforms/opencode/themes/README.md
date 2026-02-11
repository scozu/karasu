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

## Color Notes

Karasu OpenCode themes use explicit hex values for stable, deterministic rendering.
Matching your terminal ANSI palette to Karasu (Ghostty/iTerm2) is optional, but improves cross-tool consistency.
