# Karasu Theme for OpenCode

A warm, desaturated dark theme for OpenCode inspired by gruvbox, featuring carefully balanced colors that are easy on the eyes during long coding sessions.

## Installation

1. Create the OpenCode themes directory if it doesn't exist:
   ```bash
   mkdir -p ~/.config/opencode/themes
   ```

2. Copy the theme file:
    ```bash
    cp opencode/themes/karasu.json ~/.config/opencode/themes/
    ```

## Usage

### Using the Theme Command

1. Start OpenCode
2. Type `/theme` to bring up the theme selector
3. Select "karasu" from the list

### Using Configuration

Add the theme to your OpenCode config file (`~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "theme": "karasu"
}
```

## Color Palette

The theme is based on the Karasu color palette:

### Background Colors
- **karasuBg0**: `#121212` - Main background
- **karasuBg1**: `#1a1a1a` - Panel background
- **karasuBg2**: `#222222` - Element background
- **karasuBg3**: `#2a2a2a` - Borders and subtle elements
- **karasuBg4**: `#333333` - Hover states

### Foreground Colors
- **karasuFg0**: `#d4c5b9` - Primary text
- **karasuFg1**: `#c5b6aa` - Secondary text
- **karasuFg2**: `#a89984` - Muted text
- **karasuFg3**: `#928374` - Dim text
- **karasuFgDim**: `#665c54` - Comments and subtle elements

### Syntax Colors
- **karasuRed**: `#c4746e` - Errors, deletions
- **karasuGreen**: `#95b572` - Success, additions, strings
- **karasuYellow**: `#c4a657` - Warnings, numbers
- **karasuBlue**: `#7c9fa8` - Primary accent, functions, links
- **karasuPurple**: `#a987a8` - Keywords
- **karasuAqua**: `#85a585` - Types, secondary accent
- **karasuOrange**: `#d6936b` - Operators, variables, emphasis

### Bright Variants
- **karasuBrightRed**: `#ea6962`
- **karasuBrightGreen**: `#a9b665`
- **karasuBrightYellow**: `#d8a657`
- **karasuBrightBlue**: `#8ba4b0`
- **karasuBrightMagenta**: `#d3869b`
- **karasuBrightCyan**: `#89b482`
- **karasuBrightWhite**: `#fbf1c7`

## Features

- **True color support**: Requires a terminal that supports 24-bit color
- **Dark/light variants**: Automatically adapts to system theme preference
- **Comprehensive coverage**: Includes all UI elements, syntax highlighting, and markdown rendering
- **Accessibility focused**: Careful contrast ratios for readability
- **Consistent design**: Maintains visual harmony across all elements

## Terminal Requirements

For the theme to display correctly, your terminal must support **truecolor** (24-bit color):

- Check support: `echo $COLORTERM` (should output `truecolor` or `24bit`)
- Enable if needed: `export COLORTERM=truecolor`

Most modern terminals support this by default:
- Ghostty
- iTerm2, Windows Terminal
- Recent versions of GNOME Terminal

## Project-Specific Installation

For project-specific themes, place the file in:
```
<project-root>/.opencode/themes/karasu.json
```

This will override the user-wide theme and ensure consistency across team members.

## Compatibility

This theme follows the OpenCode theme schema v1.0 and is compatible with all OpenCode versions that support custom themes.

## Contributing

The Karasu theme is part of the larger Karasu colorscheme ecosystem. If you find issues or want to contribute:

1. Check the [main Karasu repository](https://github.com/scozu/karasu)
2. Open an issue with details about the problem
3. Submit a pull request with your improvements

## License

This theme is licensed under the same terms as the Karasu colorscheme project.