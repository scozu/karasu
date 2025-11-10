# Karasu Colorscheme for Alacritty

A warm, atmospheric terminal colorscheme for Alacritty combining Material Design dark backgrounds with warm earth tones.

## Installation

### Method 1: Direct Download
```bash
# Download to Alacritty config directory
curl -o ~/.config/alacritty/karasu.toml https://raw.githubusercontent.com/scozu/karasu/main/extras/alacritty/karasu.toml

# Add to your alacritty.yml
echo "import:" >> ~/.config/alacritty/alacritty.yml
echo "  - ~/.config/alacritty/karasu.toml" >> ~/.config/alacritty/alacritty.yml
```

### Method 2: Manual Installation
1. Copy `karasu.toml` to your Alacritty config directory:
   ```bash
   cp extras/alacritty/karasu.toml ~/.config/alacritty/karasu.toml
   ```

2. Import it in your main `alacritty.yml`:
   ```yaml
   import:
     - ~/.config/alacritty/karasu.toml
   ```

3. Restart Alacritty

## Configuration

The theme includes:
- 16 ANSI colors (8 normal + 8 bright)
- Background and foreground colors
- Cursor colors
- Selection colors
- True color support

## Color Palette

- **Background**: #121212 (Material dark)
- **Foreground**: #d4c5b9 (Warm cream)
- **Cursor**: #d8a657 (Bright yellow)
- **Selection**: #2d3437 (Visual selection)

## Customization

You can override any color in your main `alacritty.yml` after the import:
```yaml
colors:
  primary:
    background: '#your-custom-bg'
    foreground: '#your-custom-fg'
```

## Requirements

- Alacritty terminal emulator
- True color support

## Troubleshooting

If colors don't appear correctly:
1. Ensure Alacritty is using true color mode
2. Check that the TOML file is valid
3. Verify the import path in your main config
4. Restart Alacritty completely

## License

MIT License