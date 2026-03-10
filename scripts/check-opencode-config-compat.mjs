#!/usr/bin/env node
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const installScript = path.join(root, "scripts", "install-all.sh");

function runInstall({ theme = "karasu", extraArgs = [], home }) {
  const targetHome = home ?? mkdtempSync(path.join(os.tmpdir(), "karasu-opencode-"));
  const res = spawnSync(
    "bash",
    [
      installScript,
      "--home",
      targetHome,
      "--configure-opencode",
      "--opencode-theme",
      theme,
      ...extraArgs,
    ],
    {
      encoding: "utf8",
    }
  );

  return {
    home: targetHome,
    res,
  };
}

function readTuiConfig(home) {
  const configPath = path.join(home, ".config", "opencode", "tui.json");
  return JSON.parse(readFileSync(configPath, "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertThemeFilesInstalled(home) {
  const themeDir = path.join(home, ".config", "opencode", "themes");
  ["karasu.json"].forEach((file) => {
    assert(existsSync(path.join(themeDir, file)), `Missing installed OpenCode theme file: ${file}`);
  });
  ["karasu-night.json", "karasu-snow.json"].forEach((file) => {
    assert(!existsSync(path.join(themeDir, file)), `Unexpected legacy OpenCode theme file: ${file}`);
  });
}

function main() {
  const defaultInstall = runInstall({});
  assert(defaultInstall.res.status === 0, `install-all.sh failed\n${defaultInstall.res.stdout}\n${defaultInstall.res.stderr}`);
  const defaultTui = readTuiConfig(defaultInstall.home);
  assert(defaultTui.$schema === "https://opencode.ai/tui.json", "OpenCode TUI config schema must be tui.json");
  assert(defaultTui.theme === "karasu", "Default OpenCode theme must be karasu");
  assertThemeFilesInstalled(defaultInstall.home);

  const customInstall = runInstall({ theme: "tokyonight" });
  assert(customInstall.res.status === 0, `install-all.sh failed\n${customInstall.res.stdout}\n${customInstall.res.stderr}`);
  const customTui = readTuiConfig(customInstall.home);
  assert(customTui.theme === "tokyonight", "Custom OpenCode theme must be written to tui.json");
  assertThemeFilesInstalled(customInstall.home);

  const deprecatedModeInstall = runInstall({ extraArgs: ["--opencode-mode", "system"] });
  assert(
    deprecatedModeInstall.res.status === 0,
    `install-all.sh failed with deprecated --opencode-mode\n${deprecatedModeInstall.res.stdout}\n${deprecatedModeInstall.res.stderr}`
  );
  const deprecatedModeTui = readTuiConfig(deprecatedModeInstall.home);
  assert(deprecatedModeTui.theme === "karasu", "Deprecated --opencode-mode should preserve string TUI theme config");

  const invalidHome = mkdtempSync(path.join(os.tmpdir(), "karasu-opencode-invalid-"));
  const invalidTuiPath = path.join(invalidHome, ".config", "opencode", "tui.json");
  mkdirSync(path.dirname(invalidTuiPath), { recursive: true });
  writeFileSync(invalidTuiPath, "{ not valid json\n", "utf8");

  const rejectedInvalidInstall = runInstall({ home: invalidHome });
  assert(rejectedInvalidInstall.res.status === 2, "Invalid OpenCode TUI config should fail without force rewrite");

  const forcedInvalidInstall = runInstall({
    home: invalidHome,
    extraArgs: ["--force-rewrite-invalid-opencode-config"],
  });
  assert(
    forcedInvalidInstall.res.status === 0,
    `Forced install-all.sh failed\n${forcedInvalidInstall.res.stdout}\n${forcedInvalidInstall.res.stderr}`
  );
  const forcedTui = readTuiConfig(invalidHome);
  assert(forcedTui.theme === "karasu", "Forced rewrite should restore a valid TUI theme config");

  console.log("OpenCode config compatibility checks passed.");
}

main();
