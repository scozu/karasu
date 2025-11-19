# カラス

Karasu is a terminal-first, atmospheric colorscheme with a touch of warmth.

[![](https://raw.githubusercontent.com/scozu/karasu/main/karasu-banner.png)](https://raw.githubusercontent.com/scozu/karasu/main/karasu-banner.png)

## Installation

### Neovim

**lazy.nvim**:
```lua
{
  'scozu/karasu',
  lazy = false,
  priority = 1000,
  config = function()
    require('karasu').setup()
  end
}
```

**packer.nvim**:
```lua
use {
  'scozu/karasu',
  config = function()
    require('karasu').setup()
  end
}
```

**vim-plug**:
```vim
Plug 'scozu/karasu'
```

**Requirements**: Neovim 0.8.0+ with `termguicolors` enabled.

**Configuration** (optional - defaults shown):
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

### Ghostty
```bash
git clone https://github.com/scozu/karasu.git ~/.config/ghostty/themes/karasu
echo "theme = karasu" >> ~/.config/ghostty/config
```
Then restart Ghostty or reload the configuration (Cmd/Ctrl + R).

### Zed
```bash
git clone https://github.com/scozu/karasu ~/.config/zed/extensions/karasu
```
Then select "Karasu" in Zed's theme settings (Cmd/Ctrl + , → Themes).

## Screenshots

### Neovim

#### Python
![Neovim Python Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-python.png)

#### TypeScript/JavaScript
![Neovim TypeScript Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-typescript.png)

#### Rust
![Neovim Rust Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-rust.png)

#### Lua
![Neovim Lua Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-lua.png)

### Cursor (VS Code)

#### TypeScript with LSP
![Cursor TypeScript Syntax Highlighting](screenshots/cursor-typescript.png)

#### Python with Semantic Tokens
![Cursor Python Syntax Highlighting](screenshots/cursor-python.png)

### Zed

#### Multi-language Workspace
![Zed Multi-language Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/zed-multilang.png)

### Terminal (Ghostty)

#### Syntax Highlighted Output
![Ghostty Terminal Syntax Highlighting](screenshots/ghostty-terminal.png)

## Design 

- **Material Dark** - Elevated surfaces with subtle depth (#121212 base)
- **Warm earth tones** - Muted, saturated colors inspired by natural materials
- **Balanced contrast** - Readable without eye strain, optimized for long sessions
- **Consistent experience** - Unified palette across all supported platforms
- **Sophisticated palette** - Carefully chosen colors that work harmoniously together

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
karasuBrightRed: #ea6962      /* Terminal red - errors, critical warnings */
karasuBrightGreen: #a9b665    /* Terminal green - success, active indicators */
karasuBrightYellow: #d8a657   /* Terminal yellow - warnings, attention */
karasuBrightBlue: #8ba4b0     /* Terminal blue - information, links */
karasuBrightMagenta: #d3869b  /* Terminal magenta - special emphasis */
karasuBrightCyan: #89b482     /* Terminal cyan - info, secondary emphasis */
karasuBrightWhite: #fbf1c7    /* Terminal white - bright text, highlights */
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

### Neovim

#### Python
![Neovim Python Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-python.png)

#### TypeScript/JavaScript
![Neovim TypeScript Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-typescript.png)

#### Rust
![Neovim Rust Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-rust.png)

#### Lua
![Neovim Lua Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-lua.png)

### Cursor (VS Code)

#### TypeScript with LSP
![Cursor TypeScript Syntax Highlighting](screenshots/cursor-typescript.png)

#### Python with Semantic Tokens
![Cursor Python Syntax Highlighting](screenshots/cursor-python.png)

### Zed

#### Multi-language Workspace
![Zed Multi-language Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/zed-multilang.png)

### Terminal (Ghostty)

#### Syntax Highlighted Output
![Ghostty Terminal Syntax Highlighting](screenshots/ghostty-terminal.png)

## Accessibility

- **Foreground contrast**: karasuFg0 on karasuBg0 = ~11:1 (WCAG AAA)
- **Syntax colors**: All maintain >4.5:1 contrast (WCAG AA)
- **Bright variants**: karasuBright* colors available for terminal emphasis
- **Low light optimized**: Warm tones reduce eye strain

## Documentation

For detailed installation and configuration instructions for each platform:

- [Neovim Documentation](neovim/README.md)
- [Ghostty Documentation](ghostty/README.md)
- [Zed Documentation](zed/README.md)
- [OpenCode Documentation](opencode/README.md)

### References

This colorscheme draws inspiration from several excellent themes:

- **[Gruvbox Material Dark](https://github.com/f4z3r/gruvbox-material.nvim)** - Warm earth tones, Material Design backgrounds, proven color relationships
- **[Kanagawa Dragon](https://github.com/rebelot/kanagawa.nvim)** - Sophisticated muted palette, excellent contrast ratios, structural patterns
- **[Kanso](https://github.com/0xstepit/flow.nvim)** - Minimalist aesthetic, refined color harmony, subtle depth
- **[Black Metal (Gorgoroth)](https://github.com/metalelf0/base16-black-metal-scheme)** - Minimalist aesthetic, stark contrasts, atmospheric depth

### Resources

- [VS Code Theme Documentation](https://code.visualstudio.com/api/extension-guides/color-theme)
- [Zed Theme Schema](https://zed.dev/schema/themes/v0.2.0.json)
- [Neovim Highlight Groups](https://neovim.io/doc/user/syntax.html#highlight-groups)
- [TreeSitter Queries](https://tree-sitter.github.io/tree-sitter/syntax-highlighting)
- [ANSI Color Standards](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
