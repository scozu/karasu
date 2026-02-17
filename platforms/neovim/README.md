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

## Troubleshooting

If Neovim shows highlight-group output on startup after updating:

```bash
nvim --headless '+Lazy! sync karasu' +qa
```

If your local lazy.nvim checkout is dirty and blocks updates, run:

```bash
./scripts/install-all.sh --sync-neovim --neovim-auto-stash
```

`--neovim-auto-stash` stashes dirty `~/.local/share/nvim/lazy/karasu` changes before syncing.
