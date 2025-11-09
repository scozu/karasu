-- Karasu Editor Highlights
-- Base editor UI elements

local function setup(colors, config)
  local utils = require("karasu.utils")
  
  -- Base colors
  utils.hl("Normal", { fg = colors.fg0, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("NormalFloat", { fg = colors.fg0, bg = colors.bg1 })
  utils.hl("NormalNC", { fg = colors.fg1, bg = config.transparent and "NONE" or colors.bg0 })
  
  -- Cursor
  utils.hl("Cursor", { fg = colors.bg0, bg = colors.fg0 })
  utils.hl("CursorLine", { bg = colors.bg1 })
  utils.hl("CursorColumn", { bg = colors.bg1 })
  utils.hl("CursorLineNr", { fg = colors.yellow, bg = colors.bg1 })
  
  -- Line numbers
  utils.hl("LineNr", { fg = colors.fg3 })
  utils.hl("CursorLineNr", { fg = colors.yellow, bg = colors.bg1 })
  
  -- Sign column
  utils.hl("SignColumn", { fg = colors.fg3, bg = config.transparent and "NONE" or colors.bg0 })
  
  -- Status line
  utils.hl("StatusLine", { fg = colors.fg1, bg = colors.bg2 })
  utils.hl("StatusLineNC", { fg = colors.fg3, bg = colors.bg1 })
  utils.hl("StatusLineTerm", { fg = colors.fg1, bg = colors.bg2 })
  utils.hl("StatusLineTermNC", { fg = colors.fg3, bg = colors.bg1 })
  
  -- Tab line
  utils.hl("TabLine", { fg = colors.fg3, bg = colors.bg1 })
  utils.hl("TabLineFill", { bg = colors.bg1 })
  utils.hl("TabLineSel", { fg = colors.fg0, bg = colors.bg2 })
  
  -- Winbar
  utils.hl("WinBar", { fg = colors.fg1, bg = colors.bg1 })
  utils.hl("WinBarNC", { fg = colors.fg3, bg = colors.bg1 })
  
  -- Visual selection
  utils.hl("Visual", { bg = colors.bgVisual })
  utils.hl("VisualNOS", { bg = colors.bgVisual })
  
  -- Search
  utils.hl("Search", { fg = colors.fg0, bg = colors.bgSearch })
  utils.hl("IncSearch", { fg = colors.bg0, bg = colors.yellow })
  
  -- Messages
  utils.hl("ErrorMsg", { fg = colors.red })
  utils.hl("WarningMsg", { fg = colors.yellow })
  utils.hl("ModeMsg", { fg = colors.fg0 })
  utils.hl("MoreMsg", { fg = colors.blue })
  utils.hl("Question", { fg = colors.orange })
  
  -- Popup menu
  utils.hl("Pmenu", { fg = colors.fg0, bg = colors.bg2 })
  utils.hl("PmenuSel", { fg = colors.bg0, bg = colors.blue })
  utils.hl("PmenuSbar", { bg = colors.bg1 })
  utils.hl("PmenuThumb", { bg = colors.fg3 })
  
  -- Splits
  utils.hl("VertSplit", { fg = colors.bg4, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("WinSeparator", { fg = colors.bg4 })
  
  -- Diff
  utils.hl("DiffAdd", { fg = colors.green, bg = colors.bg1 })
  utils.hl("DiffChange", { fg = colors.yellow, bg = colors.bg1 })
  utils.hl("DiffDelete", { fg = colors.red, bg = colors.bg1 })
  utils.hl("DiffText", { fg = colors.blue, bg = colors.bg2 })
  
  -- Fold
  utils.hl("Folded", { fg = colors.fg3, bg = colors.bg1 })
  utils.hl("FoldColumn", { fg = colors.fg3, bg = config.transparent and "NONE" or colors.bg0 })
  
  -- Match
  utils.hl("MatchParen", { fg = colors.yellow, underline = true })
  
  -- Special
  utils.hl("SpecialKey", { fg = colors.fg3 })
  utils.hl("NonText", { fg = colors.bg4 })
  utils.hl("Whitespace", { fg = colors.bg4 })
  
  -- Conceal
  utils.hl("Conceal", { fg = colors.fg3 })
  
  -- Spell
  utils.hl("SpellBad", { sp = colors.red, undercurl = true })
  utils.hl("SpellCap", { sp = colors.yellow, undercurl = true })
  utils.hl("SpellRare", { sp = colors.purple, undercurl = true })
  utils.hl("SpellLocal", { sp = colors.blue, undercurl = true })
  
  -- Quickfix
  utils.hl("QuickFixLine", { bg = colors.bg2 })
  utils.hl("qfFileName", { fg = colors.blue })
  utils.hl("qfLineNr", { fg = colors.yellow })
  
  -- Color column
  utils.hl("ColorColumn", { bg = colors.bg1 })
  
  -- End of buffer
  utils.hl("EndOfBuffer", { fg = colors.bg2 })
end

return { setup = setup }
