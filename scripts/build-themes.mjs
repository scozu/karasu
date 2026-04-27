import fs from "fs";
import path from "path";
import { buildVSCodeTheme } from "../platforms/vscode/spec.mjs";
import { buildObsidianMinimalSnippet } from "../platforms/obsidian/spec.mjs";

const root = process.cwd();

const displayNames = {
  night: "Karasu Night",
  snow: "Karasu Snow",
};

const palettes = {
  night: readJson("palette/night.json"),
  snow: readJson("palette/snow.json"),
};
const tokens = readJson("palette/tokens.json");

const OPENCODE_ROLE_KEYS = {
  primary: "syntaxProperty",
  secondary: "syntaxNumber",
  accent: "syntaxString",
  error: "diagError",
  warning: "diagWarning",
  success: "syntaxFunction",
  info: "diagInfo",
  text: "karasuFg0",
  textMuted: "syntaxComment",
  background: "karasuBg0",
  backgroundPanel: "karasuBg1",
  backgroundElement: "karasuBg2",
  border: "karasuBg3",
  borderActive: "syntaxProperty",
  borderSubtle: "karasuBg2",
  diffAdded: "syntaxFunction",
  diffRemoved: "diagError",
  diffContext: "syntaxComment",
  diffHunkHeader: "karasuBg3",
  diffHighlightAdded: "syntaxFunction",
  diffHighlightRemoved: "diagError",
  diffAddedBg: "diffAddedBg",
  diffRemovedBg: "diffRemovedBg",
  diffContextBg: "diffContextBg",
  diffLineNumber: "syntaxComment",
  diffAddedLineNumberBg: "diffAddedBg",
  diffRemovedLineNumberBg: "diffRemovedBg",
  markdownText: "karasuFg0",
  markdownHeading: "syntaxLink",
  markdownLink: "syntaxLink",
  markdownLinkText: "syntaxProperty",
  markdownCode: "syntaxString",
  markdownBlockQuote: "syntaxComment",
  markdownEmph: "syntaxKeyword",
  markdownStrong: "syntaxOperator",
  markdownHorizontalRule: "karasuBg3",
  markdownListItem: "syntaxProperty",
  markdownListEnumeration: "syntaxNumber",
  markdownImage: "syntaxLink",
  markdownImageText: "syntaxProperty",
  markdownCodeBlock: "karasuFg0",
  syntaxComment: "syntaxComment",
  syntaxKeyword: "syntaxKeyword",
  syntaxFunction: "syntaxFunction",
  syntaxVariable: "syntaxVariable",
  syntaxString: "syntaxString",
  syntaxNumber: "syntaxNumber",
  syntaxType: "syntaxType",
  syntaxOperator: "syntaxOperator",
  syntaxPunctuation: "syntaxPunctuation",
};

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function writeFile(relPath, contents) {
  const fullPath = path.join(root, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, contents);
}

function flattenPalette(palette) {
  return {
    ...palette.background,
    ...palette.foreground,
    ...palette.syntax,
    ...palette.bright,
    ansi_black: palette.ansi.normal.black,
    ansi_red: palette.ansi.normal.red,
    ansi_green: palette.ansi.normal.green,
    ansi_yellow: palette.ansi.normal.yellow,
    ansi_blue: palette.ansi.normal.blue,
    ansi_magenta: palette.ansi.normal.magenta,
    ansi_cyan: palette.ansi.normal.cyan,
    ansi_white: palette.ansi.normal.white,
    ansi_bright_black: palette.ansi.bright.black,
    ansi_bright_red: palette.ansi.bright.red,
    ansi_bright_green: palette.ansi.bright.green,
    ansi_bright_yellow: palette.ansi.bright.yellow,
    ansi_bright_blue: palette.ansi.bright.blue,
    ansi_bright_magenta: palette.ansi.bright.magenta,
    ansi_bright_cyan: palette.ansi.bright.cyan,
    ansi_bright_white: palette.ansi.bright.white,
  };
}

function resolveToken(tokenValue, paletteMap) {
  if (tokenValue.startsWith("#")) return tokenValue;
  if (!paletteMap[tokenValue]) {
    throw new Error(`Unknown palette key: ${tokenValue}`);
  }
  return paletteMap[tokenValue];
}

function renderTemplate(template, templateMap) {
  return template.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    const value = templateMap[key];
    if (!value) {
      throw new Error(`Unknown template key: ${key}`);
    }
    return value;
  });
}

function withAlpha(hex, alpha) {
  if (!hex.startsWith("#") || hex.length !== 7) return hex;
  return `${hex}${alpha}`;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function writeGhostty(variant, palette, paletteMap, tokenMap) {
  const ansiOrder = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
  const lines = [];
  ansiOrder.forEach((name, idx) => {
    lines.push(`palette = ${idx}=${palette.ansi.normal[name]}`);
  });
  ansiOrder.forEach((name, idx) => {
    lines.push(`palette = ${idx + 8}=${palette.ansi.bright[name]}`);
  });

  lines.push("");
  lines.push(`background = ${paletteMap.karasuBg0}`);
  lines.push(`foreground = ${paletteMap.karasuFg0}`);
  lines.push(`cursor-color = ${tokenMap.cursor}`);
  lines.push(`selection-background = ${tokenMap.selectionBg}`);
  lines.push(`selection-foreground = ${tokenMap.selectionFg}`);

  writeFile(`platforms/ghostty/${displayNames[variant]}`, `${lines.join("\n")}\n`);
}

function writeIterm2(variant, palette, paletteMap, tokenMap) {
  const ansiOrder = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
  const entries = [];

  function colorDict(hex) {
    const [r, g, b] = hexToRgb(hex).map((value) => value / 255);
    return [
      "<dict>",
      `<key>Red Component</key><real>${r}</real>`,
      `<key>Green Component</key><real>${g}</real>`,
      `<key>Blue Component</key><real>${b}</real>`,
      "</dict>",
    ].join("");
  }

  ansiOrder.forEach((name, idx) => {
    entries.push(`<key>Ansi ${idx} Color</key>${colorDict(palette.ansi.normal[name])}`);
  });
  ansiOrder.forEach((name, idx) => {
    entries.push(`<key>Ansi ${idx + 8} Color</key>${colorDict(palette.ansi.bright[name])}`);
  });

  entries.push(`<key>Background Color</key>${colorDict(paletteMap.karasuBg0)}`);
  entries.push(`<key>Foreground Color</key>${colorDict(paletteMap.karasuFg0)}`);
  entries.push(`<key>Cursor Color</key>${colorDict(tokenMap.cursor)}`);
  entries.push(`<key>Cursor Text Color</key>${colorDict(tokenMap.cursorText)}`);
  entries.push(`<key>Selection Color</key>${colorDict(tokenMap.selectionBg)}`);
  entries.push(`<key>Selected Text Color</key>${colorDict(tokenMap.selectionFg)}`);

  const plist = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">",
    "<plist version=\"1.0\">",
    "<dict>",
    entries.join(""),
    "</dict>",
    "</plist>",
    "",
  ].join("\n");

  writeFile(`platforms/iterm2/${displayNames[variant]}.itermcolors`, plist);
}

function writeZed(variant, paletteMap, tokenMap) {
  const templatePath = path.join(root, "platforms/zed/templates", `karasu-${variant}.json`);
  const template = fs.readFileSync(templatePath, "utf8");
  const rendered = renderTemplate(template, { ...paletteMap, ...tokenMap });
  const theme = JSON.parse(rendered);

  const players = theme.themes?.[0]?.style?.players;
  if (Array.isArray(players)) {
    players.forEach((player) => {
      player.cursor = tokenMap.cursor;
      player.background = withAlpha(tokenMap.cursor, "33");
      player.selection = withAlpha(tokenMap.cursor, "33");
    });
  }

  writeFile(`platforms/zed/themes/karasu-${variant}.json`, `${JSON.stringify(theme, null, 2)}\n`);
}

function buildOpencodeThemeRoles(resolveRoleValue) {
  return Object.fromEntries(
    Object.entries(OPENCODE_ROLE_KEYS).map(([role, key]) => [role, resolveRoleValue(key)])
  );
}

function buildOpencodeThemeDefs(paletteMap, tokenMap) {
  const source = { ...paletteMap, ...tokenMap };
  return Object.fromEntries(
    [...new Set(Object.values(OPENCODE_ROLE_KEYS))].map((key) => {
      const value = source[key];
      if (!value) {
        throw new Error(`Unknown OpenCode key: ${key}`);
      }
      return [key, value];
    })
  );
}

function opencodeDefName(prefix, key) {
  if (key.startsWith("karasu")) {
    return `${prefix}${key.slice("karasu".length)}`;
  }
  return `${prefix}${key[0].toUpperCase()}${key.slice(1)}`;
}

function buildOpencodePrefixedDefs(prefix, paletteMap, tokenMap) {
  return Object.fromEntries(
    Object.entries(buildOpencodeThemeDefs(paletteMap, tokenMap)).map(([key, value]) => [opencodeDefName(prefix, key), value])
  );
}

function buildOpencodeCombinedTheme(darkPaletteMap, darkTokenMap, lightPaletteMap, lightTokenMap) {
  return {
    $schema: "https://opencode.ai/theme.json",
    defs: {
      ...buildOpencodePrefixedDefs("dark", darkPaletteMap, darkTokenMap),
      ...buildOpencodePrefixedDefs("light", lightPaletteMap, lightTokenMap),
    },
    theme: buildOpencodeThemeRoles((key) => ({
      dark: opencodeDefName("dark", key),
      light: opencodeDefName("light", key),
    })),
  };
}

function writeOpencodeCombined(nightPaletteMap, nightTokenMap, snowPaletteMap, snowTokenMap) {
  const theme = buildOpencodeCombinedTheme(nightPaletteMap, nightTokenMap, snowPaletteMap, snowTokenMap);
  fs.rmSync(path.join(root, "platforms/opencode/themes/karasu-night.json"), { force: true });
  fs.rmSync(path.join(root, "platforms/opencode/themes/karasu-snow.json"), { force: true });
  writeFile("platforms/opencode/themes/karasu.json", `${JSON.stringify(theme, null, 2)}\n`);
}

function writeVSCode(variant, paletteMap, tokenMap, palette) {
  const theme = buildVSCodeTheme({ variant, paletteMap, tokenMap, palette });

  writeFile(
    `platforms/vscode/themes/karasu-${variant}-color-theme.json`,
    `${JSON.stringify(theme, null, 2)}\n`
  );
}

function writeNeovimPalette(variant, paletteMap, palette, tokenMap) {
  const isNight = variant === "night";
  const lines = [];
  lines.push(`-- Karasu ${isNight ? "Night" : "Snow"} Palette`);
  lines.push(`-- Generated from palette/${variant}.json`);
  lines.push("");
  lines.push("local M = {");
  lines.push("  -- Background layers");
  lines.push(`  bg0 = "${paletteMap.karasuBg0}",`);
  lines.push(`  bg1 = "${paletteMap.karasuBg1}",`);
  lines.push(`  bg2 = "${paletteMap.karasuBg2}",`);
  lines.push(`  bg3 = "${paletteMap.karasuBg3}",`);
  lines.push(`  bg4 = "${paletteMap.karasuBg4}",`);
  lines.push(`  bg_visual = "${paletteMap.karasuBgVisual}",`);
  lines.push(`  bgVisual = "${paletteMap.karasuBgVisual}",`);
  lines.push(`  bg_search = "${paletteMap.karasuBgSearch}",`);
  lines.push(`  bgSearch = "${paletteMap.karasuBgSearch}",`);
  lines.push("");
  lines.push("  -- Foreground tones");
  lines.push(`  fg0 = "${paletteMap.karasuFg0}",`);
  lines.push(`  fg1 = "${paletteMap.karasuFg1}",`);
  lines.push(`  fg2 = "${paletteMap.karasuFg2}",`);
  lines.push(`  fg3 = "${paletteMap.karasuFg3}",`);
  lines.push(`  fg_dim = "${paletteMap.karasuFgDim}",`);
  lines.push(`  fgDim = "${paletteMap.karasuFgDim}",`);
  lines.push("");
  lines.push("  -- Core tokens");
  lines.push(`  cursor = "${tokenMap.cursor}",`);
  lines.push(`  cursor_text = "${tokenMap.cursorText}",`);
  lines.push(`  cursorText = "${tokenMap.cursorText}",`);
  lines.push(`  selection_bg = "${tokenMap.selectionBg}",`);
  lines.push(`  selectionBg = "${tokenMap.selectionBg}",`);
  lines.push(`  search_bg = "${tokenMap.searchBg}",`);
  lines.push(`  searchBg = "${tokenMap.searchBg}",`);
  lines.push(`  search_fg = "${tokenMap.searchFg}",`);
  lines.push(`  searchFg = "${tokenMap.searchFg}",`);
  lines.push(`  diff_added_bg = "${tokenMap.diffAddedBg}",`);
  lines.push(`  diff_removed_bg = "${tokenMap.diffRemovedBg}",`);
  lines.push(`  diff_context_bg = "${tokenMap.diffContextBg}",`);
  lines.push("");
  lines.push("  -- Strict syntax/diagnostic roles");
  lines.push(`  role_comment = "${tokenMap.syntaxComment}",`);
  lines.push(`  role_keyword = "${tokenMap.syntaxKeyword}",`);
  lines.push(`  role_type = "${tokenMap.syntaxType}",`);
  lines.push(`  role_function = "${tokenMap.syntaxFunction}",`);
  lines.push(`  role_string = "${tokenMap.syntaxString}",`);
  lines.push(`  role_number = "${tokenMap.syntaxNumber}",`);
  lines.push(`  role_operator = "${tokenMap.syntaxOperator}",`);
  lines.push(`  role_property = "${tokenMap.syntaxProperty}",`);
  lines.push(`  role_variable = "${tokenMap.syntaxVariable}",`);
  lines.push(`  role_punctuation = "${tokenMap.syntaxPunctuation}",`);
  lines.push(`  role_link = "${tokenMap.syntaxLink}",`);
  lines.push(`  role_error = "${tokenMap.diagError}",`);
  lines.push(`  role_warning = "${tokenMap.diagWarning}",`);
  lines.push(`  role_info = "${tokenMap.diagInfo}",`);
  lines.push(`  role_hint = "${tokenMap.diagHint}",`);
  lines.push("");
  lines.push("  -- Syntax colors");
  lines.push(`  red = "${paletteMap.karasuRed}",`);
  lines.push(`  green = "${paletteMap.karasuGreen}",`);
  lines.push(`  yellow = "${paletteMap.karasuYellow}",`);
  lines.push(`  blue = "${paletteMap.karasuBlue}",`);
  lines.push(`  purple = "${paletteMap.karasuPurple}",`);
  lines.push(`  aqua = "${paletteMap.karasuAqua}",`);
  lines.push(`  orange = "${paletteMap.karasuOrange}",`);
  lines.push("");
  lines.push("  -- Bright colors for terminal");
  lines.push(`  bright_red = "${paletteMap.karasuBrightRed}",`);
  lines.push(`  brightRed = "${paletteMap.karasuBrightRed}",`);
  lines.push(`  bright_green = "${paletteMap.karasuBrightGreen}",`);
  lines.push(`  brightGreen = "${paletteMap.karasuBrightGreen}",`);
  lines.push(`  bright_yellow = "${paletteMap.karasuBrightYellow}",`);
  lines.push(`  brightYellow = "${paletteMap.karasuBrightYellow}",`);
  lines.push(`  bright_blue = "${paletteMap.karasuBrightBlue}",`);
  lines.push(`  brightBlue = "${paletteMap.karasuBrightBlue}",`);
  lines.push(`  bright_magenta = "${paletteMap.karasuBrightMagenta}",`);
  lines.push(`  brightMagenta = "${paletteMap.karasuBrightMagenta}",`);
  lines.push(`  bright_cyan = "${paletteMap.karasuBrightCyan}",`);
  lines.push(`  brightCyan = "${paletteMap.karasuBrightCyan}",`);
  lines.push(`  bright_white = "${paletteMap.karasuBrightWhite}",`);
  lines.push(`  brightWhite = "${paletteMap.karasuBrightWhite}",`);
  lines.push("");
  lines.push("  -- ANSI color mapping");
  lines.push("  ansi = {");
  lines.push(`    black = "${palette.ansi.normal.black}",`);
  lines.push(`    red = "${palette.ansi.normal.red}",`);
  lines.push(`    green = "${palette.ansi.normal.green}",`);
  lines.push(`    yellow = "${palette.ansi.normal.yellow}",`);
  lines.push(`    blue = "${palette.ansi.normal.blue}",`);
  lines.push(`    magenta = "${palette.ansi.normal.magenta}",`);
  lines.push(`    cyan = "${palette.ansi.normal.cyan}",`);
  lines.push(`    white = "${palette.ansi.normal.white}",`);
  lines.push(`    bright_black = "${palette.ansi.bright.black}",`);
  lines.push(`    bright_red = "${palette.ansi.bright.red}",`);
  lines.push(`    bright_green = "${palette.ansi.bright.green}",`);
  lines.push(`    bright_yellow = "${palette.ansi.bright.yellow}",`);
  lines.push(`    bright_blue = "${palette.ansi.bright.blue}",`);
  lines.push(`    bright_magenta = "${palette.ansi.bright.magenta}",`);
  lines.push(`    bright_cyan = "${palette.ansi.bright.cyan}",`);
  lines.push(`    bright_white = "${palette.ansi.bright.white}",`);
  lines.push("  }");
  lines.push("}");
  lines.push("");
  lines.push("return M");
  lines.push("");

  writeFile(`lua/karasu/palette/${variant}.lua`, lines.join("\n"));
}

function writeObsidian(nightPaletteMap, nightTokenMap, snowPaletteMap, snowTokenMap) {
  const snippet = buildObsidianMinimalSnippet({
    nightPaletteMap,
    nightTokenMap,
    snowPaletteMap,
    snowTokenMap,
  });

  writeFile("platforms/obsidian/snippets/karasu-minimal.css", snippet);
}

function buildVariant(variant) {
  const palette = palettes[variant];
  const paletteMap = flattenPalette(palette);

  const tokenMap = Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [key, resolveToken(value[variant], paletteMap)])
  );

  writeGhostty(variant, palette, paletteMap, tokenMap);
  writeIterm2(variant, palette, paletteMap, tokenMap);
  writeZed(variant, paletteMap, tokenMap);
  writeVSCode(variant, paletteMap, tokenMap, palette);
  writeNeovimPalette(variant, paletteMap, palette, tokenMap);

  return { paletteMap, tokenMap };
}

const night = buildVariant("night");
const snow = buildVariant("snow");
writeOpencodeCombined(night.paletteMap, night.tokenMap, snow.paletteMap, snow.tokenMap);
writeObsidian(night.paletteMap, night.tokenMap, snow.paletteMap, snow.tokenMap);

console.log("Themes generated for Night and Snow.");
