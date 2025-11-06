-- Karasu TreeSitter Highlights
-- TreeSitter-based syntax highlighting

local function setup(colors, config)
  local utils = require("karasu.utils")
  
  -- Comments
  utils.hl("@comment", {
    fg = colors.fgDim,
    italic = config.italic_comments,
  })
  utils.hl("@comment.documentation", { fg = colors.fgDim })
  
  -- Constants
  utils.hl("@constant", { fg = colors.yellow })
  utils.hl("@constant.builtin", { fg = colors.yellow })
  utils.hl("@constant.macro", { fg = colors.aqua })
  utils.hl("@string", { fg = colors.green, italic = config.italic_strings })
  utils.hl("@string.regex", { fg = colors.green })
  utils.hl("@string.escape", { fg = colors.orange })
  utils.hl("@string.special", { fg = colors.green })
  utils.hl("@character", { fg = colors.green })
  utils.hl("@character.special", { fg = colors.orange })
  utils.hl("@number", { fg = colors.yellow })
  utils.hl("@number.float", { fg = colors.yellow })
  utils.hl("@boolean", { fg = colors.yellow })
  
  -- Functions
  utils.hl("@function", { fg = colors.blue, italic = config.italic_functions })
  utils.hl("@function.builtin", { fg = colors.blue })
  utils.hl("@function.call", { fg = colors.blue })
  utils.hl("@function.macro", { fg = colors.aqua })
  utils.hl("@method", { fg = colors.blue })
  utils.hl("@method.call", { fg = colors.blue })
  utils.hl("@constructor", { fg = colors.aqua })
  utils.hl("@parameter", { fg = colors.orange })
  
  -- Keywords
  utils.hl("@keyword", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("@keyword.function", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("@keyword.operator", { fg = colors.orange })
  utils.hl("@keyword.return", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("@keyword.conditional", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("@keyword.repeat", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("@keyword.import", { fg = colors.purple })
  utils.hl("@keyword.exception", { fg = colors.purple })
  
  -- Types
  utils.hl("@type", { fg = colors.aqua })
  utils.hl("@type.builtin", { fg = colors.aqua })
  utils.hl("@type.definition", { fg = colors.aqua })
  utils.hl("@type.qualifier", { fg = colors.purple })
  utils.hl("@storageclass", { fg = colors.purple })
  utils.hl("@attribute", { fg = colors.orange })
  utils.hl("@field", { fg = colors.fg1 })
  utils.hl("@property", { fg = colors.fg1 })
  
  -- Variables
  utils.hl("@variable", { fg = colors.fg0, italic = config.italic_variables })
  utils.hl("@variable.builtin", { fg = colors.orange })
  
  -- Namespaces
  utils.hl("@namespace", { fg = colors.aqua })
  utils.hl("@module", { fg = colors.aqua })
  
  -- Punctuation
  utils.hl("@punctuation.delimiter", { fg = colors.fg2 })
  utils.hl("@punctuation.bracket", { fg = colors.fg2 })
  utils.hl("@punctuation.special", { fg = colors.orange })
  
  -- Operators
  utils.hl("@operator", { fg = colors.orange })
  
  -- Tags
  utils.hl("@tag", { fg = colors.orange })
  utils.hl("@tag.delimiter", { fg = colors.fg2 })
  utils.hl("@tag.attribute", { fg = colors.blue })
  
  -- Text
  utils.hl("@text", { fg = colors.fg0 })
  utils.hl("@text.strong", { fg = colors.fg0, bold = true })
  utils.hl("@text.emphasis", { fg = colors.fg0, italic = true })
  utils.hl("@text.underline", { fg = colors.fg0, underline = true })
  utils.hl("@text.strike", { fg = colors.fg3, strikethrough = true })
  utils.hl("@text.title", { fg = colors.blue, bold = true })
  utils.hl("@text.literal", { fg = colors.green })
  utils.hl("@text.uri", { fg = colors.blue, underline = true })
  utils.hl("@text.math", { fg = colors.aqua })
  utils.hl("@text.reference", { fg = colors.blue })
  utils.hl("@text.environment", { fg = colors.aqua })
  utils.hl("@text.environment.name", { fg = colors.aqua })
  utils.hl("@text.note", { fg = colors.blue })
  utils.hl("@text.warning", { fg = colors.yellow })
  utils.hl("@text.danger", { fg = colors.red })
  
  -- Misc
  utils.hl("@error", { fg = colors.red })
  utils.hl("@todo", { fg = colors.orange, bg = colors.bg1 })
  utils.hl("@note", { fg = colors.blue })
  utils.hl("@warning", { fg = colors.yellow })
  
  -- Diff
  utils.hl("@diff.plus", { fg = colors.green })
  utils.hl("@diff.minus", { fg = colors.red })
  utils.hl("@diff.delta", { fg = colors.yellow })
end

return { setup = setup }
