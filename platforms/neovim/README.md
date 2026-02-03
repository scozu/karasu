# Karasu for Neovim

## Install

```lua
{
  "scozu/karasu",
  lazy = false,
  priority = 1000,
  config = function()
    require("karasu").setup({ mode = "night" }) -- "night", "snow", "auto"
  end
}
```

## Colorschemes

```
:colorscheme karasu-night
:colorscheme karasu-snow
```
