-- Karasu Color Palette (Lua definitions for Neovim)
-- A warm, atmospheric colorscheme combining Material Design dark backgrounds
-- with warm earth tones inspired by Gruvbox Material Dark, Kanagawa Dragon,
-- and Black Metal aesthetics.

local M = {}

-- Background Layers
M.bg0 = "#0A0A0A"      -- Main background
M.bg1 = "#171717"      -- Elevated surfaces
M.bg2 = "#1C1917"      -- Popups, menus
M.bg3 = "#292524"      -- Higher elevation
M.bg4 = "#44403C"      -- Borders, separators
M.bgVisual = "#262626" -- Visual selection
M.bgSearch = "#262626" -- Search highlights

-- Foreground Tones
M.fg0 = "#F5F5F5"      -- Primary text
M.fg1 = "#D4D4D4"      -- Secondary text
M.fg2 = "#A3A3A3"      -- Tertiary text
M.fg3 = "#737373"      -- Muted text
M.fgDim = "#7C7C74"    -- Dimmed text, comments

-- Syntax Colors (Strict Gruvbox-role mapping)
M.red = "#E06C75"      -- Keywords/control flow
M.green = "#8FBF7A"    -- Functions/methods
M.yellow = "#D4B86A"   -- Types/classes
M.blue = "#7AA2C8"     -- Properties/members/links
M.purple = "#B4A1D8"   -- Numbers/constants/hints
M.aqua = "#76B7B2"     -- Strings/chars
M.orange = "#D19A66"   -- Operators/modifiers

-- Bright Accents
M.brightRed = "#FF5C5C"
M.brightGreen = "#A6D189"
M.brightYellow = "#E8D07D"
M.brightBlue = "#8CB4E2"
M.brightMagenta = "#C7B3EE"
M.brightCyan = "#8AD4CE"
M.brightWhite = "#E7E5E4"

-- ANSI Terminal Colors
M.ansi = {
  normal = {
    black = "#0A0A0A",
    red = "#E06C75",
    green = "#8FBF7A",
    yellow = "#D4B86A",
    blue = "#7AA2C8",
    magenta = "#B4A1D8",
    cyan = "#76B7B2",
    white = "#F5F5F5",
  },
  bright = {
    black = "#44403C",
    red = "#FF5C5C",
    green = "#A6D189",
    yellow = "#E8D07D",
    blue = "#8CB4E2",
    magenta = "#C7B3EE",
    cyan = "#8AD4CE",
    white = "#E7E5E4",
  },
}

return M
