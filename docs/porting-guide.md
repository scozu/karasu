# Porting Guide

Guide for porting Karasu to other editors and tools.

## Color Palette Reference

All colors are defined in `palette/colors.json` and `palette/colors.lua`. Use these as the single source of truth.

## General Porting Principles

1. **Use exact color values** - Don't modify colors when porting
2. **Maintain semantic mappings** - Use the same colors for the same syntax elements
3. **Preserve contrast ratios** - Ensure all combinations meet WCAG AA standards
4. **Follow platform conventions** - Adapt to platform-specific theme formats

## Syntax Highlighting Strategy

### Control & Structure
- Keywords: `karasuPurple` (#a987a8) - `if`, `for`, `while`, `return`, `import`
- Functions: `karasuBlue` (#7c9fa8) - Function names, method calls
- Types: `karasuAqua` (#85a585) - Class names, type annotations
- Operators: `karasuOrange` (#d6936b) - `+`, `-`, `*`, `/`, `=`, `&&`, `||`

### Literals & Data
- Strings: `karasuGreen` (#95b572) - String literals, documentation
- Numbers: `karasuYellow` (#c4a657) - Integers, floats, hex values
- Constants: `karasuYellow` (#c4a657) - `true`, `false`, `null`, `None`, constants
- Properties: `karasuFg1` (#c5b6aa) - Object properties, attributes

### Semantics
- Comments: `karasuFgDim` (#665c54) - All comment types
- Variables: `karasuFg0` (#d4c5b9) - Variable names, identifiers
- Parameters: `karasuOrange` (#d6936b) - Function parameters
- Special: `karasuAqua` (#85a585) - Decorators, macros, preprocessor

## Platform-Specific Notes

### Neovim
- Use Lua module structure
- Support TreeSitter queries
- Implement LSP diagnostic colors
- Add plugin highlight groups

### VS Code / Cursor
- Use TextMate scopes
- Implement semantic tokens
- Map UI elements (sidebar, status bar, tabs)
- Support Git decorations

### Zed
- Follow Zed theme schema v0.1.0
- Map all UI elements
- Include terminal colors
- Support syntax and diagnostics

### Terminal Emulators
- Map ANSI 16-color palette
- Set background/foreground
- Configure cursor and selection colors
- Use bright variants for bold text

## Testing Checklist

- [ ] All colors render correctly
- [ ] Syntax highlighting works across languages
- [ ] Contrast ratios meet WCAG AA standards
- [ ] UI elements are readable
- [ ] Terminal colors work properly
- [ ] Git integration colors display correctly
- [ ] Diagnostics/errors are visible

## Resources

- [VS Code Theme Documentation](https://code.visualstudio.com/api/extension-guides/color-theme)
- [Zed Theme Schema](https://zed.dev/schema/themes/v0.1.0.json)
- [Neovim Highlight Groups](https://neovim.io/doc/user/syntax.html#highlight-groups)
- [TreeSitter Queries](https://tree-sitter.github.io/tree-sitter/syntax-highlighting)
- [ANSI Color Standards](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

## Contributing Ports

When porting to a new platform:

1. Create a new directory under the appropriate location
2. Include a README with installation instructions
3. Test thoroughly across different scenarios
4. Document any platform-specific considerations
5. Submit a PR with the port
