# Karasu Colorscheme for Zed

A warm, atmospheric colorscheme for Zed editor combining Material Design dark backgrounds with warm earth tones.

## Installation

### Method 1: Extensions Marketplace
1. Open Zed
2. Go to Extensions (Cmd/Ctrl + Shift + X)
3. Search for "Karasu"
4. Click Install

### Method 2: Clone as Extension
```bash
# Clone to Zed extensions directory
git clone https://github.com/scozu/karasu ~/.config/zed/extensions/karasu
```

### Method 3: Manual Installation
1. Create the extension directory:
   ```bash
   mkdir -p ~/.config/zed/extensions/karasu
   ```

2. Copy the extension files:
   ```bash
   cp -r zed/* ~/.config/zed/extensions/karasu/
   ```

3. Restart Zed or reload the editor

4. Select the theme:
   - Open Settings (Cmd/Ctrl + ,)
   - Go to Themes
   - Select "Karasu"

## Features

- **Complete UI Theming**: All editor elements styled with consistent Material Design aesthetic
- **Comprehensive Syntax Highlighting**: 40+ syntax token types with proper font styles and weights
- **Multiplayer Support**: 8-player color array for collaborative editing sessions
- **Full Terminal Integration**: Complete ANSI color set with bright and dim variants
- **Advanced Editor Features**: Document highlighting, bracket matching, indent guides
- **Git Integration**: Proper styling for all git states (added, modified, deleted, conflict, etc.)
- **Diagnostic Support**: Error, warning, info, and hint styling with backgrounds and borders
- **Accessibility**: WCAG AA/AAA compliant contrast ratios
- **Semantic Color System**: Logical color relationships for maintainability

## Color Palette

- **Background**: #121212 (Material dark)
- **Foreground**: #d4c5b9 (Warm cream)
- **Selection**: #2d3437 (Visual selection)
- **Active Line**: #1a1a1a (Subtle highlight)

## Customization

You can customize the theme by editing `~/.config/zed/extensions/karasu/themes/karasu.json` and reloading Zed.

### Theme Structure
The theme follows Zed's v0.2.0 schema with comprehensive styling:
- **Core Colors**: Background, foreground, border variants
- **UI Elements**: Panels, buttons, inputs, tabs, scrollbars
- **Editor Features**: Gutter, line numbers, selection, highlights
- **Syntax Tokens**: 40+ token types with font styling
- **Terminal Colors**: Full ANSI set with bright/dim variants
- **Multiplayer**: 8-player collaborative colors

### Color Palette
- **Background**: #121212 (Material dark)
- **Primary Text**: #d4c5b9 (Warm cream)
- **Accent Blue**: #7c9fa8 (Functions, links)
- **Warm Red**: #c4746e (Errors, deletions)
- **Earth Green**: #95b572 (Strings, additions)
- **Golden Yellow**: #c4a657 (Warnings, constants)
- **Warm Orange**: #d6936b (Operators, attributes)
- **Soft Purple**: #a987a8 (Keywords, control flow)
- **Muted Aqua**: #85a585 (Types, classes)

## Requirements

- Zed editor (latest version)
- True color support
- Zed Extensions API v0.2.0+

## Troubleshooting

If the theme doesn't appear:
1. Ensure the extension is in `~/.config/zed/extensions/karasu/`
2. Check that both `extension.toml` and `themes/karasu.json` are present
3. Verify JSON syntax is valid (use `python3 -m json.tool themes/karasu.json`)
4. Restart Zed completely
5. Check Zed's extension manager for any errors
6. Verify the theme appears in Settings → Themes

### Common Issues
- **Extension not loading**: Ensure directory structure matches Zed extension format
- **Theme not appearing**: Check that `extension.toml` references correct theme file
- **Colors incorrect**: Verify you're using the latest Zed version with v0.2.0 theme schema support

## License

MIT License
