#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_HOME="${HOME}"
OPENCODE_THEME="karasu"
OPENCODE_MODE=""
CONFIGURE_OPENCODE=0
SYNC_NEOVIM=0
NEOVIM_AUTO_STASH=0
PRUNE_ZED=0
FORCE_REWRITE_INVALID_OPENCODE_CONFIG=0

usage() {
  cat <<'EOF'
Usage: ./scripts/install-all.sh [options]

Install Karasu theme assets for all supported apps:
- Ghostty themes
- Zed extension files (non-destructive by default)
- OpenCode theme files (config changes are opt-in)

Defaults are non-destructive:
- Does NOT edit app config files
- Does NOT run Neovim sync
- Does NOT delete extra files from Zed extension dir

Options:
  --home <path>             Target home directory (default: $HOME)
  --opencode-theme <name>   OpenCode TUI theme string (default: karasu)
  --opencode-mode <mode>    Deprecated. Accepted for compatibility; use --opencode-theme
  --configure-opencode      Write OpenCode TUI theme settings to tui.json
  --force-rewrite-invalid-opencode-config
                            Overwrite invalid OpenCode TUI JSON when configuring
  --sync-neovim             Run Neovim lazy.nvim sync for karasu
  --neovim-auto-stash       Auto-stash dirty karasu lazy checkout before sync
  --prune-zed               Delete unmanaged files in zed extension target dir
  --skip-neovim             Deprecated alias; no effect (sync is already opt-in)
  -h, --help                Show this message
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --home)
      if [[ $# -lt 2 ]]; then
        echo "Missing value for --home"
        exit 1
      fi
      TARGET_HOME="$2"
      shift 2
      ;;
    --opencode-theme)
      if [[ $# -lt 2 ]]; then
        echo "Missing value for --opencode-theme"
        exit 1
      fi
      OPENCODE_THEME="$2"
      shift 2
      ;;
    --opencode-mode)
      if [[ $# -lt 2 ]]; then
        echo "Missing value for --opencode-mode"
        exit 1
      fi
      OPENCODE_MODE="$2"
      shift 2
      ;;
    --configure-opencode)
      CONFIGURE_OPENCODE=1
      shift
      ;;
    --force-rewrite-invalid-opencode-config)
      FORCE_REWRITE_INVALID_OPENCODE_CONFIG=1
      shift
      ;;
    --sync-neovim)
      SYNC_NEOVIM=1
      shift
      ;;
    --neovim-auto-stash)
      NEOVIM_AUTO_STASH=1
      shift
      ;;
    --prune-zed)
      PRUNE_ZED=1
      shift
      ;;
    --skip-neovim)
      SYNC_NEOVIM=0
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1"
      usage
      exit 1
      ;;
  esac
done

if [[ -n "$OPENCODE_MODE" && "$OPENCODE_MODE" != "string" && "$OPENCODE_MODE" != "system" ]]; then
  echo "Invalid --opencode-mode: $OPENCODE_MODE"
  exit 1
fi

if [[ "$OPENCODE_MODE" == "system" ]]; then
  echo "Warning: --opencode-mode system is deprecated for OpenCode themes. Use --opencode-theme karasu instead."
fi

if [[ "$NEOVIM_AUTO_STASH" -eq 1 && "$SYNC_NEOVIM" -eq 0 ]]; then
  echo "--neovim-auto-stash requires --sync-neovim"
  exit 1
fi

write_opencode_tui_config() {
  local cfg="$1"
  local theme="$2"
  local force_rewrite_invalid="$3"

  python3 - "$cfg" "$theme" "$force_rewrite_invalid" <<'PY'
import json
import os
import sys

cfg_path, theme, force_rewrite_invalid = sys.argv[1:]
data = {}
if os.path.exists(cfg_path):
    try:
        with open(cfg_path, "r", encoding="utf-8") as f:
            loaded = json.load(f)
            if isinstance(loaded, dict):
                data = loaded
            else:
                raise ValueError("top-level config must be an object")
    except Exception:
        if force_rewrite_invalid != "1":
            print(
                f"Refusing to modify invalid OpenCode TUI config at {cfg_path}. "
                "Use --force-rewrite-invalid-opencode-config to overwrite.",
                file=sys.stderr,
            )
            sys.exit(2)
        data = {}

data["$schema"] = "https://opencode.ai/tui.json"
data["theme"] = theme

os.makedirs(os.path.dirname(cfg_path), exist_ok=True)
with open(cfg_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
PY
}

backup_file() {
  local file_path="$1"
  local ts
  ts="$(date +%Y%m%d-%H%M%S)"
  local backup_path="${file_path}.bak.${ts}"
  cp "$file_path" "$backup_path"
  printf '%s' "$backup_path"
}

sync_zed_extension() {
  local src="$1"
  local dest="$2"

  if command -v rsync >/dev/null 2>&1; then
    local rsync_args=("-a")
    if [[ "$PRUNE_ZED" -eq 1 ]]; then
      rsync_args+=("--delete")
    fi
    rsync "${rsync_args[@]}" "$src/" "$dest/"
    return
  fi

  if [[ "$PRUNE_ZED" -eq 1 ]]; then
    echo "--prune-zed requires rsync"
    exit 1
  fi

  cp -R "$src/." "$dest/"
}

install -d "$TARGET_HOME/.config/ghostty/themes"
install -d "$TARGET_HOME/.config/opencode/themes"
install -d "$TARGET_HOME/.config/zed/extensions/karasu"

cp "$REPO_ROOT/platforms/ghostty/karasu-night" "$TARGET_HOME/.config/ghostty/themes/karasu-night"
cp "$REPO_ROOT/platforms/ghostty/karasu-snow" "$TARGET_HOME/.config/ghostty/themes/karasu-snow"
cp "$REPO_ROOT/platforms/opencode/themes/karasu.json" "$TARGET_HOME/.config/opencode/themes/karasu.json"
rm -f "$TARGET_HOME/.config/opencode/themes/karasu-night.json"
rm -f "$TARGET_HOME/.config/opencode/themes/karasu-snow.json"
sync_zed_extension "$REPO_ROOT/platforms/zed" "$TARGET_HOME/.config/zed/extensions/karasu"

opencode_mode_result="not configured"
if [[ "$CONFIGURE_OPENCODE" -eq 1 ]]; then
  opencode_cfg="$TARGET_HOME/.config/opencode/tui.json"
  if [[ -f "$opencode_cfg" ]]; then
    backup_path="$(backup_file "$opencode_cfg")"
    echo "Backed up OpenCode TUI config: $backup_path"
  fi

  write_opencode_tui_config \
    "$opencode_cfg" \
    "$OPENCODE_THEME" \
    "$FORCE_REWRITE_INVALID_OPENCODE_CONFIG"

  opencode_mode_result="tui theme '$OPENCODE_THEME'"
fi

neovim_result="not synced"
if [[ "$SYNC_NEOVIM" -eq 1 ]]; then
  neovim_result="requested"
  if ! command -v nvim >/dev/null 2>&1; then
    neovim_result="skipped (nvim not installed)"
  else
    nvim_plugin_dir="$TARGET_HOME/.local/share/nvim/lazy/karasu"
    can_sync=1
    if [[ -d "$nvim_plugin_dir/.git" ]] && [[ -n "$(git -C "$nvim_plugin_dir" status --porcelain)" ]]; then
      if [[ "$NEOVIM_AUTO_STASH" -eq 1 ]]; then
        git -C "$nvim_plugin_dir" stash push -m "karasu install-all auto-stash" >/dev/null || true
        echo "Neovim Karasu checkout had local edits; stashed before sync."
      else
        can_sync=0
        neovim_result="skipped (dirty checkout)"
        echo "Neovim Karasu checkout has local edits; skipping sync."
        echo "Rerun with --neovim-auto-stash or run manually:"
        echo "  nvim --headless '+Lazy! sync karasu' +qa"
      fi
    fi

    if [[ "$can_sync" -eq 1 ]]; then
      if nvim --headless '+Lazy! sync karasu' +qa >/dev/null 2>&1; then
        neovim_result="synced"
      else
        neovim_result="failed"
        echo "Warning: Unable to sync Neovim plugin automatically. Run:"
        echo "  nvim --headless '+Lazy! sync karasu' +qa"
      fi
    fi
  fi
fi

echo "Karasu theme assets installed for $TARGET_HOME"
echo "OpenCode config: $opencode_mode_result"
echo "Neovim sync: $neovim_result"
echo "Zed prune mode: $([[ "$PRUNE_ZED" == "1" ]] && echo enabled || echo disabled)"
