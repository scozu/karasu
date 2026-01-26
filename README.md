# カラス

Karasu is a terminal-first, atmospheric colorscheme with a touch of warmth.

## Theme Variants

Karasu adapts to your environment with atmospheric themes:

### Karasu Night
The original dark theme, optimized for focused work in low-light environments.

### Karasu Snow  
A crisp light theme, designed for daylight clarity in bright environments.

### Auto-Switching
Karasu automatically follows your system theme preferences. Set your OS to dark/light mode and Karasu will adapt instantly.

For manual control, use `:set background=dark` for Night or `:set background=light` for Snow.

[![](https://raw.githubusercontent.com/scozu/karasu/main/karasu-banner.png)](https://raw.githubusercontent.com/scozu/karasu/main/karasu-banner.png)

![Karasu Color Palette](https://raw.githubusercontent.com/scozu/karasu/main/karasu-palette.svg)

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

**Auto-switching**: With `mode = "auto"` (default), Karasu will automatically switch between Night and Snow when your system changes themes.

**Requirements**: Neovim 0.8.0+ with `termguicolors` enabled.

**Configuration** (optional - defaults shown):
```lua
require('karasu').setup({
  mode = "auto",             -- "auto", "night", "snow"
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
echo "theme = dark:karasu-night,light:karasu-snow" >> ~/.config/ghostty/config
```
Then restart Ghostty or reload the configuration (Cmd/Ctrl + R).

### Zed
```bash
git clone https://github.com/scozu/karasu ~/.config/zed/extensions/karasu
```
Then configure Zed to use both themes in your settings.json:
```json
{
  "theme": {
    "mode": "system",
    "light": "Karasu Snow",
    "dark": "Karasu Night"
  }
}
```
Zed will automatically switch between themes based on your system settings.

### OpenCode
```bash
git clone https://github.com/scozu/karasu ~/.config/opencode/themes/karasu
```
Then configure OpenCode to use both themes by adding to your config.json:
```json
{
  "theme": {
    "mode": "system",
    "light": "karasu-snow",
    "dark": "karasu-night"
  }
}
```
OpenCode will automatically switch between Karasu Night and Snow based on your system settings.

### Zed
```bash
git clone https://github.com/scozu/karasu ~/.config/zed/extensions/karasu
```
Then configure Zed to use both themes in your settings.json:
```json
{
  "theme": {
    "mode": "system",
    "light": "Karasu Snow",
    "dark": "Karasu Night"
  }
}
```
Zed will automatically switch between themes based on your system settings.

## Screenshots

### Neovim & Ghostty

![Zed Multi-language Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/zed-multilang.png)

## Design

### Karasu Night (Dark)
- **Material Dark** - Elevated surfaces with subtle depth (#121212 base)
- **Warm earth tones** - Muted, saturated colors inspired by natural materials
- **Balanced contrast** - Readable without eye strain, optimized for long sessions

### Karasu Snow (Light)  
- **Warm off-white backgrounds** - No pure white for comfortable readability (#f8f7f6 base)
- **Consistent earth tones** - Same warm saturation as Night for harmony
- **Eye-friendly contrast** - Darker foregrounds on warm backgrounds for reduced strain

### Unified Characteristics
- **Sophisticated palette** - Carefully chosen colors that work harmoniously together
- **Consistent experience** - Unified semantic mapping across all supported platforms
- **Comfort-focused** - Both themes designed for extended usage without eye strain

### Background Layers

#### Karasu Night
```
karasuBg0: #121212       /* Main background - Material dark */
karasuBg1: #1a1a1a       /* Elevated surfaces */
karasuBg2: #222222       /* Popups, menus */
karasuBg3: #2a2a2a       /* Higher elevation */
karasuBg4: #333333       /* Borders, separators */
karasuBgVisual: #2d3437  /* Visual selection */
karasuBgSearch: #3c4144  /* Search highlights */
```

#### Karasu Snow
```
karasuBg0: #f8f7f6       /* Main background - warm off-white */
karasuBg1: #f1f0ef       /* Elevated surfaces */
karasuBg2: #ebe9e8       /* Popups, menus */
karasuBg3: #e5e3e2       /* Higher elevation */
karasuBg4: #dfdddb       /* Borders, separators */
karasuBgVisual: #d6d4d1  /* Visual selection */
karasuBgSearch: #cdc9c5  /* Search highlights */
```
Then configure Zed to use both themes in your settings.json:
```json
{
  "theme": {
    "mode": "system",
    "light": "Karasu Snow",
    "dark": "Karasu Night"
  }
}
```
Zed will automatically switch between themes based on your system settings.

## Screenshots

### Neovim & Ghostty

![Neovim Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-python.png)
![Neovim Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-typescript.png)
![Neovim Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-rust.png)
![Neovim Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/neovim-lua.png)

### Zed

![Zed Multi-language Syntax Highlighting](https://github.com/scozu/karasu/releases/download/screenshot-assets/zed-multilang.png)

## Design

### Karasu Night (Dark)
- **Material Dark** - Elevated surfaces with subtle depth (#121212 base)
- **Warm earth tones** - Muted, saturated colors inspired by natural materials
- **Balanced contrast** - Readable without eye strain, optimized for long sessions

### Background Layers

#### Karasu Night
```
karasuBg0: #121212       /* Main background - Material dark */
karasuBg1: #1a1a1a       /* Elevated surfaces */
karasuBg2: #222222       /* Popups, menus */
karasuBg3: #2a2a2a       /* Higher elevation */
karasuBg4: #333333       /* Borders, separators */
karasuBgVisual: #2d3437  /* Visual selection */
karasuBgSearch: #3c4144  /* Search highlights */
```

#### Karasu Snow
```
karasuBg0: #f8f7f6       /* Main background - warm off-white */
karasuBg1: #f1f0ef       /* Elevated surfaces */
karasuBg2: #ebe9e8       /* Popups, menus */
karasuBg3: #e5e3e2       /* Higher elevation */
karasuBg4: #dfdddb       /* Borders, separators */
```

#### Karasu Snow
```
karasuBg0: #f8f7f6       /* Main background - warm off-white */
karasuBg1: #f1f0ef       /* Elevated surfaces */
karasuBg2: #ebe9e8       /* Popups, menus */
karasuBg3: #e5e3e2       /* Higher elevation */
karasuBg4: #dfdddb       /* Borders, separators */
karasuBgVisual: #d6d4d1  /* Visual selection */
karasuBgSearch: #cdc9c5  /* Search highlights */
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

#### Karasu Night (Dark)
```
karasuBrightRed: #ea6962      /* Terminal red - errors, critical warnings */
karasuBrightGreen: #a9b665    /* Terminal green - success, active indicators */
karasuBrightYellow: #d8a657   /* Terminal yellow - warnings, attention */
karasuBrightBlue: #8ba4b0     /* Terminal blue - information, links */
karasuBrightMagenta: #d3869b  /* Terminal magenta - special emphasis */
karasuBrightCyan: #89b482     /* Terminal cyan - info, secondary emphasis */
karasuBrightWhite: #fbf1c7    /* Terminal white - bright text, highlights */
```

#### Karasu Snow (Light)
```
karasuSnowBrightRed: #cc241d    /* Terminal red - deeper red for contrast */
karasuSnowBrightGreen: #98971a  /* Terminal green - darker green for contrast */
karasuSnowBrightYellow: #d79921 /* Terminal yellow - darker yellow for contrast */
karasuSnowBrightBlue: #458588    /* Terminal blue - darker blue for contrast */
karasuSnowBrightMagenta: #b16286 /* Terminal magenta - darker magenta for contrast */
karasuSnowBrightCyan: #689d6a   /* Terminal cyan - darker cyan for contrast */
karasuSnowBrightWhite: #504945   /* Terminal white - dark gray for highest contrast */
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



## Color Preview

See all colors from both Karasu Night and Snow themes side-by-side:
- **HTML Preview**: [Open colors-preview.html](./colors-preview.html)

## Accessibility

Both Karasu Night and Snow maintain the same accessibility standards:

- **Foreground contrast**: ~11:1 (WCAG AAA) for primary text
- **Syntax colors**: All maintain >4.5:1 contrast (WCAG AA)
- **Bright variants**: Terminal colors optimized for both themes
- **Comfort-focused**: Both themes designed for extended usage without eye strain

## Documentation

For detailed installation and configuration instructions for each platform:

- [Neovim Documentation](neovim/README.md)
- [Ghostty Documentation](ghostty/README.md)
### OpenCode
```bash
git clone https://github.com/scozu/karasu ~/.config/opencode/themes/karasu
```
Then configure OpenCode to use both themes by adding to your config.json:
```json
{
  "theme": {
    "mode": "system",
    "light": "karasu-snow",
    "dark": "karasu-night"
  }
}
```
OpenCode will automatically switch between Karasu Night and Snow based on your system settings.

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
