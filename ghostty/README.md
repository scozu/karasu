# Karasu Colorscheme for Ghostty

A warm, atmospheric terminal colorscheme for Ghostty combining Material Design dark backgrounds with warm earth tones.

## Installation

### Method 1: Direct Download
```bash
# Download to Ghostty config directory
curl -o ~/.config/ghostty/themes/karasu https://raw.githubusercontent.com/scozu/karasu/main/ghostty/karasu
echo "include ~/.config/ghostty/themes/karasu" >> ~/.config/ghostty/config
```

### Method 2: Manual Installation
1. Copy `karasu` to your Ghostty themes directory:
   ```bash
   cp ghostty/karasu ~/.config/ghostty/themes/karasu
   ```

2. Include it in your main Ghostty config (`~/.config/ghostty/config`):
   ```
   include ~/.config/ghostty/themes/karasu
   ```

3. Restart Ghostty or reload configuration

## Configuration

The theme includes:
- 16 ANSI colors (8 normal + 8 bright)
- Background and foreground colors
- Cursor color (bright yellow)
- Selection colors
- Full ANSI color support for terminal applications

## Color Palette

- **Background**: #121212 (Material dark)
- **Foreground**: #d4c5b9 (Warm cream)
- **Cursor**: #d8a657 (Bright yellow)
- **Selection**: #2d3437 (Visual selection)

## Customization

You can override any color by adding lines after the include:
```conf
cursor-color = your-custom-color
background = your-custom-bg
```

## Requirements

- Ghostty terminal emulator
- True color support in your terminal

## Troubleshooting

If colors don't appear correctly:
1. Ensure Ghostty is using true color mode
2. Check that the theme file is in the correct directory
3. Verify the include path in your main config

## License

MIT License
