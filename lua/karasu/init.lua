-- Karasu Colorscheme for Neovim
-- A warm, atmospheric colorscheme combining Material Design dark backgrounds
-- with warm earth tones inspired by Gruvbox Material Dark, Kanagawa Dragon,
-- and Black Metal aesthetics.

local karasu = {}

-- Load color palette
local colors = require("karasu.colors")

-- Load theme definitions
local themes = require("karasu.themes")

-- Setup function
function karasu.setup(opts)
  opts = opts or {}
  
  -- Set options
  karasu.config = {
    transparent = opts.transparent or false,
    italic_comments = opts.italic_comments or false,
    italic_keywords = opts.italic_keywords or false,
    italic_functions = opts.italic_functions or false,
    italic_strings = opts.italic_strings or false,
    italic_variables = opts.italic_variables or false,
    contrast = opts.contrast or "medium", -- "soft", "medium", "hard"
  }
  
  -- Apply theme
  themes.load(karasu.config)
end

return karasu
