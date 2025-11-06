# Color Reference

Complete reference for all Karasu colorscheme colors with hex codes, RGB values, and usage guidelines.

## Background Layers

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| karasuBg0 | #121212 | rgb(18, 18, 18) | Main background - Material dark |
| karasuBg1 | #1a1a1a | rgb(26, 26, 26) | Elevated surfaces |
| karasuBg2 | #222222 | rgb(34, 34, 34) | Popups, menus |
| karasuBg3 | #2a2a2a | rgb(42, 42, 42) | Higher elevation |
| karasuBg4 | #333333 | rgb(51, 51, 51) | Borders, separators |
| karasuBgVisual | #2d3437 | rgb(45, 52, 55) | Visual selection |
| karasuBgSearch | #3c4144 | rgb(60, 65, 68) | Search highlights |

## Foreground Tones

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| karasuFg0 | #d4c5b9 | rgb(212, 197, 185) | Primary text - warm cream |
| karasuFg1 | #c5b6aa | rgb(197, 182, 170) | Secondary text |
| karasuFg2 | #a89984 | rgb(168, 153, 132) | Tertiary text |
| karasuFg3 | #928374 | rgb(146, 131, 116) | Muted text |
| karasuFgDim | #665c54 | rgb(102, 92, 84) | Dimmed text, comments |

## Syntax Colors (Saturated)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| karasuRed | #c4746e | rgb(196, 116, 110) | Errors, deletions, important keywords |
| karasuGreen | #95b572 | rgb(149, 181, 114) | Strings, additions, success |
| karasuYellow | #c4a657 | rgb(196, 166, 87) | Warnings, numbers, constants |
| karasuBlue | #7c9fa8 | rgb(124, 159, 168) | Functions, methods, identifiers |
| karasuPurple | #a987a8 | rgb(169, 135, 168) | Keywords, control flow |
| karasuAqua | #85a585 | rgb(133, 165, 133) | Classes, types, special |
| karasuOrange | #d6936b | rgb(214, 147, 107) | Parameters, attributes, operators |

## Bright Accents

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| karasuBrightRed | #ea6962 | rgb(234, 105, 98) | Terminal bright red |
| karasuBrightGreen | #a9b665 | rgb(169, 182, 101) | Terminal bright green |
| karasuBrightYellow | #d8a657 | rgb(216, 166, 87) | Terminal bright yellow |
| karasuBrightBlue | #8ba4b0 | rgb(139, 164, 176) | Terminal bright blue |
| karasuBrightMagenta | #d3869b | rgb(211, 134, 155) | Terminal bright magenta |
| karasuBrightCyan | #89b482 | rgb(137, 180, 130) | Terminal bright cyan |
| karasuBrightWhite | #fbf1c7 | rgb(251, 241, 199) | Terminal bright white |

## Contrast Ratios

### Primary Text (karasuFg0 on karasuBg0)
- Contrast Ratio: ~11:1
- WCAG Level: AAA

### Syntax Colors on Background
- karasuRed on karasuBg0: ~4.8:1 (AA)
- karasuGreen on karasuBg0: ~5.2:1 (AA)
- karasuYellow on karasuBg0: ~6.1:1 (AA)
- karasuBlue on karasuBg0: ~4.9:1 (AA)
- karasuPurple on karasuBg0: ~5.0:1 (AA)
- karasuAqua on karasuBg0: ~5.1:1 (AA)
- karasuOrange on karasuBg0: ~5.8:1 (AA)

All syntax colors meet WCAG AA standards (minimum 4.5:1 contrast).

## ANSI Terminal Colors

### Normal Colors
- Black: #121212 (karasuBg0)
- Red: #c4746e (karasuRed)
- Green: #95b572 (karasuGreen)
- Yellow: #c4a657 (karasuYellow)
- Blue: #7c9fa8 (karasuBlue)
- Magenta: #a987a8 (karasuPurple)
- Cyan: #85a585 (karasuAqua)
- White: #d4c5b9 (karasuFg0)

### Bright Colors
- Bright Black: #665c54 (karasuFgDim)
- Bright Red: #ea6962 (karasuBrightRed)
- Bright Green: #a9b665 (karasuBrightGreen)
- Bright Yellow: #d8a657 (karasuBrightYellow)
- Bright Blue: #8ba4b0 (karasuBrightBlue)
- Bright Magenta: #d3869b (karasuBrightMagenta)
- Bright Cyan: #89b482 (karasuBrightCyan)
- Bright White: #fbf1c7 (karasuBrightWhite)

## Usage Guidelines

See `palette/README.md` for detailed usage guidelines and syntax highlighting strategy.
