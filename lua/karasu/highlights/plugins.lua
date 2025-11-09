-- Karasu Plugin Highlights
-- Support for popular Neovim plugins

local function setup(colors, config)
  local utils = require("karasu.utils")
  
  -- Telescope
  utils.hl("TelescopePromptBorder", { fg = colors.bg4 })
  utils.hl("TelescopeResultsBorder", { fg = colors.bg4 })
  utils.hl("TelescopePreviewBorder", { fg = colors.bg4 })
  utils.hl("TelescopePromptNormal", { fg = colors.fg0, bg = colors.bg1 })
  utils.hl("TelescopePromptPrefix", { fg = colors.purple })
  utils.hl("TelescopeSelection", { fg = colors.fg0, bg = colors.bgVisual })
  utils.hl("TelescopeSelectionCaret", { fg = colors.yellow })
  utils.hl("TelescopeMatching", { fg = colors.yellow })
  
  -- nvim-tree / Neo-tree
  utils.hl("NvimTreeNormal", { fg = colors.fg0, bg = config.transparent and "NONE" or colors.bg1 })
  utils.hl("NvimTreeNormalNC", { fg = colors.fg0, bg = config.transparent and "NONE" or colors.bg1 })
  utils.hl("NvimTreeRootFolder", { fg = colors.purple })
  utils.hl("NvimTreeGitDirty", { fg = colors.yellow })
  utils.hl("NvimTreeGitNew", { fg = colors.green })
  utils.hl("NvimTreeGitDeleted", { fg = colors.red })
  utils.hl("NvimTreeIndentMarker", { fg = colors.bg4 })
  utils.hl("NvimTreeFolderIcon", { fg = colors.blue })
  utils.hl("NvimTreeFileIcon", { fg = colors.fg1 })
  utils.hl("NvimTreeOpenedFolderName", { fg = colors.blue })
  utils.hl("NvimTreeClosedFolderName", { fg = colors.blue })
  
  -- GitSigns
  utils.hl("GitSignsAdd", { fg = colors.green, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("GitSignsChange", { fg = colors.yellow, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("GitSignsDelete", { fg = colors.red, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("GitSignsChangeDelete", { fg = colors.orange, bg = config.transparent and "NONE" or colors.bg0 })
  
  -- Indent Blankline
  utils.hl("IndentBlanklineChar", { fg = colors.bg4 })
  utils.hl("IndentBlanklineSpaceChar", { fg = colors.bg4 })
  utils.hl("IndentBlanklineContextChar", { fg = colors.fg3 })
  utils.hl("IndentBlanklineContextStart", { sp = colors.fg3, underline = true })
  
  -- WhichKey
  utils.hl("WhichKey", { fg = colors.purple })
  utils.hl("WhichKeyGroup", { fg = colors.blue })
  utils.hl("WhichKeyDesc", { fg = colors.fg1 })
  utils.hl("WhichKeySeperator", { fg = colors.fg3 })
  utils.hl("WhichKeyFloat", { bg = colors.bg1 })
  
  -- Cmp (nvim-cmp)
  utils.hl("CmpItemAbbr", { fg = colors.fg0 })
  utils.hl("CmpItemAbbrDeprecated", { fg = colors.fg3, strikethrough = true })
  utils.hl("CmpItemAbbrMatch", { fg = colors.blue })
  utils.hl("CmpItemAbbrMatchFuzzy", { fg = colors.blue })
  utils.hl("CmpItemKind", { fg = colors.purple })
  utils.hl("CmpItemKindFunction", { fg = colors.blue })
  utils.hl("CmpItemKindMethod", { fg = colors.blue })
  utils.hl("CmpItemKindVariable", { fg = colors.fg0 })
  utils.hl("CmpItemKindKeyword", { fg = colors.purple })
  utils.hl("CmpItemKindText", { fg = colors.fg0 })
  utils.hl("CmpItemMenu", { fg = colors.fg3 })
  utils.hl("PmenuSel", { fg = colors.bg0, bg = colors.blue })
  
  -- Bufferline
  utils.hl("BufferLineFill", { bg = colors.bg1 })
  utils.hl("BufferLineBackground", { fg = colors.fg3, bg = colors.bg1 })
  utils.hl("BufferLineBufferVisible", { fg = colors.fg3, bg = colors.bg1 })
  utils.hl("BufferLineBufferSelected", { fg = colors.fg0, bg = colors.bg2 })
  utils.hl("BufferLineIndicatorSelected", { fg = colors.blue })
  utils.hl("BufferLineSeparator", { fg = colors.bg4, bg = colors.bg1 })
  utils.hl("BufferLineSeparatorVisible", { fg = colors.bg4, bg = colors.bg1 })
  utils.hl("BufferLineSeparatorSelected", { fg = colors.bg4, bg = colors.bg2 })
  utils.hl("BufferLineCloseButton", { fg = colors.fg3, bg = colors.bg1 })
  utils.hl("BufferLineCloseButtonVisible", { fg = colors.fg3, bg = colors.bg1 })
  utils.hl("BufferLineCloseButtonSelected", { fg = colors.red, bg = colors.bg2 })
  
  -- Lualine (statusline)
  utils.hl("LualineNormal", { fg = colors.fg1, bg = colors.bg2 })
  utils.hl("LualineInsert", { fg = colors.green, bg = colors.bg2 })
  utils.hl("LualineVisual", { fg = colors.purple, bg = colors.bg2 })
  utils.hl("LualineReplace", { fg = colors.red, bg = colors.bg2 })
  utils.hl("LualineCommand", { fg = colors.yellow, bg = colors.bg2 })
  
  -- Notify
  utils.hl("NotifyERRORBorder", { fg = colors.red })
  utils.hl("NotifyWARNBorder", { fg = colors.yellow })
  utils.hl("NotifyINFOBorder", { fg = colors.blue })
  utils.hl("NotifyDEBUGBorder", { fg = colors.fg3 })
  utils.hl("NotifyTRACEBorder", { fg = colors.purple })
  utils.hl("NotifyERRORIcon", { fg = colors.red })
  utils.hl("NotifyWARNIcon", { fg = colors.yellow })
  utils.hl("NotifyINFOIcon", { fg = colors.blue })
  utils.hl("NotifyDEBUGIcon", { fg = colors.fg3 })
  utils.hl("NotifyTRACEIcon", { fg = colors.purple })
  utils.hl("NotifyERRORTitle", { fg = colors.red })
  utils.hl("NotifyWARNTitle", { fg = colors.yellow })
  utils.hl("NotifyINFOTitle", { fg = colors.blue })
  utils.hl("NotifyDEBUGTitle", { fg = colors.fg3 })
  utils.hl("NotifyTRACETitle", { fg = colors.purple })
  
  -- Noice
  utils.hl("NoiceCmdline", { bg = colors.bg1 })
  utils.hl("NoiceCmdlineIcon", { fg = colors.purple })
  utils.hl("NoiceCmdlineIconSearch", { fg = colors.yellow })
  utils.hl("NoiceCmdlinePopup", { bg = colors.bg2 })
  utils.hl("NoiceCmdlinePopupBorder", { fg = colors.bg4 })
  utils.hl("NoiceCmdlinePopupTitle", { fg = colors.fg0 })
  
  -- Mini
  utils.hl("MiniIndentscopeSymbol", { fg = colors.bg4 })
  utils.hl("MiniStatuslineModeNormal", { fg = colors.fg1, bg = colors.bg2 })
  utils.hl("MiniStatuslineModeInsert", { fg = colors.green, bg = colors.bg2 })
  utils.hl("MiniStatuslineModeVisual", { fg = colors.purple, bg = colors.bg2 })
  utils.hl("MiniStatuslineModeReplace", { fg = colors.red, bg = colors.bg2 })
end

return { setup = setup }
