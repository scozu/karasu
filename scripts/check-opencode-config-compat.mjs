#!/usr/bin/env node
import { mkdtempSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const installScript = path.join(root, "scripts", "install-all.sh");

function runInstall({ version, mode, theme = "karasu-night" }) {
  const home = mkdtempSync(path.join(os.tmpdir(), "karasu-opencode-"));
  const res = spawnSync(
    "bash",
      [
        installScript,
        "--home",
        home,
        "--configure-opencode",
        "--opencode-mode",
        mode,
        "--opencode-theme",
        theme,
      ],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        OPENCODE_VERSION_OVERRIDE: version,
      },
    },
  );

  if (res.status !== 0) {
    throw new Error(`install-all.sh failed\n${res.stdout}\n${res.stderr}`);
  }

  const configPath = path.join(home, ".config", "opencode", "opencode.json");
  const parsed = JSON.parse(readFileSync(configPath, "utf8"));
  return parsed;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function main() {
  // Safe default should remain a simple string for broad compatibility.
  const defaultOld = runInstall({ version: "1.1.60", mode: "string" });
  assert(typeof defaultOld.theme === "string", "OpenCode 1.1.x default theme must be a string");

  const defaultNew = runInstall({ version: "1.2.6", mode: "string" });
  assert(typeof defaultNew.theme === "string", "Default mode must stay string for compatibility");

  // System mode is opt-in and only emitted for versions we consider compatible.
  const systemOld = runInstall({ version: "1.1.60", mode: "system" });
  assert(typeof systemOld.theme === "string", "OpenCode 1.1.x system mode must fall back to string");

  const systemNew = runInstall({ version: "1.2.6", mode: "system" });
  assert(typeof systemNew.theme === "object", "OpenCode >=1.2.0 should support object theme in system mode");
  assert(systemNew.theme.mode === "system", "Object theme mode must be system");
  assert(systemNew.theme.dark === "karasu-night", "Object dark theme should be karasu-night");
  assert(systemNew.theme.light === "karasu-snow", "Object light theme should be karasu-snow");

  console.log("OpenCode config compatibility checks passed.");
}

main();
