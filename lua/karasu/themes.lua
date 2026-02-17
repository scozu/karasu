-- Karasu Theme Definitions
-- Applies highlight groups based on configuration

local colors_module = require("karasu.colors")
local utils = require("karasu.utils")

local M = {}

-- Load highlight groups
local function load_highlights(config, colors)
  -- Load editor highlights
  require("karasu.highlights.editor").setup(colors, config)
  
  -- Load syntax highlights
  require("karasu.highlights.syntax").setup(colors, config)
  
  -- Load TreeSitter highlights
  require("karasu.highlights.treesitter").setup(colors, config)
  
  -- Load LSP highlights
  require("karasu.highlights.lsp").setup(colors, config)
  
  -- Load plugin highlights
  require("karasu.highlights.plugins").setup(colors, config)
end

function M.load_with_colors(colors, config)
  config = config or {}
  
  -- Clear existing highlights
  vim.cmd("hi clear")
  if vim.fn.exists("syntax_on") then
    vim.cmd("syntax reset")
  end
  
  -- Set background based on palette
  local bg0 = string.lower(colors.bg0 or "")
  local is_dark = not (bg0 == "#fafafa" or bg0 == "#f8f7f6")
  vim.o.background = is_dark and "dark" or "light"
  
  -- Set terminal colors
  vim.g.terminal_color_0 = colors.ansi.black
  vim.g.terminal_color_1 = colors.ansi.red
  vim.g.terminal_color_2 = colors.ansi.green
  vim.g.terminal_color_3 = colors.ansi.yellow
  vim.g.terminal_color_4 = colors.ansi.blue
  vim.g.terminal_color_5 = colors.ansi.magenta
  vim.g.terminal_color_6 = colors.ansi.cyan
  vim.g.terminal_color_7 = colors.ansi.white
  vim.g.terminal_color_8 = colors.ansi.bright_black
  vim.g.terminal_color_9 = colors.ansi.bright_red
  vim.g.terminal_color_10 = colors.ansi.bright_green
  vim.g.terminal_color_11 = colors.ansi.bright_yellow
  vim.g.terminal_color_12 = colors.ansi.bright_blue
  vim.g.terminal_color_13 = colors.ansi.bright_magenta
  vim.g.terminal_color_14 = colors.ansi.bright_cyan
  vim.g.terminal_color_15 = colors.ansi.bright_white
  
  -- Load all highlight groups
  load_highlights(config, colors)
  
  -- Set colorscheme name
  vim.g.colors_name = "karasu"
end

function M.load(config)
  local colors = colors_module.get()
  M.load_with_colors(colors, config)
end

return M
