-- Karasu Colorscheme for Neovim
-- Atmospheric themes with Night & Snow variants with optional auto-switching.
-- Combines Material Design backgrounds with warm earth tones inspired by
-- Gruvbox Material Dark, Kanagawa Dragon, and Black Metal aesthetics.

local karasu = {}

-- Load color palette module
local colors_module = require("karasu.colors")

-- Load theme definitions
local themes = require("karasu.themes")

-- Setup function
function karasu.setup(opts)
  opts = opts or {}
  
  -- Handle mode selection
  local mode = opts.mode or "night"
  if mode == "night" then
    vim.o.background = "dark"
  elseif mode == "snow" then
    vim.o.background = "light"
  end
  
  -- Set options
  karasu.config = {
    mode = mode,  -- "night", "snow", "auto"
    transparent = opts.transparent or false,
    italic_comments = opts.italic_comments or false,
    italic_keywords = opts.italic_keywords or false,
    italic_functions = opts.italic_functions or false,
    italic_strings = opts.italic_strings or false,
    italic_variables = opts.italic_variables or false,
    contrast = opts.contrast or "medium", -- "soft", "medium", "hard"
  }
  
  -- Set up auto-switching for auto mode
  if mode == "auto" then
    colors_module.setup_autoswitch(karasu.config)
  end
  
  -- Apply theme
  themes.load(karasu.config)
end

return karasu
