# Karasu Colorscheme for Neovim

A warm, atmospheric colorscheme for Neovim combining Material Design dark backgrounds with warm earth tones.

## Installation

### Using a plugin manager

**packer.nvim**:
```lua
use {
  "your-username/karasu",
  config = function()
    require("karasu").setup()
  end
}
```

**lazy.nvim**:
```lua
{
  "your-username/karasu",
  lazy = false,
  priority = 1000,
  config = function()
    require("karasu").setup()
  end
}
```

**vim-plug**:
```vim
Plug 'your-username/karasu'
```

### Manual Installation

1. Clone this repository
2. Copy the `neovim` directory contents to your Neovim config:
   ```bash
   cp -r neovim/lua/karasu ~/.config/nvim/lua/
   ```
3. Add to your `init.lua`:
   ```lua
   require("karasu").setup()
   ```

## Configuration

```lua
require("karasu").setup({
  transparent = false,        -- Enable transparent background
  italic_comments = false,    -- Enable italic comments
  italic_keywords = false,    -- Enable italic keywords
  italic_functions = false,   -- Enable italic functions
  italic_strings = false,     -- Enable italic strings
  italic_variables = false,   -- Enable italic variables
  contrast = "medium",       -- "soft", "medium", "hard"
})
```

## Features

- ✅ Full TreeSitter syntax highlighting
- ✅ LSP diagnostic colors with semantic tokens
- ✅ Extensive plugin support (Telescope, nvim-tree, GitSigns, etc.)
- ✅ Diff and Git integration
- ✅ Optional italics and transparency
- ✅ Customizable highlight overrides

## Syntax Highlighting Strategy

- **Keywords**: Purple (`karasuPurple`) - Control flow, declarations
- **Functions**: Blue (`karasuBlue`) - Method calls, function definitions
- **Strings**: Green (`karasuGreen`) - String literals, documentation
- **Numbers**: Yellow (`karasuYellow`) - Numeric constants
- **Types**: Aqua (`karasuAqua`) - Classes, interfaces, type annotations
- **Operators**: Orange (`karasuOrange`) - Arithmetic, logical operators
- **Comments**: Dim (`karasuFgDim`) - Code comments, documentation
- **Variables**: Cream (`karasuFg0`) - Identifiers, properties

## Plugin Support

Karasu includes highlight groups for:

- Telescope
- nvim-tree / Neo-tree
- GitSigns
- Indent Blankline
- WhichKey
- nvim-cmp
- Bufferline
- Lualine
- Notify
- Noice
- Mini plugins

## Customization

You can override highlight groups after loading the colorscheme:

```lua
vim.api.nvim_set_hl(0, "Normal", { fg = "#d4c5b9", bg = "#121212" })
```

## Requirements

- Neovim 0.8.0 or higher
- TreeSitter (recommended for best experience)

## Troubleshooting

If colors don't appear correctly:

1. Ensure `termguicolors` is enabled:
   ```lua
   vim.opt.termguicolors = true
   ```
2. Check that your terminal supports true color
3. Verify TreeSitter is installed and working

## Contributing

Contributions welcome! Please open an issue for discussion before submitting PRs.

## License

TBD - Likely MIT License
