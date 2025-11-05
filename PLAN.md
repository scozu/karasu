# Karasu Colorscheme - Implementation Plan

## Overview

Karasu (カラス, meaning "crow" in Japanese) is a dark colorscheme inspired by Black Metal aesthetics (particularly Gorgoroth), Gruvbox Material Dark, Kanagawa Dragon, and Kanso Pearl. The theme will provide a unified dark, atmospheric experience across multiple editors and terminals.

## Design Philosophy

- **Primary Inspiration**: Black Metal aesthetic (Gorgoroth) - stark contrasts, deep blacks, subtle metallic accents
- **Base Structure**: Gruvbox Material Dark - proven color relationships and material design principles
- **Color Palette**: Kanagawa Dragon - muted, sophisticated color choices
- **Refinement**: Kanso Pearl - subtle elegance and refinement

### Color Characteristics
- **Background**: Deep blacks (#0D0C0C to #181616 range) with subtle variations
- **Foreground**: Muted whites/greys (#C5C9C5 to #DCD7BA range)
- **Accents**: Subtle metallic tones (copper, bronze, muted gold) - avoid vibrant colors
- **Contrast**: High contrast for readability while maintaining atmospheric darkness
- **Saturation**: Low to medium saturation, avoiding neon colors

## Project Structure

```
karasu/
├── README.md
├── LICENSE
├── .gitignore
│
├── palette/
│   ├── colors.json          # Master color palette (JSON for portability)
│   ├── colors.lua           # Lua color definitions (for Neovim)
│   └── README.md            # Color palette documentation
│
├── neovim/
│   ├── lua/
│   │   └── karasu/
│   │       ├── init.lua          # Main entry point
│   │       ├── colors.lua         # Color palette (synced from palette/)
│   │       ├── themes.lua         # Theme definitions
│   │       ├── highlights/
│   │       │   ├── init.lua       # Highlight setup
│   │       │   ├── editor.lua     # Editor UI highlights
│   │       │   ├── syntax.lua     # Syntax highlighting
│   │       │   ├── treesitter.lua # TreeSitter highlights
│   │       │   ├── lsp.lua        # LSP highlights
│   │       │   └── plugins.lua    # Plugin-specific highlights
│   │       └── utils.lua          # Utility functions
│   └── README.md
│
├── ghostty/
│   ├── karasu.conf           # Ghostty configuration
│   └── README.md
│
├── zed/
│   ├── themes/
│   │   └── karasu.json        # Zed theme JSON
│   └── README.md
│
├── cursor/
│   ├── themes/
│   │   └── karasu.json       # Cursor theme JSON (VS Code compatible)
│   ├── package.json          # VS Code extension manifest
│   └── README.md
│
├── extras/
│   ├── alacritty/
│   │   └── karasu.toml
│   ├── kitty/
│   │   └── karasu.conf
│   ├── wezterm/
│   │   └── karasu.lua
│   ├── iterm2/
│   │   └── karasu.itermcolors
│   └── terminal/
│       └── README.md
│
└── docs/
    ├── design-notes.md       # Design decisions and rationale
    ├── color-reference.md    # Detailed color reference
    └── porting-guide.md      # Guide for porting to other editors
```

## Color Palette Design

### Base Colors (from Kanagawa Dragon + Black Metal aesthetics)

```lua
-- Background Shades (deeper blacks for Black Metal aesthetic)
karasuBlack0 = "#0D0C0C",  -- Deepest black (Gorgoroth-inspired)
karasuBlack1 = "#12120F",  -- Slightly lighter
karasuBlack2 = "#181616",  -- Main background
karasuBlack3 = "#1D1C19",  -- Elevated surfaces
karasuBlack4 = "#282727",  -- Borders, inactive elements
karasuBlack5 = "#393836",  -- Hover states, selections
karasuBlack6 = "#625E5A",  -- Muted text, comments

-- Foreground Colors (muted, refined)
karasuWhite = "#C5C9C5",   -- Primary text (from Kanagawa Dragon)
karasuWhiteDim = "#C8C093", -- Secondary text
karasuGray = "#727169",    -- Dimmed text
karasuGrayDim = "#A6A69C", -- Very dimmed

-- Accent Colors (subtle metallic tones, low saturation)
-- Red/Orange (copper tones)
karasuRed = "#C4746E",     -- Error, destructive
karasuRedBright = "#E46876", -- Bright error
karasuOrange = "#B6927B",  -- Warning, highlights
karasuOrangeBright = "#FFA066", -- Bright warning

-- Green (muted, earthy)
karasuGreen = "#8A9A7B",   -- Success, additions
karasuGreenBright = "#87A987", -- Bright success

-- Yellow/Gold (bronze, muted gold)
karasuYellow = "#C4B28A",  -- Info, highlights
karasuYellowBright = "#E6C384", -- Bright info

-- Blue (steel blue, muted)
karasuBlue = "#8BA4B0",    -- Links, primary actions
karasuBlueBright = "#7FB4CA", -- Bright blue

-- Magenta/Violet (muted purple)
karasuMagenta = "#A292A3", -- Special, tags
karasuMagentaBright = "#938AA9", -- Bright magenta

-- Cyan/Aqua (muted teal)
karasuCyan = "#8EA4A2",    -- Comments, hints
karasuCyanBright = "#7AA89F", -- Bright cyan

-- Special Colors
karasuViolet = "#8992A7",  -- Special accents
karasuTeal = "#949FB5",   -- UI accents
```

### Terminal ANSI Colors

```lua
-- Standard ANSI
ansiBlack = "#0D0C0C",
ansiRed = "#C4746E",
ansiGreen = "#8A9A7B",
ansiYellow = "#C4B28A",
ansiBlue = "#8BA4B0",
ansiMagenta = "#A292A3",
ansiCyan = "#8EA4A2",
ansiWhite = "#C8C093",

-- Bright ANSI
ansiBrightBlack = "#A6A69C",
ansiBrightRed = "#E46876",
ansiBrightGreen = "#87A987",
ansiBrightYellow = "#E6C384",
ansiBrightBlue = "#7FB4CA",
ansiBrightMagenta = "#938AA9",
ansiBrightCyan = "#7AA89F",
ansiBrightWhite = "#C5C9C5",
```

## Implementation Details by Platform

### 1. Neovim

**Structure**: Follow Kanagawa.nvim pattern
- **Entry Point**: `lua/karasu/init.lua` - Setup function, configuration
- **Color Definitions**: `lua/karasu/colors.lua` - Palette with semantic names
- **Theme System**: `lua/karasu/themes.lua` - Theme definitions and mappings
- **Highlights**: Organized by category in `highlights/` directory

**Key Features**:
- Support for TreeSitter syntax highlighting
- LSP diagnostic colors
- Plugin-specific highlights (Telescope, nvim-tree, etc.)
- Diff and Git integration
- Semantic highlighting support
- Optional italics support

**Syntax Highlighting Groups**:
- Keywords, operators, functions
- Strings, numbers, constants
- Comments (muted cyan/gray)
- Types, parameters, variables
- Special characters, punctuation

**UI Elements**:
- Status line (gruvbox-material style)
- Tab line
- Cursor line
- Line numbers
- Sign column
- Fold column
- Popup menus
- Floating windows

### 2. Ghostty

**Format**: Configuration file (`karasu.conf`)

**Required Elements**:
```conf
palette = 0=#0D0C0C  # Black
palette = 1=#C4746E  # Red
palette = 2=#8A9A7B  # Green
palette = 3=#C4B28A  # Yellow
palette = 4=#8BA4B0  # Blue
palette = 5=#A292A3  # Magenta
palette = 6=#8EA4A2  # Cyan
palette = 7=#C8C093  # White
palette = 8=#A6A69C  # Bright Black
palette = 9=#E46876  # Bright Red
palette = 10=#87A987 # Bright Green
palette = 11=#E6C384 # Bright Yellow
palette = 12=#7FB4CA # Bright Blue
palette = 13=#938AA9 # Bright Magenta
palette = 14=#7AA89F # Bright Cyan
palette = 15=#C5C9C5 # Bright White

background = 181616
foreground = C5C9C5
cursor-color = C8C093
selection-background = 2D4F67
selection-foreground = C8C093
```

### 3. Zed

**Format**: JSON theme file (`themes/karasu.json`)

**Required Schema**: `https://zed.dev/schema/themes/v0.1.0.json`

**Key Sections**:
- `appearance`: "dark"
- `style`: UI element colors
  - Borders, backgrounds, surfaces
  - Text colors (foreground, muted, disabled)
  - Icon colors
  - Status bar, title bar, tab bar
  - Editor colors (background, foreground, line numbers)
  - Terminal ANSI colors
  - Scrollbar, search matches
  - Git colors (conflict, created, deleted)
  - Error, warning colors

**Reference**: Follow Kanagawa Zed theme structure

### 4. Cursor (VS Code Compatible)

**Format**: JSON theme file + VS Code extension package.json

**Structure**:
- `themes/karasu.json` - VS Code color theme JSON
- `package.json` - Extension manifest

**Required VS Code Theme Tokens**:
- `editor.background`, `editor.foreground`
- `editor.lineHighlightBackground`
- `editor.selectionBackground`
- `editor.tokenColorCustomizations` - TextMate scopes
- Terminal ANSI colors
- Activity bar, sidebar, status bar
- Git decorations
- Bracket pair colors
- LSP semantic tokens

**Syntax Highlighting**:
- TextMate scopes for common languages
- Semantic token support (LSP)
- Support for common VS Code extensions

### 5. Terminal Configurations (Extras)

**Alacritty**: TOML format
```toml
[colors]
primary = { background = "#181616", foreground = "#C5C9C5" }
cursor = { text = "#181616", cursor = "#C8C093" }
# ... ANSI colors
```

**Kitty**: Conf format
```conf
background #181616
foreground #C5C9C5
# ... ANSI colors
```

**WezTerm**: Lua format
```lua
return {
  colors = {
    background = "#181616",
    foreground = "#C5C9C5",
    -- ... ANSI colors
  }
}
```

**iTerm2**: XML .itermcolors format
- Requires specific XML structure for iTerm2

## Syntax Highlighting Strategy

### Language-Specific Considerations

**Common Patterns**:
- **Keywords**: Muted violet/blue (#8992A7)
- **Functions**: Yellow/bronze (#C4B28A)
- **Strings**: Muted green (#8A9A7B)
- **Numbers**: Muted orange (#B6927B)
- **Comments**: Gray (#727169) or muted cyan (#8EA4A2)
- **Types**: Steel blue (#8BA4B0)
- **Constants**: Muted yellow (#C4B28A)
- **Operators**: Muted white (#C5C9C5)

### Semantic Highlighting

- **LSP Diagnostics**: Error (red), Warning (orange), Info (blue), Hint (cyan)
- **Git**: Added (green), Removed (red), Modified (yellow)
- **Diff**: Addition/deletion highlighting
- **Search**: Subtle background highlight

## Development Workflow

### Phase 1: Foundation
1. Create project structure
2. Define master color palette (`palette/colors.json` and `colors.lua`)
3. Document color choices and rationale
4. Create reference documentation

### Phase 2: Core Implementations
1. **Neovim** (primary implementation)
   - Set up Lua structure
   - Implement color palette
   - Create theme system
   - Implement syntax highlighting
   - Add plugin support
   - Test with various file types

2. **Ghostty**
   - Create configuration file
   - Test ANSI color rendering
   - Verify contrast and readability

3. **Zed**
   - Create JSON theme file
   - Map all UI elements
   - Test terminal colors
   - Verify syntax highlighting

4. **Cursor**
   - Create VS Code theme JSON
   - Implement TextMate scopes
   - Add semantic token support
   - Create package.json
   - Test installation

### Phase 3: Refinement
1. Cross-platform consistency checks
2. Contrast ratio verification (WCAG compliance)
3. Accessibility improvements
4. Documentation updates
5. Screenshot collection

### Phase 4: Extras
1. Terminal emulator configs (Alacritty, Kitty, WezTerm, iTerm2)
2. Additional tool support (if needed)
3. Variants (optional: lighter/darker variants)

## Testing Checklist

### Neovim
- [ ] Installation and setup works
- [ ] Syntax highlighting for common languages (Python, JavaScript, Rust, Go, Lua)
- [ ] TreeSitter highlighting
- [ ] LSP diagnostics display correctly
- [ ] Git integration (signs, diff)
- [ ] Plugin compatibility (Telescope, nvim-tree, etc.)
- [ ] Cursor visibility
- [ ] Contrast ratios meet accessibility standards

### Ghostty
- [ ] Configuration loads correctly
- [ ] ANSI colors render properly
- [ ] Background/foreground contrast sufficient
- [ ] Cursor visibility
- [ ] Selection visibility

### Zed
- [ ] Theme loads correctly
- [ ] All UI elements visible
- [ ] Terminal colors work
- [ ] Syntax highlighting functional
- [ ] Git colors visible
- [ ] Search highlighting visible

### Cursor
- [ ] Extension installs correctly
- [ ] Theme appears in theme selector
- [ ] Syntax highlighting works
- [ ] Terminal colors correct
- [ ] Semantic tokens work (if supported)
- [ ] Git decorations visible

## Color Palette Reference

### Inspiration Sources

1. **Kanagawa Dragon** (rebelot/kanagawa.nvim)
   - Sophisticated color choices
   - Muted palette
   - Excellent contrast ratios

2. **Gruvbox Material Dark** (f4z3r/gruvbox-material.nvim)
   - Material design principles
   - Proven color relationships
   - Good plugin support structure

3. **Black Metal Aesthetic** (Gorgoroth)
   - Deep, stark blacks
   - Metallic accents (copper, bronze)
   - High contrast
   - Atmospheric darkness

4. **Kanso Pearl** (if available)
   - Subtle elegance
   - Refined color choices

### Color Relationships

- **Background hierarchy**: karasuBlack0 → karasuBlack6 (7 levels)
- **Foreground hierarchy**: karasuWhite → karasuGrayDim (4 levels)
- **Accent colors**: Low saturation, muted tones
- **Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text

## Documentation Requirements

1. **README.md**: Project overview, installation instructions
2. **palette/README.md**: Color palette documentation
3. **Platform-specific READMEs**: Installation and usage per platform
4. **design-notes.md**: Design decisions and rationale
5. **color-reference.md**: Complete color reference with hex codes
6. **porting-guide.md**: Guide for porting to other editors

## Future Considerations

- Light variant (optional)
- Additional terminal emulator support
- IDE plugin support (IntelliJ, etc.)
- Wallpaper/desktop theme coordination
- Terminal prompt themes (Starship, etc.)

## Resources and References

### GitHub Repositories Studied
- `rebelot/kanagawa.nvim` - Neovim structure and color palette
- `f4z3r/gruvbox-material.nvim` - Material design patterns
- `metapho-re/kanagawa-vscode-theme` - VS Code theme structure
- `ethangilmore/zed-kanagawa` - Zed theme structure
- Various ghostty theme examples

### Tools and Standards
- VS Code Theme Documentation
- Zed Theme Schema
- Neovim Highlight Groups
- TreeSitter Query Syntax
- ANSI Color Standards
- WCAG Contrast Guidelines

## Notes

- Maintain consistency across all platforms
- Prioritize readability and accessibility
- Keep the Black Metal aesthetic subtle (not overwhelming)
- Ensure colors work well in low-light conditions
- Consider colorblind accessibility
- Document all design decisions
