# Karasu Colorscheme for Ghostty

A warm, atmospheric terminal colorscheme for Ghostty combining Material Design dark backgrounds with warm earth tones.

## Installation

### Installation

**Method 1: Git Clone (Recommended)**
```bash
git clone https://github.com/scozu/karasu.git ~/.config/ghostty/themes/karasu
echo "theme = karasu" >> ~/.config/ghostty/config
```

**Method 2: Direct Download**
```bash
# Create themes directory if it doesn't exist
mkdir -p ~/.config/ghostty/themes

# Download theme file directly
curl -o ~/.config/ghostty/themes/karasu https://raw.githubusercontent.com/scozu/karasu/main/ghostty/karasu

# Add to your Ghostty config
echo "theme = karasu" >> ~/.config/ghostty/config
```

**Method 3: Manual Installation**
1. Download [`ghostty/karasu`](https://raw.githubusercontent.com/scozu/karasu/main/ghostty/karasu) from the repository
2. Save it as `~/.config/ghostty/themes/karasu`
3. Add `theme = karasu` to your Ghostty config

After installation, restart Ghostty or reload configuration (Cmd/Ctrl + R).

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
