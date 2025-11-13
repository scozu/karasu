# Karasu (カラス) Colorscheme

A dark, atmospheric colorscheme combining the warmth of Gruvbox Material Dark with the sophistication of Kanagawa Dragon and minimalist elegance of Black Metal aesthetics. Karasu (meaning "crow" in Japanese) provides a unified, refined dark experience across multiple editors and terminals.

![Karasu Banner](screenshots/karasu-banner-sm.png)

## Overview

Karasu blends Material Design dark backgrounds with carefully balanced warm earth tones, creating a sophisticated palette that's both comfortable for long coding sessions and visually striking. The scheme emphasizes readability while maintaining atmospheric depth through layered backgrounds and harmonious color relationships.

## Quick Install

### Neovim
```lua
-- Using lazy.nvim
{
  'scozu/karasu',
  lazy = false,
  priority = 1000,
  config = function()
    require('karasu').setup({
      transparent = false,
      italic_comments = true,
      contrast = 'medium'
    })
  end
}
```

### Cursor (VS Code)
Install from VS Code Marketplace: `scozu.karasu`

### Ghostty
```bash
# Download to Ghostty config directory
curl -o ~/.config/ghostty/themes/karasu https://raw.githubusercontent.com/scozu/karasu/main/ghostty/karasu
echo "include ~/.config/ghostty/themes/karasu" >> ~/.config/ghostty/config
```

### Zed
Install from Zed extensions marketplace or manually:
```bash
# Clone to Zed extensions directory
git clone https://github.com/scozu/karasu ~/.config/zed/extensions/karasu
```

**Features**: Complete UI theming, syntax highlighting, multiplayer support, terminal ANSI colors

### Terminal Emulators
See platform-specific READMEs in respective directories:
- [Alacritty](extras/alacritty/) - TOML configuration
- [Kitty](extras/kitty/) - `.conf` format  
- [WezTerm](extras/wezterm/) - Lua configuration
- [iTerm2](extras/iterm2/) - `.itermcolors` file

## Design Philosophy

- **Material dark backgrounds** - Elevated surfaces with subtle depth (#121212 base)
- **Warm earth tones** - Muted, saturated colors inspired by natural materials
- **Balanced contrast** - Readable without eye strain, optimized for long sessions
- **Consistent experience** - Unified palette across all supported platforms
- **Sophisticated palette** - Carefully chosen colors that work harmoniously together

## Color Palette

### Background Layers
```
karasuBg0: #121212       /* Main background - Material dark */
karasuBg1: #1a1a1a       /* Elevated surfaces */
karasuBg2: #222222       /* Popups, menus */
karasuBg3: #2a2a2a       /* Higher elevation */
karasuBg4: #333333       /* Borders, separators */
karasuBgVisual: #2d3437  /* Visual selection */
karasuBgSearch: #3c4144  /* Search highlights */
```

### Foreground Tones
```
karasuFg0: #d4c5b9    /* Primary text - warm cream */
karasuFg1: #c5b6aa    /* Secondary text */
karasuFg2: #a89984    /* Tertiary text */
karasuFg3: #928374    /* Muted text */
karasuFgDim: #665c54  /* Dimmed text, comments */
```

### Syntax Colors (Saturated)
```
karasuRed: #c4746e       /* Errors, deletions, important keywords */
karasuGreen: #95b572     /* Strings, additions, success */
karasuYellow: #c4a657    /* Warnings, numbers, constants */
karasuBlue: #7c9fa8      /* Functions, methods, identifiers */
karasuPurple: #a987a8    /* Keywords, control flow */
karasuAqua: #85a585      /* Classes, types, special */
karasuOrange: #d6936b    /* Parameters, attributes, operators */
```

### Bright Accents
```
karasuBrightRed: #ea6962
karasuBrightGreen: #a9b665
karasuBrightYellow: #d8a657
karasuBrightBlue: #8ba4b0
karasuBrightMagenta: #d3869b
karasuBrightCyan: #89b482
karasuBrightWhite: #fbf1c7
```

## Platform Support

- ✅ **Neovim** - Full Lua-based colorscheme with TreeSitter & LSP support
- ✅ **Ghostty** - Terminal configuration with ANSI colors
- ✅ **Zed** - Complete extension with comprehensive UI theming, syntax highlighting, multiplayer support
- ✅ **Cursor** - VS Code compatible theme with semantic tokens
- 🔄 **Terminal extras** - Alacritty, Kitty, WezTerm, iTerm2

## Configuration

### Neovim Options
```lua
require('karasu').setup({
  transparent = false,        -- Enable transparent background
  italic_comments = false,     -- Italic comments
  italic_keywords = false,     -- Italic keywords
  italic_functions = false,    -- Italic functions
  italic_strings = false,     -- Italic strings
  italic_variables = false,    -- Italic variables
  contrast = "medium",         -- "soft", "medium", "hard"
})
```

### Usage
```vim
" Load colorscheme
:colorscheme karasu

" Or with Lua
lua require('karasu').setup()
```

## Syntax Highlighting Strategy

### Language-Agnostic Mappings

**Control & Structure**:
- Keywords: `karasuPurple` (#a987a8) - `if`, `for`, `while`, `return`, `import`
- Functions: `karasuBlue` (#7c9fa8) - Function names, method calls
- Types: `karasuAqua` (#85a585) - Class names, type annotations
- Operators: `karasuOrange` (#d6936b) - `+`, `-`, `*`, `/`, `=`, `&&`, `||`

**Literals & Data**:
- Strings: `karasuGreen` (#95b572) - String literals, documentation
- Numbers: `karasuYellow` (#c4a657) - Integers, floats, hex values
- Constants: `karasuYellow` (#c4a657) - `true`, `false`, `null`, `None`, constants
- Properties: `karasuFg1` (#c5b6aa) - Object properties, attributes

**Semantics**:
- Comments: `karasuFgDim` (#665c54) - All comment types
- Variables: `karasuFg0` (#d4c5b9) - Variable names, identifiers
- Parameters: `karasuOrange` (#d6936b) - Function parameters
- Special: `karasuAqua` (#85a585) - Decorators, macros, preprocessor

### LSP Diagnostics

- **Error**: `karasuRed` (#c4746e) with underline
- **Warning**: `karasuYellow` (#c4a657) with underline
- **Info**: `karasuBlue` (#7c9fa8) with subtle underline
- **Hint**: `karasuFg3` (#928374) with dotted underline

### Git Integration

- **Added**: `karasuGreen` (#95b572)
- **Modified**: `karasuYellow` (#c4a657)
- **Removed**: `karasuRed` (#c4746e)
- **Conflict**: `karasuOrange` (#d6936b)

## Screenshots

> **📸 Need help creating screenshots?** See [`screenshots/screenshot-guide.md`](screenshots/screenshot-guide.md) for comprehensive strategies and best practices. Sample code files are available in [`screenshots/sample-code/`](screenshots/sample-code/).

### Neovim

#### Python
![Neovim Python Syntax Highlighting](screenshots/neovim-python.png)

#### TypeScript/JavaScript
![Neovim TypeScript Syntax Highlighting](screenshots/neovim-typescript.png)

#### Rust
![Neovim Rust Syntax Highlighting](screenshots/neovim-rust.png)

#### Lua
![Neovim Lua Syntax Highlighting](screenshots/neovim-lua.png)

### Cursor (VS Code)

#### TypeScript with LSP
![Cursor TypeScript Syntax Highlighting](screenshots/cursor-typescript.png)

#### Python with Semantic Tokens
![Cursor Python Syntax Highlighting](screenshots/cursor-python.png)

### Zed

#### Multi-language Workspace
![Zed Multi-language Syntax Highlighting](screenshots/zed-multilang.png)

### Terminal (Ghostty)

#### Syntax Highlighted Output
![Ghostty Terminal Syntax Highlighting](screenshots/ghostty-terminal.png)

## Accessibility

- **Foreground contrast**: karasuFg0 on karasuBg0 = ~11:1 (WCAG AAA)
- **Syntax colors**: All maintain >4.5:1 contrast (WCAG AA)
- **Bright variants**: karasuBright* colors available for terminal emphasis
- **Colorblind friendly**: Distinct hues with brightness differences
- **Low light optimized**: Warm tones reduce eye strain

## Platform-Specific Documentation

For detailed installation and configuration instructions for each platform:

- [Neovim Documentation](neovim/README.md)
- [Ghostty Documentation](ghostty/README.md)
- [Zed Documentation](zed/README.md)
- [Cursor Documentation](cursor/README.md)
- [Terminal Extras](extras/)

## Development

For insights into the development process, technical decisions, and implementation details, see [Development Documentation](docs/development.md).

## License

MIT License

## Inspiration & References

This colorscheme draws inspiration from several excellent themes:

- **[Gruvbox Material Dark](https://github.com/f4z3r/gruvbox-material.nvim)** - Warm earth tones, Material Design backgrounds, proven color relationships
- **[Kanagawa Dragon](https://github.com/rebelot/kanagawa.nvim)** - Sophisticated muted palette, excellent contrast ratios, structural patterns
- **[Black Metal (Gorgoroth)](https://github.com/metalelf0/base16-black-metal-scheme)** - Minimalist aesthetic, stark contrasts, atmospheric depth

### Key Differences

**From Gruvbox**: More saturated accent colors, warmer foreground tones, deeper Material backgrounds

**From Kanagawa**: Warmer palette, less blue/teal emphasis, Material design influence

**From Black Metal**: More color variety, warmer tones, less monochromatic

## Contributing

Contributions welcome! Please open an issue for discussion before submitting PRs.

## Resources & References

### Documentation & Standards
- [VS Code Theme Documentation](https://code.visualstudio.com/api/extension-guides/color-theme)
- [Zed Theme Schema](https://zed.dev/schema/themes/v0.2.0.json)
- [Neovim Highlight Groups](https://neovim.io/doc/user/syntax.html#highlight-groups)
- [TreeSitter Queries](https://tree-sitter.github.io/tree-sitter/syntax-highlighting)
- [ANSI Color Standards](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)