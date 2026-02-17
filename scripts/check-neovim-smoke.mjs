#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, {
    encoding: "utf8",
    ...opts,
  });
  return res;
}

function ensureNeovim() {
  const version = run("nvim", ["--version"]);
  if (version.error || version.status !== 0) {
    throw new Error("Neovim is required for check-neovim-smoke.mjs");
  }
}

function checkMode(mode, scheme) {
  const args = [
    "-u",
    "NONE",
    "-n",
    "--headless",
    "-c",
    "lua vim.opt.rtp:append(vim.env.KARASU_REPO_ROOT)",
    "-c",
    `lua require("karasu").setup({ mode = "${mode}" })`,
    "-c",
    `colorscheme ${scheme}`,
    "-c",
    'lua local m=vim.api.nvim_exec2("messages",{output=true}).output; if #m>0 then io.stderr:write(m); vim.cmd("cquit 1") end',
    "-c",
    "qa!",
  ];

  const res = run("nvim", args, {
    env: { ...process.env, KARASU_REPO_ROOT: root },
  });
  if (res.status !== 0) {
    const output = `${res.stdout || ""}${res.stderr || ""}`.trim();
    throw new Error(`Neovim smoke failed for ${mode}/${scheme}\n${output}`);
  }
}

function main() {
  ensureNeovim();
  checkMode("night", "karasu-night");
  checkMode("snow", "karasu-snow");
  console.log("Neovim smoke checks passed.");
}

main();
