-- Karasu Utilities
-- Helper functions for highlight group creation

local M = {}

-- Create highlight group
function M.hl(name, opts)
  opts = opts or {}
  
  local cmd = "highlight " .. name
  
  if opts.fg then
    cmd = cmd .. " guifg=" .. opts.fg
  end
  
  if opts.bg then
    cmd = cmd .. " guibg=" .. opts.bg
  end
  
  if opts.sp then
    cmd = cmd .. " guisp=" .. opts.sp
  end
  
  local attrs = {}
  if opts.bold then table.insert(attrs, "bold") end
  if opts.italic then table.insert(attrs, "italic") end
  if opts.underline then table.insert(attrs, "underline") end
  if opts.undercurl then table.insert(attrs, "undercurl") end
  if opts.strikethrough then table.insert(attrs, "strikethrough") end
  if opts.reverse then table.insert(attrs, "reverse") end
  if opts.nocombine then table.insert(attrs, "nocombine") end
  
  if #attrs > 0 then
    cmd = cmd .. " gui=" .. table.concat(attrs, ",")
  end
  
  vim.cmd(cmd)
end

-- Link highlight groups
function M.link(from, to)
  vim.cmd("highlight link " .. from .. " " .. to)
end

-- Apply italic based on config
function M.apply_italic(text, config_key, config)
  if config[config_key] then
    return text .. " italic"
  end
  return text
end

return M
