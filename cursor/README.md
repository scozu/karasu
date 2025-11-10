# Karasu Colorscheme for Cursor/VS Code

A warm, atmospheric colorscheme for Cursor and VS Code combining Material Design dark backgrounds with warm earth tones.

## Installation

### From Marketplace (Recommended)

1. Open Cursor/VS Code
2. Go to Extensions (Cmd/Ctrl + Shift + X)
3. Search for "Karasu" by scozu
4. Click Install

### Manual Installation

1. Copy the `cursor` directory to your extensions folder:
   ```bash
   # For VS Code
   cp -r cursor ~/.vscode/extensions/karasu-0.1.0
   
   # For Cursor
   cp -r cursor ~/.cursor/extensions/karasu-0.1.0
   ```

2. Or install via command line:
   ```bash
   # For VS Code
   code --install-extension cursor/
   
   # For Cursor
   cursor --install-extension cursor/
   ```

3. Reload the editor

4. Select the theme:
   - Open Command Palette (Cmd/Ctrl + Shift + P)
   - Type "Preferences: Color Theme"
   - Select "Karasu"

## Features

- TextMate scope mappings for all common languages
- Semantic token support (LSP)
- Editor UI customization (sidebar, status bar, tabs)
- Git decoration colors
- Bracket pair colorization
- Terminal integration with ANSI colors
- Search and selection highlighting
- Minimap styling
- Scrollbar theming

## Color Palette

- **Background**: #121212 (Material dark)
- **Foreground**: #d4c5b9 (Warm cream)
- **Selection**: #2d3437 (Visual selection)
- **Active Line**: #1a1a1a (Subtle highlight)

## Customization

You can customize the theme by editing `themes/karasu.json` and reloading the window.

## Requirements

- Cursor or VS Code
- True color support

## Troubleshooting

If the theme doesn't work correctly:
1. Ensure the extension is properly installed
2. Check that the theme appears in the color theme picker
3. Reload the window (Cmd/Ctrl + R)
4. Verify semantic tokens are enabled for LSP features

## License

MIT License
