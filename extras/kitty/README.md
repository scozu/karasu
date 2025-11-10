# Karasu Colorscheme for Kitty

A warm, atmospheric terminal colorscheme for Kitty combining Material Design dark backgrounds with warm earth tones.

## Installation

### Method 1: Direct Download
```bash
# Download to Kitty config directory
curl -o ~/.config/kitty/karasu.conf https://raw.githubusercontent.com/scozu/karasu/main/extras/kitty/karasu.conf

# Add to your kitty.conf
echo "include karasu.conf" >> ~/.config/kitty/kitty.conf
```

### Method 2: Manual Installation
1. Copy `karasu.conf` to your Kitty config directory:
   ```bash
   cp extras/kitty/karasu.conf ~/.config/kitty/karasu.conf
   ```

2. Include it in your main `kitty.conf`:
   ```
   include karasu.conf
   ```

3. Reload Kitty configuration (Ctrl + Shift + F5) or restart Kitty

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

You can override any color in your main `kitty.conf` after the include:
```conf
cursor #your-custom-color
background #your-custom-bg
```

## Requirements

- Kitty terminal emulator
- True color support

## Troubleshooting

If colors don't appear correctly:
1. Ensure Kitty is using true color mode
2. Check that the conf file syntax is valid
3. Verify the include path in your main config
4. Reload Kitty configuration completely

## License

MIT License