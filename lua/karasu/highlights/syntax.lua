-- Karasu Syntax Highlights
-- Traditional syntax highlighting (non-TreeSitter)

local function setup(colors, config)
  local utils = require("karasu.utils")
  
  -- Comments
  utils.hl("Comment", {
    fg = colors.role_comment,
    italic = config.italic_comments,
  })
  
  -- Constants
  utils.hl("Constant", { fg = colors.role_number })
  utils.hl("String", { fg = colors.role_string, italic = config.italic_strings })
  utils.hl("Character", { fg = colors.role_string })
  utils.hl("Number", { fg = colors.role_number })
  utils.hl("Boolean", { fg = colors.role_number })
  utils.hl("Float", { fg = colors.role_number })
  
  -- Identifiers
  utils.hl("Identifier", { fg = colors.role_variable, italic = config.italic_variables })
  utils.hl("Function", { fg = colors.role_function, italic = config.italic_functions })
  
  -- Statements
  utils.hl("Statement", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("Conditional", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("Repeat", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("Label", { fg = colors.role_keyword })
  utils.hl("Operator", { fg = colors.role_operator })
  utils.hl("Keyword", { fg = colors.role_keyword, italic = config.italic_keywords })
  utils.hl("Exception", { fg = colors.role_keyword })
  
  -- Preprocessor
  utils.hl("PreProc", { fg = colors.role_operator })
  utils.hl("Include", { fg = colors.role_keyword })
  utils.hl("Define", { fg = colors.role_operator })
  utils.hl("Macro", { fg = colors.role_operator })
  utils.hl("PreCondit", { fg = colors.role_operator })
  
  -- Types
  utils.hl("Type", { fg = colors.role_type })
  utils.hl("StorageClass", { fg = colors.role_operator })
  utils.hl("Structure", { fg = colors.role_type })
  utils.hl("Typedef", { fg = colors.role_type })
  
  -- Special
  utils.hl("Special", { fg = colors.role_operator })
  utils.hl("SpecialChar", { fg = colors.role_operator })
  utils.hl("Tag", { fg = colors.role_operator })
  utils.hl("Delimiter", { fg = colors.role_punctuation })
  utils.hl("SpecialComment", { fg = colors.role_comment })
  utils.hl("Debug", { fg = colors.role_error })
  
  -- Underlined
  utils.hl("Underlined", { underline = true })
  
  -- Ignore
  utils.hl("Ignore", { fg = colors.fg3 })
  
  -- Error
  utils.hl("Error", { fg = colors.role_error })
  utils.hl("Todo", { fg = colors.role_operator, bg = colors.bg1 })
end

return { setup = setup }
