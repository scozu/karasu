# Karasu Color Palette

This directory contains the master color palette definitions for the Karasu colorscheme. These files serve as the single source of truth for all color values used across different platform implementations.

## Files

- **colors.json** - Portable JSON format for programmatic access
- **colors.lua** - Lua module for Neovim and Lua-based tools
- **README.md** - This documentation file

## Color Categories

### Background Layers
Material Design-inspired layered backgrounds providing depth and elevation:

- `karasuBg0` (#121212) - Main background - Material dark
- `karasuBg1` (#1a1a1a) - Elevated surfaces
- `karasuBg2` (#222222) - Popups, menus
- `karasuBg3` (#2a2a2a) - Higher elevation
- `karasuBg4` (#333333) - Borders, separators
- `karasuBgVisual` (#2d3437) - Visual selection
- `karasuBgSearch` (#3c4144) - Search highlights

### Foreground Tones
Warm cream tones for text with varying emphasis levels:

- `karasuFg0` (#d4c5b9) - Primary text - warm cream
- `karasuFg1` (#c5b6aa) - Secondary text
- `karasuFg2` (#a89984) - Tertiary text
- `karasuFg3` (#928374) - Muted text
- `karasuFgDim` (#665c54) - Dimmed text, comments

### Syntax Colors (Saturated)
Warm earth tones for syntax highlighting:

- `karasuRed` (#c4746e) - Errors, deletions, important keywords
- `karasuGreen` (#95b572) - Strings, additions, success
- `karasuYellow` (#c4a657) - Warnings, numbers, constants
- `karasuBlue` (#7c9fa8) - Functions, methods, identifiers
- `karasuPurple` (#a987a8) - Keywords, control flow
- `karasuAqua` (#85a585) - Classes, types, special
- `karasuOrange` (#d6936b) - Parameters, attributes, operators

### Bright Accents
Enhanced brightness variants for terminal emphasis:

- `karasuBrightRed` (#ea6962)
- `karasuBrightGreen` (#a9b665)
- `karasuBrightYellow` (#d8a657)
- `karasuBrightBlue` (#8ba4b0)
- `karasuBrightMagenta` (#d3869b)
- `karasuBrightCyan` (#89b482)
- `karasuBrightWhite` (#fbf1c7)

## Usage Guidelines

### Syntax Highlighting Strategy

**Control & Structure**:
- Keywords: `karasuPurple` - `if`, `for`, `while`, `return`, `import`
- Functions: `karasuBlue` - Function names, method calls
- Types: `karasuAqua` - Class names, type annotations
- Operators: `karasuOrange` - `+`, `-`, `*`, `/`, `=`, `&&`, `||`

**Literals & Data**:
- Strings: `karasuGreen` - String literals, documentation
- Numbers: `karasuYellow` - Integers, floats, hex values
- Constants: `karasuYellow` - `true`, `false`, `null`, `None`, constants
- Properties: `karasuFg1` - Object properties, attributes

**Semantics**:
- Comments: `karasuFgDim` - All comment types
- Variables: `karasuFg0` - Variable names, identifiers
- Parameters: `karasuOrange` - Function parameters
- Special: `karasuAqua` - Decorators, macros, preprocessor

### LSP Diagnostics

- **Error**: `karasuRed` with underline
- **Warning**: `karasuYellow` with underline
- **Info**: `karasuBlue` with subtle underline
- **Hint**: `karasuFg3` with dotted underline

### Git Integration

- **Added**: `karasuGreen`
- **Modified**: `karasuYellow`
- **Removed**: `karasuRed`
- **Conflict**: `karasuOrange`

## Contrast Ratios

All color combinations meet WCAG AA standards (minimum 4.5:1 contrast):

- Primary text (karasuFg0 on karasuBg0): ~11:1 (WCAG AAA)
- Syntax colors: All maintain >4.5:1 contrast (WCAG AA)
- Bright variants: Available for terminal emphasis

## Accessibility

- **Colorblind friendly**: Distinct hues with brightness differences
- **Low light optimized**: Warm tones reduce eye strain
- **High contrast**: Primary text exceeds AAA standards

## Cross-Platform Consistency

The same color values are used across all platforms to ensure a unified experience when switching between editors and terminals. When porting to new platforms, always reference these master definitions.
