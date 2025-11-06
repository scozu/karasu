# Karasu Colorscheme for Ghostty

A warm, atmospheric terminal colorscheme for Ghostty.

## Installation

1. Copy `karasu.conf` to your Ghostty config directory:
   ```bash
   cp ghostty/karasu.conf ~/.config/ghostty/karasu.conf
   ```

2. Include it in your main Ghostty config (`~/.config/ghostty/config`):
   ```
   include karasu.conf
   ```

   Or merge the contents directly into your config file.

## Configuration

The theme includes:
- 16 ANSI colors (8 normal + 8 bright)
- Background and foreground colors
- Cursor color (bright yellow)
- Selection colors

## Customization

You can override any color by adding lines after the include:
```
cursor-color = your-color
```

## License

TBD - Likely MIT License
