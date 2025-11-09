-- Karasu Theme Definitions
-- Applies highlight groups based on configuration

local colors = require("karasu.colors")
local utils = require("karasu.utils")

local M = {}

-- Load highlight groups
local function load_highlights(config)
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

function M.load(config)
  config = config or {}
  
  -- Clear existing highlights
  vim.cmd("hi clear")
  if vim.fn.exists("syntax_on") then
    vim.cmd("syntax reset")
  end
  
  -- Set background
  vim.o.background = "dark"
  
  -- Set terminal colors
  vim.g.terminal_color_0 = colors.bg0
  vim.g.terminal_color_1 = colors.red
  vim.g.terminal_color_2 = colors.green
  vim.g.terminal_color_3 = colors.yellow
  vim.g.terminal_color_4 = colors.blue
  vim.g.terminal_color_5 = colors.purple
  vim.g.terminal_color_6 = colors.aqua
  vim.g.terminal_color_7 = colors.fg0
  vim.g.terminal_color_8 = colors.fgDim
  vim.g.terminal_color_9 = colors.brightRed
  vim.g.terminal_color_10 = colors.brightGreen
  vim.g.terminal_color_11 = colors.brightYellow
  vim.g.terminal_color_12 = colors.brightBlue
  vim.g.terminal_color_13 = colors.brightMagenta
  vim.g.terminal_color_14 = colors.brightCyan
  vim.g.terminal_color_15 = colors.brightWhite
  
  -- Load all highlight groups
  load_highlights(config)
  
  -- Set colorscheme name
  vim.g.colors_name = "karasu"
end

return M
