# Screenshots Directory

This directory contains screenshots showcasing the Karasu colorscheme's syntax highlighting across different platforms and languages.

## Quick Start

1. **Read the Guide**: Check out [`screenshot-guide.md`](./screenshot-guide.md) for comprehensive strategies and best practices
2. **Use Sample Code**: Sample code files are in [`sample-code/`](./sample-code/) - designed to showcase all syntax elements
3. **Run Helper Script**: Use [`screenshot-helper.sh`](./screenshot-helper.sh) to prepare your environment

## Resources

- **[Screenshot Guide](./screenshot-guide.md)** - Complete guide on creating professional theme screenshots
- **[Sample Code](./sample-code/)** - Pre-written code samples for each language
- **[Helper Script](./screenshot-helper.sh)** - Interactive script to help prepare screenshots

## Directory Structure

```
screenshots/
├── neovim-python.png          # Neovim with Python code
├── neovim-typescript.png      # Neovim with TypeScript/JavaScript code
├── neovim-rust.png            # Neovim with Rust code
├── neovim-lua.png             # Neovim with Lua code
├── cursor-typescript.png      # Cursor/VS Code with TypeScript and LSP
├── cursor-python.png          # Cursor/VS Code with Python and semantic tokens
├── zed-multilang.png          # Zed editor with multiple languages
└── ghostty-terminal.png       # Ghostty terminal with syntax highlighted output
```

## Screenshot Guidelines

When adding screenshots, please ensure:

1. **Consistent sizing**: Use similar dimensions for comparable screenshots (e.g., all Neovim screenshots should be similar size)
2. **High quality**: Use PNG format with good resolution (recommended: 1920x1080 or similar)
3. **Showcase syntax**: Include code that demonstrates:
   - Keywords (purple)
   - Functions (blue)
   - Strings (green)
   - Numbers (yellow)
   - Types (aqua)
   - Operators (orange)
   - Comments (dim)
   - Variables (foreground)
4. **Clean examples**: Use readable, well-formatted code samples
5. **Platform-specific features**: Highlight platform-specific features when relevant (e.g., LSP diagnostics, TreeSitter, etc.)

## Recommended Code Samples

### Python
Include: functions, classes, type hints, strings, numbers, comments, decorators

### TypeScript/JavaScript
Include: interfaces, types, functions, async/await, template literals, imports

### Rust
Include: structs, enums, traits, lifetimes, macros, match expressions

### Lua
Include: functions, tables, metatables, coroutines, local variables
