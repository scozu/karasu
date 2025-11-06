# Design Notes

## Design Philosophy

Karasu blends Material Design dark backgrounds with carefully balanced warm earth tones, creating a sophisticated palette that's both comfortable for long coding sessions and visually striking.

## Key Design Decisions

### Material Dark Base (#121212)

The #121212 background provides better eye comfort than pure black while maintaining deep contrast. This works well on both LCD and OLED displays.

### Warm Earth Tones

The palette uses saturated warm colors inspired by natural materials. This creates a comfortable coding environment for extended sessions while maintaining visual interest.

### Balanced Saturation

Colors are saturated enough to provide clear distinction but muted enough to avoid eye strain. This balance is crucial for syntax highlighting readability.

### Layered Backgrounds

Multiple background levels (karasuBg0-4) create depth in the UI without relying on borders, following Material Design elevation principles.

### Semantic Color Choices

Each syntax color has a specific semantic purpose:
- Purple for keywords (control flow emphasis)
- Blue for functions (procedural clarity)
- Green for strings (data emphasis)
- Yellow for numbers/constants (literal highlighting)
- Aqua for types (structural clarity)
- Orange for operators/parameters (action emphasis)

### Accessibility First

All color combinations meet WCAG AA standards (minimum 4.5:1 contrast). Primary text exceeds AAA standards (11:1 contrast).

### Low Light Optimization

Warm tones and balanced contrast reduce eye strain in low-light conditions, optimal for night coding sessions.

### Colorblind Considerations

Colors are chosen to be distinguishable not just by hue but also by brightness, making the theme more accessible to colorblind users.

### Cross-Platform Consistency

The same color values are used across all platforms to ensure a unified experience when switching between editors and terminals.

## Color Relationships

### Background Hierarchy

- `karasuBg0` → `karasuBg1` → `karasuBg2` → `karasuBg3` → `karasuBg4`
- Each step increases brightness by ~8-10% for subtle elevation
- Visual selection (`karasuBgVisual`) sits between bg1 and bg2 for visibility

### Foreground Hierarchy

- `karasuFg0` (primary) → `karasuFg1` → `karasuFg2` → `karasuFg3` → `karasuFgDim`
- Diminishing contrast for secondary information
- Comments use `karasuFgDim` for reduced emphasis

### Syntax Color Harmony

- Warm colors (red, yellow, orange) for errors, warnings, and operators
- Cool colors (blue, aqua) for functions and types
- Neutral warm (green) for strings and success states
- Purple bridges warm and cool for keywords

## Inspiration Sources

- **Gruvbox Material Dark**: Warm earth tones, Material Design backgrounds
- **Kanagawa Dragon**: Sophisticated muted palette, excellent contrast ratios
- **Black Metal (Gorgoroth)**: Minimalist aesthetic, stark contrasts

## Differences from Inspiration

**From Gruvbox**: More saturated accent colors, warmer foreground tones, deeper Material backgrounds

**From Kanagawa**: Warmer palette, less blue/teal emphasis, Material design influence

**From Black Metal**: More color variety, warmer tones, less monochromatic
