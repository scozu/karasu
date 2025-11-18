# Karasu Development Guidelines

## Build/Test Commands
- No automated build system - this is a colorscheme repository
- Manual testing: Load theme in target editors (Neovim, Zed, Cursor, etc.)
- Validation: Visual inspection of syntax highlighting and UI elements
- Color consistency: Verify palette matches across all platform files

## Code Style Guidelines

### Lua (Neovim Plugin)
- Use semantic color names (fg0, bg1, red, blue) not hex values
- Modular structure: separate colors, themes, highlights, utils
- Table exports: `local M = {}; return M` pattern
- Configuration options with sensible defaults
- No auto-execution on require - user must call setup()

### JSON Themes (Cursor/Zed)
- Follow platform-specific schema versions (Zed v0.2.0, VS Code compatible)
- Use consistent hex color values from palette/colors.json
- Maintain semantic color mappings across platforms
- Comprehensive UI element coverage (200+ properties for Zed)

### File Organization
- `palette/` - Source of truth for color definitions
- `lua/karasu/` - Neovim plugin implementation
- Platform-specific directories for theme files

### Naming Conventions
- Colors: `karasuRed`, `karasuBg0` (camelCase with prefix)
- Files: lowercase with dots (`karasu.vim`, `karasu.json`)
- Functions: descriptive names, `setup()`, `load()`, `hl()`
- Variables: semantic, not literal color names

### Error Handling
- Graceful fallbacks for missing configurations
- Validate user options in setup functions
- Provide clear error messages for misconfiguration
- Maintain backward compatibility when possible