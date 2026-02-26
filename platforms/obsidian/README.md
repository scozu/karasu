# Karasu for Obsidian (Minimal Overlay)

Karasu for Obsidian is delivered as a CSS snippet that overlays [Minimal](https://github.com/kepano/obsidian-minimal).

## Requirements

- Minimal theme enabled in Obsidian
- (Recommended) Minimal Theme Settings plugin for scheme/contrast controls

## Install

```bash
mkdir -p "<vault>/.obsidian/snippets"
cp /path/to/karasu/platforms/obsidian/snippets/karasu-minimal.css "<vault>/.obsidian/snippets/"
```

Then in Obsidian:

1. Go to `Settings -> Appearance -> CSS snippets`.
2. Enable `karasu-minimal.css`.
3. In Minimal Theme Settings, set:
   - Light mode color scheme: `Default`
   - Dark mode color scheme: `Default`

Karasu Night and Snow will now follow Obsidian dark/light mode.

## Notes

- Includes upstream-ready alias selectors: `minimal-karasu-dark` and `minimal-karasu-light`.
- Supports Minimal contrast modes: default, low contrast, high contrast, all white, and true black.
