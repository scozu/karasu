-- Karasu Colorscheme for WezTerm
-- A warm, atmospheric terminal colorscheme

local karasu = {
  foreground = "#d4c5b9",
  background = "#121212",
  cursor_bg = "#d8a657",
  cursor_fg = "#121212",
  cursor_border = "#d8a657",
  selection_fg = "#d4c5b9",
  selection_bg = "#2d3437",
  
  ansi = {
    "#121212", -- black
    "#c4746e", -- red
    "#95b572", -- green
    "#c4a657", -- yellow
    "#7c9fa8", -- blue
    "#a987a8", -- magenta
    "#85a585", -- cyan
    "#d4c5b9", -- white
  },
  brights = {
    "#665c54", -- bright black
    "#ea6962", -- bright red
    "#a9b665", -- bright green
    "#d8a657", -- bright yellow
    "#8ba4b0", -- bright blue
    "#d3869b", -- bright magenta
    "#89b482", -- bright cyan
    "#fbf1c7", -- bright white
  },
}

return {
  color_scheme = "Karasu",
  color_schemes = {
    ["Karasu"] = karasu,
  },
}
