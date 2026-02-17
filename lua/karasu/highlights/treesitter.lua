-- Karasu TreeSitter Highlights
-- TreeSitter-based syntax highlighting

local function setup(colors, config)
  local utils = require("karasu.utils")
  
  -- Comments
  utils.hl("@comment", {
    fg = colors.role_comment,
    italic = config.italic_comments,
  })
  utils.hl("@comment.documentation", { fg = colors.role_comment })
  
  -- Constants
  utils.hl("@constant", { fg = colors.role_number })
  utils.hl("@constant.builtin", { fg = colors.role_number })
  utils.hl("@constant.macro", { fg = colors.role_operator })
  utils.hl("@string", { fg = colors.role_string, italic = config.italic_strings })
  utils.hl("@string.regex", { fg = colors.role_string })
  utils.hl("@string.escape", { fg = colors.role_operator })
  utils.hl("@string.special", { fg = colors.role_string })
  utils.hl("@character", { fg = colors.role_string })
  utils.hl("@character.special", { fg = colors.role_operator })
  utils.hl("@number", { fg = colors.role_number })
  utils.hl("@number.float", { fg = colors.role_number })
  utils.hl("@boolean", { fg = colors.role_number })
  
  -- Functions
  utils.hl("@function", { fg = colors.role_function, italic = config.italic_functions })
  utils.hl("@function.builtin", { fg = colors.role_function })
  utils.hl("@function.call", { fg = colors.role_function })
  utils.hl("@function.macro", { fg = colors.role_operator })
  utils.hl("@method", { fg = colors.role_function })
  utils.hl("@method.call", { fg = colors.role_function })
  utils.hl("@constructor", { fg = colors.role_function })
  utils.hl("@parameter", { fg = colors.role_variable })
  
  -- Keywords
  utils.hl("@keyword", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("@keyword.function", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("@keyword.operator", { fg = colors.role_operator })
  utils.hl("@keyword.return", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("@keyword.conditional", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("@keyword.repeat", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("@keyword.import", { fg = colors.role_keyword })
  utils.hl("@keyword.exception", { fg = colors.role_keyword })
  
  -- Types
  utils.hl("@type", { fg = colors.role_type })
  utils.hl("@type.builtin", { fg = colors.role_type })
  utils.hl("@type.definition", { fg = colors.role_type })
  utils.hl("@type.qualifier", { fg = colors.role_operator })
  utils.hl("@storageclass", { fg = colors.role_operator })
  utils.hl("@attribute", { fg = colors.role_operator })
  utils.hl("@field", { fg = colors.role_property })
  utils.hl("@property", { fg = colors.role_property })
  
  -- Variables
  utils.hl("@variable", { fg = colors.role_variable, italic = config.italic_variables })
  utils.hl("@variable.builtin", { fg = colors.role_variable })
  
  -- Namespaces
  utils.hl("@namespace", { fg = colors.role_type })
  utils.hl("@module", { fg = colors.role_type })
  
  -- Punctuation
  utils.hl("@punctuation.delimiter", { fg = colors.role_punctuation })
  utils.hl("@punctuation.bracket", { fg = colors.role_punctuation })
  utils.hl("@punctuation.special", { fg = colors.role_operator })
  
  -- Operators
  utils.hl("@operator", { fg = colors.role_operator })
  
  -- Tags
  utils.hl("@tag", { fg = colors.role_operator })
  utils.hl("@tag.delimiter", { fg = colors.role_punctuation })
  utils.hl("@tag.attribute", { fg = colors.role_property })
  
  -- Text
  utils.hl("@text", { fg = colors.role_variable })
  utils.hl("@text.strong", { fg = colors.role_variable, bold = true })
  utils.hl("@text.emphasis", { fg = colors.role_variable, italic = true })
  utils.hl("@text.underline", { fg = colors.role_variable, underline = true })
  utils.hl("@text.strike", { fg = colors.fg3, strikethrough = true })
  utils.hl("@text.title", { fg = colors.role_link, bold = true })
  utils.hl("@text.literal", { fg = colors.role_string })
  utils.hl("@text.uri", { fg = colors.role_link, underline = true })
  utils.hl("@text.math", { fg = colors.role_property })
  utils.hl("@text.reference", { fg = colors.role_link })
  utils.hl("@text.environment", { fg = colors.role_property })
  utils.hl("@text.environment.name", { fg = colors.role_property })
  utils.hl("@text.note", { fg = colors.role_info })
  utils.hl("@text.warning", { fg = colors.role_warning })
  utils.hl("@text.danger", { fg = colors.role_error })
  
  -- Misc
  utils.hl("@error", { fg = colors.role_error })
  utils.hl("@todo", { fg = colors.role_operator, bg = colors.bg1 })
  utils.hl("@note", { fg = colors.role_info })
  utils.hl("@warning", { fg = colors.role_warning })
  
  -- Diff
  utils.hl("@diff.plus", { fg = colors.role_function })
  utils.hl("@diff.minus", { fg = colors.role_error })
  utils.hl("@diff.delta", { fg = colors.role_warning })
end

return { setup = setup }
