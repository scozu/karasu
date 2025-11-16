# Screenshot Guide for Theme Showcases

This guide provides strategies and best practices for creating clean, professional screenshots that effectively showcase the Karasu colorscheme's syntax highlighting capabilities.

## Table of Contents

1. [General Principles](#general-principles)
2. [Preparation](#preparation)
3. [Editor-Specific Tips](#editor-specific-tips)
4. [Composition Guidelines](#composition-guidelines)
5. [Technical Specifications](#technical-specifications)
6. [Tools & Automation](#tools--automation)
7. [Common Mistakes to Avoid](#common-mistakes-to-avoid)

## General Principles

### 1. **Consistency is Key**
- Use the same window size/dimensions for similar screenshots
- Maintain consistent font size across all screenshots
- Use the same code samples when comparing platforms
- Keep UI elements (line numbers, gutters) in the same position

### 2. **Showcase, Don't Overwhelm**
- Focus on syntax highlighting, not complex code logic
- Use readable, well-formatted code samples
- Avoid overly long files (50-100 lines is ideal)
- Include a variety of syntax elements in each screenshot

### 3. **Tell a Story**
- Each screenshot should demonstrate specific features
- Group related screenshots together
- Use descriptive filenames and captions
- Show progression from simple to complex examples

## Preparation

### Code Samples

We've provided sample code files in `screenshots/sample-code/` that are specifically designed to showcase all syntax highlighting features:

- **python_example.py** - Demonstrates Python syntax with type hints, async, decorators
- **typescript_example.ts** - Shows TypeScript features: interfaces, generics, async/await
- **rust_example.rs** - Rust-specific: traits, pattern matching, lifetimes
- **lua_example.lua** - Lua features: tables, metatables, coroutines

Each file includes:
- ✅ Keywords (purple) - `if`, `for`, `class`, `function`, etc.
- ✅ Functions (blue) - Function definitions and calls
- ✅ Strings (green) - String literals, templates
- ✅ Numbers (yellow) - Integers, floats, hex, scientific notation
- ✅ Types (aqua) - Classes, interfaces, type annotations
- ✅ Operators (orange) - Arithmetic, logical, comparison
- ✅ Comments (dim) - Single-line and multi-line
- ✅ Variables (foreground) - Identifiers, properties

### Editor Setup

Before taking screenshots:

1. **Clean Workspace**
   - Close unnecessary tabs/panels
   - Hide distracting UI elements (if possible)
   - Use a clean, minimal editor configuration
   - Remove personal information or sensitive data

2. **Font Configuration**
   - Use a high-quality monospace font (Fira Code, JetBrains Mono, Cascadia Code)
   - Font size: 14-16px for readability
   - Enable ligatures if using a font that supports them
   - Ensure consistent font rendering across platforms

3. **Window Size**
   - Recommended: 1920x1080 or 1440x900
   - Maintain aspect ratio consistency
   - Don't crop too tightly - show some context

4. **UI Elements**
   - Show line numbers (helps demonstrate theme)
   - Include gutter/margin (shows background colors)
   - Show status bar (demonstrates UI theming)
   - Include file tree/sidebar if it adds value

## Editor-Specific Tips

### Neovim

**Setup:**
```lua
-- Minimal config for screenshots
vim.opt.number = true
vim.opt.relativenumber = false
vim.opt.cursorline = true
vim.opt.signcolumn = "yes"
vim.opt.colorcolumn = "80"
```

**Tips:**
- Use `:TOhtml` command to generate HTML with syntax highlighting
- Show TreeSitter highlighting (if enabled)
- Include LSP diagnostics if visible
- Show Git signs in gutter if using GitSigns
- Use `:set list` to show whitespace characters (optional)

**Screenshot Commands:**
- `:set guifont=JetBrains\ Mono:h14` - Set font size
- `:set linespace=2` - Add line spacing for readability
- `:set termguicolors` - Ensure true color support

### Cursor / VS Code

**Setup:**
- Use default editor settings (don't override theme colors)
- Enable semantic highlighting if available
- Show minimap (optional, but demonstrates theme)
- Include breadcrumbs if they add value

**Tips:**
- Use the Command Palette to toggle UI elements
- Show IntelliSense suggestions (demonstrates popup theming)
- Include error/warning squiggles
- Show Git decorations in file explorer
- Demonstrate bracket pair colorization

**Settings:**
```json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.5,
  "editor.renderWhitespace": "boundary"
}
```

### Zed

**Setup:**
- Use default editor configuration
- Show file tree and tabs
- Include status bar
- Show search results if relevant

**Tips:**
- Zed's UI is minimal - focus on code highlighting
- Show multiple panes if demonstrating multi-file editing
- Include terminal integration if showcasing terminal colors

### Terminal (Ghostty)

**Setup:**
- Use sample code files with syntax highlighting tools
- Show `bat`, `rich-cli`, or `pygments` output
- Include shell prompt (but keep it minimal)
- Show command output with colors

**Tools for Terminal Screenshots:**
- `bat file.py` - Syntax highlighting for files
- `rich-cli` - Python-based syntax highlighting
- `pygments` - Universal syntax highlighter
- `git diff` - Shows diff colors
- `ls --color=auto` - Colored directory listings

## Composition Guidelines

### 1. **Framing**
- **Rule of Thirds**: Place important code in the upper-left or center
- **Negative Space**: Leave some empty space around code
- **Focus**: Ensure the main code is in sharp focus
- **Context**: Show enough surrounding code for context

### 2. **Code Selection**
- Start with imports/declarations (shows type highlighting)
- Include function definitions (shows function highlighting)
- Show function calls (demonstrates call vs definition)
- Include comments (shows comment styling)
- Add some complexity (nested structures, generics)

### 3. **Visual Hierarchy**
- Use cursor position to draw attention
- Highlight specific lines if needed (but don't overdo it)
- Show selection to demonstrate selection colors
- Include search highlights if relevant

### 4. **Multiple Elements**
When showing multiple syntax elements:
- Group related elements together
- Use clear variable names (`user_name` not `x`)
- Include realistic examples (not just `foo`, `bar`)
- Show edge cases (optional parameters, null checks)

## Technical Specifications

### File Format
- **Format**: PNG (lossless, best quality)
- **Color Space**: sRGB
- **Bit Depth**: 24-bit (8-bit per channel)
- **Compression**: PNG compression level 6-9 (good balance)

### Dimensions
- **Standard**: 1920x1080 (Full HD)
- **Alternative**: 1440x900 (good for side-by-side)
- **Minimum**: 1280x720 (still acceptable)
- **Aspect Ratio**: 16:9 or 16:10

### Resolution
- **DPI**: 72-96 DPI (standard screen resolution)
- **Scale Factor**: 1x (avoid high-DPI scaling artifacts)
- **Retina/High-DPI**: Consider @2x versions for retina displays

### File Naming
Use descriptive, consistent names:
```
{platform}-{language}-{feature}.png

Examples:
- neovim-python-basic.png
- cursor-typescript-lsp.png
- zed-rust-generics.png
- ghostty-terminal-output.png
```

## Tools & Automation

### Screenshot Tools

**Cross-Platform:**
- **Flameshot** (Linux) - Annotation and editing
- **Spectacle** (KDE) - Simple and fast
- **GNOME Screenshot** (GNOME) - Built-in tool
- **Grim + Slurp** (Wayland) - Command-line tools
- **scrot** (X11) - Lightweight CLI tool

**macOS:**
- **Cmd+Shift+4** - Built-in screenshot tool
- **CleanShot X** - Professional screenshots
- **Skitch** - Annotation and sharing

**Windows:**
- **Snipping Tool** - Built-in
- **ShareX** - Feature-rich screenshot tool
- **Greenshot** - Open-source alternative

### Automation Scripts

**Neovim HTML Export:**
```bash
#!/bin/bash
# Export Neovim buffer to HTML with syntax highlighting
nvim -c "TOhtml" -c "wq" -c "q" "$1"
```

**Batch Screenshot Script:**
```bash
#!/bin/bash
# Take screenshots of multiple files
for file in screenshots/sample-code/*; do
    # Open file in editor
    # Take screenshot
    # Save with appropriate name
done
```

**Image Optimization:**
```bash
# Optimize PNG files (requires optipng or pngquant)
find screenshots -name "*.png" -exec optipng -o7 {} \;
# Or use pngquant for smaller files
find screenshots -name "*.png" -exec pngquant --ext .png --force {} \;
```

### Post-Processing

**Minimal Editing:**
- Crop to remove unnecessary UI
- Adjust brightness/contrast if needed (but preserve colors)
- Add subtle border if desired
- Add annotations sparingly (arrows, labels)

**Tools:**
- **GIMP** - Full-featured image editor
- **ImageMagick** - Command-line image processing
- **pngquant** - PNG optimization
- **optipng** - PNG optimization

## Common Mistakes to Avoid

### ❌ Don't:
1. **Use blurry or low-resolution images** - Always use crisp, clear screenshots
2. **Include personal information** - Remove usernames, paths, API keys
3. **Show broken syntax** - Ensure code is valid and properly formatted
4. **Use inconsistent fonts** - Stick to one font family across screenshots
5. **Over-annotate** - Let the code speak for itself
6. **Show too much code** - Focus on 30-80 lines per screenshot
7. **Use different themes** - Ensure Karasu theme is active
8. **Include distracting UI** - Hide unnecessary panels/tabs
9. **Forget to show key features** - Include comments, strings, numbers, etc.
10. **Use poor contrast** - Ensure text is readable

### ✅ Do:
1. **Use provided sample code** - They're designed to showcase all features
2. **Maintain consistency** - Same window size, font, settings
3. **Show variety** - Different languages, different features
4. **Keep it clean** - Minimal UI, focused on code
5. **Test readability** - Ensure text is readable at display size
6. **Optimize file size** - Compress PNGs without quality loss
7. **Use descriptive names** - Clear, consistent filenames
8. **Show real examples** - Realistic code, not just `foo`/`bar`
9. **Include context** - Show enough code to understand
10. **Highlight strengths** - Emphasize what makes Karasu unique

## Checklist Before Publishing

- [ ] All screenshots use Karasu theme
- [ ] Consistent window size and font across similar screenshots
- [ ] Code samples are valid and properly formatted
- [ ] All major syntax elements are visible (keywords, functions, strings, numbers, types, operators, comments)
- [ ] No personal information or sensitive data
- [ ] Images are optimized (reasonable file size)
- [ ] Filenames follow naming convention
- [ ] Screenshots are sharp and readable
- [ ] UI elements are clean and minimal
- [ ] README.md references are correct

## Additional Resources

- [VS Code Theme Screenshot Guide](https://code.visualstudio.com/api/extension-guides/color-theme#screenshots)
- [Neovim Theme Showcase Examples](https://github.com/rebelot/kanagawa.nvim#screenshots)
- [PNG Optimization Guide](https://imageoptim.com/guides/png)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Remember**: The goal is to showcase the theme's syntax highlighting capabilities clearly and professionally. Quality over quantity - a few excellent screenshots are better than many mediocre ones.
