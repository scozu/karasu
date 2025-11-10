# Karasu Colorscheme for WezTerm

A warm, atmospheric terminal colorscheme for WezTerm combining Material Design dark backgrounds with warm earth tones.

## Installation

### Method 1: Direct Download
```bash
# Download to WezTerm config directory
curl -o ~/.config/wezterm/karasu.lua https://raw.githubusercontent.com/scozu/karasu/main/extras/wezterm/karasu.lua

# Add to your wezterm.lua
echo 'return require("karasu")' >> ~/.config/wezterm/wezterm.lua
```

### Method 2: Manual Installation
1. Copy `karasu.lua` to your WezTerm config directory:
   ```bash
   cp extras/wezterm/karasu.lua ~/.config/wezterm/karasu.lua
   ```

2. Import it in your main `wezterm.lua`:
   ```lua
   local karasu = require("karasu")
   return karasu
   ```

3. Reload WezTerm configuration (Ctrl + Shift + R) or restart WezTerm

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

You can override any color in your main `wezterm.lua`:
```lua
local karasu = require("karasu")

-- Override colors
karasu.color_schemes.Karasu.background = "#your-custom-bg"
karasu.color_schemes.Karasu.foreground = "#your-custom-fg"

return karasu
```

## Requirements

- WezTerm terminal emulator
- True color support

## Troubleshooting

If colors don't appear correctly:
1. Ensure WezTerm is using true color mode
2. Check that the Lua file syntax is valid
3. Verify the require path in your main config
4. Reload WezTerm configuration completely

## License

MIT License