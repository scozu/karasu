# Karasu Colorscheme for Zed

A warm, atmospheric colorscheme for Zed editor combining Material Design dark backgrounds with warm earth tones.

## Installation

### Method 1: Extensions Marketplace
1. Open Zed
2. Go to Extensions (Cmd/Ctrl + Shift + X)
3. Search for "Karasu"
4. Click Install

### Method 2: Manual Installation
1. Copy the theme file to your Zed themes directory:
   ```bash
   cp zed/themes/karasu.json ~/.config/zed/themes/karasu.json
   ```

2. Restart Zed or reload the editor

3. Select the theme:
   - Open Settings (Cmd/Ctrl + ,)
   - Go to Themes
   - Select "Karasu"

### Method 3: Clone as Extension
```bash
# Clone to Zed extensions directory
git clone https://github.com/scozu/karasu ~/.config/zed/extensions/karasu
```

## Features

- Complete UI element mapping
- Syntax token colors for all major languages
- Git integration colors
- Diagnostic colors (errors, warnings, info)
- Search and selection highlights
- Terminal ANSI colors
- Status bar and tab styling
- Sidebar and panel theming

## Color Palette

- **Background**: #121212 (Material dark)
- **Foreground**: #d4c5b9 (Warm cream)
- **Selection**: #2d3437 (Visual selection)
- **Active Line**: #1a1a1a (Subtle highlight)

## Customization

You can customize the theme by editing `~/.config/zed/themes/karasu.json` and reloading Zed.

## Requirements

- Zed editor
- True color support

## Troubleshooting

If the theme doesn't appear:
1. Ensure the JSON file is valid
2. Check that the file is in the correct themes directory
3. Restart Zed completely
4. Verify the theme appears in the themes list

## License

MIT License
