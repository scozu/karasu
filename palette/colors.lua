-- Karasu Color Palette (Lua definitions for Neovim)
-- A warm, atmospheric colorscheme combining Material Design dark backgrounds
-- with warm earth tones inspired by Gruvbox Material Dark, Kanagawa Dragon,
-- and Black Metal aesthetics.

local M = {}

-- Background Layers
M.bg0 = "#121212"      -- Main background - Material dark
M.bg1 = "#1a1a1a"      -- Elevated surfaces
M.bg2 = "#222222"      -- Popups, menus
M.bg3 = "#2a2a2a"      -- Higher elevation
M.bg4 = "#333333"      -- Borders, separators
M.bgVisual = "#2d3437" -- Visual selection
M.bgSearch = "#3c4144" -- Search highlights

-- Foreground Tones
M.fg0 = "#d4c5b9"      -- Primary text - warm cream
M.fg1 = "#c5b6aa"      -- Secondary text
M.fg2 = "#a89984"      -- Tertiary text
M.fg3 = "#928374"      -- Muted text
M.fgDim = "#665c54"    -- Dimmed text, comments

-- Syntax Colors (Saturated)
M.red = "#c4746e"      -- Errors, deletions, important keywords
M.green = "#95b572"    -- Strings, additions, success
M.yellow = "#c4a657"   -- Warnings, numbers, constants
M.blue = "#7c9fa8"     -- Functions, methods, identifiers
M.purple = "#a987a8"   -- Keywords, control flow
M.aqua = "#85a585"     -- Classes, types, special
M.orange = "#d6936b"   -- Parameters, attributes, operators

-- Bright Accents
M.brightRed = "#ea6962"
M.brightGreen = "#a9b665"
M.brightYellow = "#d8a657"
M.brightBlue = "#8ba4b0"
M.brightMagenta = "#d3869b"
M.brightCyan = "#89b482"
M.brightWhite = "#fbf1c7"

-- ANSI Terminal Colors
M.ansi = {
  normal = {
    black = "#121212",
    red = "#c4746e",
    green = "#95b572",
    yellow = "#c4a657",
    blue = "#7c9fa8",
    magenta = "#a987a8",
    cyan = "#85a585",
    white = "#d4c5b9",
  },
  bright = {
    black = "#665c54",
    red = "#ea6962",
    green = "#a9b665",
    yellow = "#d8a657",
    blue = "#8ba4b0",
    magenta = "#d3869b",
    cyan = "#89b482",
    white = "#fbf1c7",
  },
}

return M
