-- Karasu LSP Highlights
-- Language Server Protocol diagnostics and semantic tokens

local function setup(colors, config)
  local utils = require("karasu.utils")
  
  -- Diagnostic highlights
  utils.hl("DiagnosticError", { fg = colors.red })
  utils.hl("DiagnosticWarn", { fg = colors.yellow })
  utils.hl("DiagnosticInfo", { fg = colors.blue })
  utils.hl("DiagnosticHint", { fg = colors.fg3 })
  
  -- Diagnostic underlines
  utils.hl("DiagnosticUnderlineError", { sp = colors.red, undercurl = true })
  utils.hl("DiagnosticUnderlineWarn", { sp = colors.yellow, undercurl = true })
  utils.hl("DiagnosticUnderlineInfo", { sp = colors.blue, undercurl = true })
  utils.hl("DiagnosticUnderlineHint", { sp = colors.fg3, undercurl = true })
  
  -- Diagnostic virtual text
  utils.hl("DiagnosticVirtualTextError", { fg = colors.red, bg = colors.bg1 })
  utils.hl("DiagnosticVirtualTextWarn", { fg = colors.yellow, bg = colors.bg1 })
  utils.hl("DiagnosticVirtualTextInfo", { fg = colors.blue, bg = colors.bg1 })
  utils.hl("DiagnosticVirtualTextHint", { fg = colors.fg3, bg = colors.bg1 })
  
  -- Diagnostic signs
  utils.hl("DiagnosticSignError", { fg = colors.red, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("DiagnosticSignWarn", { fg = colors.yellow, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("DiagnosticSignInfo", { fg = colors.blue, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("DiagnosticSignHint", { fg = colors.fg3, bg = config.transparent and "NONE" or colors.bg0 })
  
  -- Diagnostic floating window
  utils.hl("DiagnosticFloatingError", { fg = colors.red })
  utils.hl("DiagnosticFloatingWarn", { fg = colors.yellow })
  utils.hl("DiagnosticFloatingInfo", { fg = colors.blue })
  utils.hl("DiagnosticFloatingHint", { fg = colors.fg3 })
  
  -- LSP Reference
  utils.hl("LspReferenceText", { bg = colors.bgVisual })
  utils.hl("LspReferenceRead", { bg = colors.bgVisual })
  utils.hl("LspReferenceWrite", { bg = colors.bgVisual })
  
  -- LSP Code Lens
  utils.hl("LspCodeLens", { fg = colors.fg3 })
  utils.hl("LspCodeLensSeparator", { fg = colors.fg3 })
  
  -- Semantic tokens (if available)
  utils.hl("@lsp.type.namespace", { fg = colors.aqua })
  utils.hl("@lsp.type.type", { fg = colors.aqua })
  utils.hl("@lsp.type.class", { fg = colors.aqua })
  utils.hl("@lsp.type.enum", { fg = colors.aqua })
  utils.hl("@lsp.type.interface", { fg = colors.aqua })
  utils.hl("@lsp.type.struct", { fg = colors.aqua })
  utils.hl("@lsp.type.typeParameter", { fg = colors.aqua })
  utils.hl("@lsp.type.parameter", { fg = colors.orange })
  utils.hl("@lsp.type.variable", { fg = colors.fg0 })
  utils.hl("@lsp.type.property", { fg = colors.fg1 })
  utils.hl("@lsp.type.enumMember", { fg = colors.yellow })
  utils.hl("@lsp.type.function", { fg = colors.blue })
  utils.hl("@lsp.type.method", { fg = colors.blue })
  utils.hl("@lsp.type.macro", { fg = colors.aqua })
  utils.hl("@lsp.type.decorator", { fg = colors.aqua })
  utils.hl("@lsp.type.keyword", { fg = colors.purple })
  utils.hl("@lsp.type.modifier", { fg = colors.purple })
  utils.hl("@lsp.type.comment", { fg = colors.fgDim })
  utils.hl("@lsp.type.string", { fg = colors.green })
  utils.hl("@lsp.type.number", { fg = colors.yellow })
  utils.hl("@lsp.type.regexp", { fg = colors.green })
  utils.hl("@lsp.type.operator", { fg = colors.orange })
end

return { setup = setup }
