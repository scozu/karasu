-- Karasu LSP Highlights
-- Language Server Protocol diagnostics and semantic tokens

local function setup(colors, config)
  local utils = require("karasu.utils")
  
  -- Diagnostic highlights
  utils.hl("DiagnosticError", { fg = colors.role_error })
  utils.hl("DiagnosticWarn", { fg = colors.role_warning })
  utils.hl("DiagnosticInfo", { fg = colors.role_info })
  utils.hl("DiagnosticHint", { fg = colors.role_hint })
  
  -- Diagnostic underlines
  utils.hl("DiagnosticUnderlineError", { sp = colors.role_error, undercurl = true })
  utils.hl("DiagnosticUnderlineWarn", { sp = colors.role_warning, undercurl = true })
  utils.hl("DiagnosticUnderlineInfo", { sp = colors.role_info, undercurl = true })
  utils.hl("DiagnosticUnderlineHint", { sp = colors.role_hint, undercurl = true })
  
  -- Diagnostic virtual text
  utils.hl("DiagnosticVirtualTextError", { fg = colors.role_error, bg = colors.bg1 })
  utils.hl("DiagnosticVirtualTextWarn", { fg = colors.role_warning, bg = colors.bg1 })
  utils.hl("DiagnosticVirtualTextInfo", { fg = colors.role_info, bg = colors.bg1 })
  utils.hl("DiagnosticVirtualTextHint", { fg = colors.role_hint, bg = colors.bg1 })
  
  -- Diagnostic signs
  utils.hl("DiagnosticSignError", { fg = colors.role_error, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("DiagnosticSignWarn", { fg = colors.role_warning, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("DiagnosticSignInfo", { fg = colors.role_info, bg = config.transparent and "NONE" or colors.bg0 })
  utils.hl("DiagnosticSignHint", { fg = colors.role_hint, bg = config.transparent and "NONE" or colors.bg0 })
  
  -- Diagnostic floating window
  utils.hl("DiagnosticFloatingError", { fg = colors.role_error })
  utils.hl("DiagnosticFloatingWarn", { fg = colors.role_warning })
  utils.hl("DiagnosticFloatingInfo", { fg = colors.role_info })
  utils.hl("DiagnosticFloatingHint", { fg = colors.role_hint })
  
  -- LSP Reference
  utils.hl("LspReferenceText", { bg = colors.bgVisual })
  utils.hl("LspReferenceRead", { bg = colors.bgVisual })
  utils.hl("LspReferenceWrite", { bg = colors.bgVisual })
  
  -- LSP Code Lens
  utils.hl("LspCodeLens", { fg = colors.fg3 })
  utils.hl("LspCodeLensSeparator", { fg = colors.fg3 })
  
  -- Semantic tokens (if available)
  utils.hl("@lsp.type.namespace", { fg = colors.role_type })
  utils.hl("@lsp.type.type", { fg = colors.role_type })
  utils.hl("@lsp.type.class", { fg = colors.role_type })
  utils.hl("@lsp.type.enum", { fg = colors.role_type })
  utils.hl("@lsp.type.interface", { fg = colors.role_type })
  utils.hl("@lsp.type.struct", { fg = colors.role_type })
  utils.hl("@lsp.type.typeParameter", { fg = colors.role_type })
  utils.hl("@lsp.type.parameter", { fg = colors.role_variable })
  utils.hl("@lsp.type.variable", { fg = colors.role_variable })
  utils.hl("@lsp.type.property", { fg = colors.role_property })
  utils.hl("@lsp.type.enumMember", { fg = colors.role_number })
  utils.hl("@lsp.type.function", { fg = colors.role_function })
  utils.hl("@lsp.type.method", { fg = colors.role_function })
  utils.hl("@lsp.type.macro", { fg = colors.role_operator })
  utils.hl("@lsp.type.decorator", { fg = colors.role_operator })
  utils.hl("@lsp.type.keyword", { fg = colors.role_keyword })
  utils.hl("@lsp.type.modifier", { fg = colors.role_operator })
  utils.hl("@lsp.type.comment", { fg = colors.role_comment })
  utils.hl("@lsp.type.string", { fg = colors.role_string })
  utils.hl("@lsp.type.number", { fg = colors.role_number })
  utils.hl("@lsp.type.regexp", { fg = colors.role_string })
  utils.hl("@lsp.type.operator", { fg = colors.role_operator })
end

return { setup = setup }
