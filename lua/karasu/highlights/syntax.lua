-- Karasu Syntax Highlights
-- Traditional syntax highlighting (non-TreeSitter)

local function setup(colors, config)
  local utils = require("karasu.utils")
  
  -- Comments
  utils.hl("Comment", {
    fg = colors.fgDim,
    italic = config.italic_comments,
  })
  
  -- Constants
  utils.hl("Constant", { fg = colors.yellow })
  utils.hl("String", { fg = colors.green, italic = config.italic_strings })
  utils.hl("Character", { fg = colors.green })
  utils.hl("Number", { fg = colors.yellow })
  utils.hl("Boolean", { fg = colors.yellow })
  utils.hl("Float", { fg = colors.yellow })
  
  -- Identifiers
  utils.hl("Identifier", { fg = colors.fg0, italic = config.italic_variables })
  utils.hl("Function", { fg = colors.blue, italic = config.italic_functions })
  
  -- Statements
  utils.hl("Statement", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("Conditional", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("Repeat", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("Label", { fg = colors.purple })
  utils.hl("Operator", { fg = colors.orange })
  utils.hl("Keyword", { fg = colors.purple, italic = config.italic_keywords })
  utils.hl("Exception", { fg = colors.purple })
  
  -- Preprocessor
  utils.hl("PreProc", { fg = colors.aqua })
  utils.hl("Include", { fg = colors.purple })
  utils.hl("Define", { fg = colors.aqua })
  utils.hl("Macro", { fg = colors.aqua })
  utils.hl("PreCondit", { fg = colors.aqua })
  
  -- Types
  utils.hl("Type", { fg = colors.aqua })
  utils.hl("StorageClass", { fg = colors.purple })
  utils.hl("Structure", { fg = colors.aqua })
  utils.hl("Typedef", { fg = colors.aqua })
  
  -- Special
  utils.hl("Special", { fg = colors.orange })
  utils.hl("SpecialChar", { fg = colors.orange })
  utils.hl("Tag", { fg = colors.orange })
  utils.hl("Delimiter", { fg = colors.fg2 })
  utils.hl("SpecialComment", { fg = colors.fgDim })
  utils.hl("Debug", { fg = colors.red })
  
  -- Underlined
  utils.hl("Underlined", { underline = true })
  
  -- Ignore
  utils.hl("Ignore", { fg = colors.fg3 })
  
  -- Error
  utils.hl("Error", { fg = colors.red })
  utils.hl("Todo", { fg = colors.orange, bg = colors.bg1 })
end

return { setup = setup }
