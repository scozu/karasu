#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_HOME="${HOME}"
OPENCODE_THEME="karasu-night"
OPENCODE_MODE="string"
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
  --opencode-theme <name>   OpenCode theme string (default: karasu-night)
  --opencode-mode <mode>    "string" (safe default) or "system"
  --configure-opencode      Write OpenCode config theme settings
  --force-rewrite-invalid-opencode-config
                            Overwrite invalid OpenCode JSON when configuring
  --sync-neovim             Run Neovim lazy.nvim sync for karasu
  --neovim-auto-stash       Auto-stash dirty karasu lazy checkout before sync
  --prune-zed               Delete unmanaged files in zed extension target dir
  --skip-neovim             Deprecated alias; no effect (sync is already opt-in)
  -h, --help                Show this message

Environment:
  OPENCODE_VERSION_OVERRIDE  Force OpenCode version for testing.
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

if [[ "$OPENCODE_MODE" != "string" && "$OPENCODE_MODE" != "system" ]]; then
  echo "Invalid --opencode-mode: $OPENCODE_MODE"
  exit 1
fi

if [[ "$NEOVIM_AUTO_STASH" -eq 1 && "$SYNC_NEOVIM" -eq 0 ]]; then
  echo "--neovim-auto-stash requires --sync-neovim"
  exit 1
fi

version_ge() {
  local left="$1"
  local right="$2"
  local l r
  l="$(echo "$left" | sed -E 's/^v//; s/[^0-9.].*$//')"
  r="$(echo "$right" | sed -E 's/^v//; s/[^0-9.].*$//')"

  local l1=0 l2=0 l3=0 r1=0 r2=0 r3=0
  IFS='.' read -r l1 l2 l3 <<<"$l"
  IFS='.' read -r r1 r2 r3 <<<"$r"
  l1="${l1:-0}"; l2="${l2:-0}"; l3="${l3:-0}"
  r1="${r1:-0}"; r2="${r2:-0}"; r3="${r3:-0}"

  if (( l1 > r1 )); then return 0; fi
  if (( l1 < r1 )); then return 1; fi
  if (( l2 > r2 )); then return 0; fi
  if (( l2 < r2 )); then return 1; fi
  if (( l3 >= r3 )); then return 0; fi
  return 1
}

detect_opencode_version() {
  if [[ -n "${OPENCODE_VERSION_OVERRIDE:-}" ]]; then
    printf '%s' "$OPENCODE_VERSION_OVERRIDE"
    return
  fi

  if command -v opencode >/dev/null 2>&1; then
    opencode --version 2>/dev/null | head -n 1
    return
  fi

  printf ''
}

write_opencode_config() {
  local cfg="$1"
  local theme="$2"
  local use_system="$3"
  local force_rewrite_invalid="$4"

  local light="karasu-snow"
  local dark="karasu-night"
  if [[ "$theme" == "karasu-snow" ]]; then
    light="karasu-snow"
    dark="karasu-night"
  elif [[ "$theme" != "karasu-night" ]]; then
    dark="$theme"
  fi

  python3 - "$cfg" "$theme" "$use_system" "$light" "$dark" "$force_rewrite_invalid" <<'PY'
import json
import os
import sys

cfg_path, theme, use_system, light, dark, force_rewrite_invalid = sys.argv[1:]
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
                f"Refusing to modify invalid OpenCode config at {cfg_path}. "
                "Use --force-rewrite-invalid-opencode-config to overwrite.",
                file=sys.stderr,
            )
            sys.exit(2)
        data = {}

data["$schema"] = "https://opencode.ai/config.json"
if use_system == "1":
    data["theme"] = {"mode": "system", "light": light, "dark": dark}
else:
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
cp "$REPO_ROOT/platforms/opencode/themes/karasu-night.json" "$TARGET_HOME/.config/opencode/themes/karasu-night.json"
cp "$REPO_ROOT/platforms/opencode/themes/karasu-snow.json" "$TARGET_HOME/.config/opencode/themes/karasu-snow.json"
sync_zed_extension "$REPO_ROOT/platforms/zed" "$TARGET_HOME/.config/zed/extensions/karasu"

opencode_mode_result="not configured"
if [[ "$CONFIGURE_OPENCODE" -eq 1 ]]; then
  opencode_version="$(detect_opencode_version)"
  use_system="0"
  if [[ "$OPENCODE_MODE" == "system" ]]; then
    if [[ -n "$opencode_version" ]] && version_ge "$opencode_version" "1.2.0"; then
      use_system="1"
    else
      echo "OpenCode ${opencode_version:-unknown} may not support object theme config; using string fallback."
    fi
  fi

  opencode_cfg="$TARGET_HOME/.config/opencode/opencode.json"
  if [[ -f "$opencode_cfg" ]]; then
    backup_path="$(backup_file "$opencode_cfg")"
    echo "Backed up OpenCode config: $backup_path"
  fi

  write_opencode_config \
    "$opencode_cfg" \
    "$OPENCODE_THEME" \
    "$use_system" \
    "$FORCE_REWRITE_INVALID_OPENCODE_CONFIG"

  opencode_mode_result="$([[ "$use_system" == "1" ]] && echo system || echo string)"
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
