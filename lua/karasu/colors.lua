-- Karasu Color Palette
-- Dynamic loading for Night & Snow themes

local M = {}

-- Load appropriate palette based on background
function M.load(is_dark)
  if is_dark == nil then
    is_dark = vim.o.background == "dark"
  end
  
  if is_dark then
    return require("karasu.palette.night")
  else
    return require("karasu.palette.snow")
  end
end

-- Get current palette
function M.get()
  return M.load()
end

-- Set up auto-switching based on background changes
function M.setup_autoswitch(config)
  local function on_background_change()
    local colors = M.load()
    require("karasu.themes").load_with_colors(colors, config)
  end
  
  vim.api.nvim_create_autocmd("OptionSet", {
    pattern = "background",
    callback = on_background_change,
  })
end

return M
