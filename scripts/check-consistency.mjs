import fs from "fs";
import path from "path";
import { buildObsidianMinimalVariantVars } from "../platforms/obsidian/spec.mjs";

const root = process.cwd();

const palettes = {
  night: readJson("palette/night.json"),
  snow: readJson("palette/snow.json"),
};
const tokens = readJson("palette/tokens.json");
const xtermColors = buildXtermColors();

const NEOVIM_TREE_SITTER_EXPECTATIONS = {
  "@comment": "role_comment",
  "@comment.documentation": "role_comment",
  "@keyword": "role_keyword",
  "@keyword.return": "role_keyword",
  "@keyword.conditional": "role_keyword",
  "@keyword.repeat": "role_keyword",
  "@operator": "role_operator",
  "@function": "role_function",
  "@function.builtin": "role_function",
  "@method": "role_function",
  "@constructor": "role_function",
  "@type": "role_type",
  "@type.builtin": "role_type",
  "@namespace": "role_type",
  "@module": "role_type",
  "@string": "role_string",
  "@string.regex": "role_string",
  "@string.special": "role_string",
  "@string.escape": "role_operator",
  "@number": "role_number",
  "@boolean": "role_number",
  "@constant": "role_number",
  "@field": "role_property",
  "@property": "role_property",
  "@variable": "role_variable",
  "@parameter": "role_variable",
  "@punctuation.delimiter": "role_punctuation",
  "@punctuation.bracket": "role_punctuation",
  "@punctuation.special": "role_operator",
};

const NEOVIM_SYNTAX_EXPECTATIONS = {
  Comment: "role_comment",
  String: "role_string",
  Character: "role_string",
  Number: "role_number",
  Boolean: "role_number",
  Float: "role_number",
  Function: "role_function",
  Statement: "role_keyword",
  Conditional: "role_keyword",
  Repeat: "role_keyword",
  Keyword: "role_keyword",
  Operator: "role_operator",
  Type: "role_type",
  Structure: "role_type",
  Identifier: "role_variable",
  Delimiter: "role_punctuation",
};

const NEOVIM_LSP_EXPECTATIONS = {
  "@lsp.type.namespace": "role_type",
  "@lsp.type.type": "role_type",
  "@lsp.type.class": "role_type",
  "@lsp.type.enum": "role_type",
  "@lsp.type.interface": "role_type",
  "@lsp.type.struct": "role_type",
  "@lsp.type.typeParameter": "role_type",
  "@lsp.type.parameter": "role_variable",
  "@lsp.type.variable": "role_variable",
  "@lsp.type.property": "role_property",
  "@lsp.type.enumMember": "role_number",
  "@lsp.type.function": "role_function",
  "@lsp.type.method": "role_function",
  "@lsp.type.macro": "role_operator",
  "@lsp.type.decorator": "role_operator",
  "@lsp.type.keyword": "role_keyword",
  "@lsp.type.modifier": "role_operator",
  "@lsp.type.comment": "role_comment",
  "@lsp.type.string": "role_string",
  "@lsp.type.number": "role_number",
  "@lsp.type.regexp": "role_string",
  "@lsp.type.operator": "role_operator",
};

const ZED_EXPECTED_SYNTAX_TOKEN = {
  comment: "syntaxComment",
  "comment.doc": "syntaxComment",
  predictive: "syntaxComment",
  keyword: "syntaxKeyword",
  label: "syntaxKeyword",
  selector: "syntaxKeyword",
  function: "syntaxFunction",
  "function.builtin": "syntaxFunction",
  constructor: "syntaxFunction",
  string: "syntaxString",
  "string.regex": "syntaxString",
  "string.special": "syntaxString",
  embedded: "syntaxString",
  "text.literal": "syntaxString",
  "string.escape": "syntaxOperator",
  number: "syntaxNumber",
  boolean: "syntaxNumber",
  constant: "syntaxNumber",
  "string.special.symbol": "syntaxNumber",
  type: "syntaxType",
  "type.builtin": "syntaxType",
  "type.super": "syntaxType",
  enum: "syntaxType",
  namespace: "syntaxType",
  property: "syntaxProperty",
  variable: "syntaxVariable",
  "variable.special": "syntaxVariable",
  primary: "syntaxVariable",
  operator: "syntaxOperator",
  attribute: "syntaxOperator",
  preproc: "syntaxOperator",
  "punctuation.special": "syntaxOperator",
  tag: "syntaxOperator",
  punctuation: "syntaxPunctuation",
  "punctuation.bracket": "syntaxPunctuation",
  "punctuation.delimiter": "syntaxPunctuation",
  link_text: "syntaxLink",
  link_uri: "syntaxLink",
  title: "syntaxLink",
  hint: "diagHint",
};

const VSCODE_TOKEN_RULE_EXPECTATIONS = {
  Comment: "syntaxComment",
  String: "syntaxString",
  "String Escapes": "syntaxOperator",
  "String Interpolation": "syntaxOperator",
  "Regex Character Class": "syntaxOperator",
  Number: "syntaxNumber",
  Constant: "syntaxNumber",
  Keyword: "syntaxKeyword",
  "Control Flow": "syntaxKeyword",
  Operators: "syntaxOperator",
  Punctuation: "syntaxPunctuation",
  Function: "syntaxFunction",
  Method: "syntaxFunction",
  Type: "syntaxType",
  Class: "syntaxType",
  Interface: "syntaxType",
  Enum: "syntaxType",
  Variable: "syntaxVariable",
  Parameter: "syntaxVariable",
  Property: "syntaxProperty",
  "Builtin Variable": "syntaxNumber",
  Module: "syntaxType",
  "Tag Name": "syntaxOperator",
  "Tag Punctuation": "syntaxPunctuation",
  "Attribute Name": "syntaxProperty",
  "Attribute Value": "syntaxString",
  "JSON Key": "syntaxProperty",
  "JSON Punctuation": "syntaxPunctuation",
  "YAML Key": "syntaxProperty",
  "YAML Anchor": "syntaxType",
  "Markdown Heading": "syntaxType",
  "Markdown Inline Code": "syntaxString",
  "Markdown Link": "syntaxLink",
  "Markdown List": "syntaxOperator",
  "Diff Added": "syntaxFunction",
  "Diff Removed": "diagError",
  "Diff Changed": "diagWarning",
  Annotation: "syntaxOperator",
  Decorator: "syntaxOperator",
  "JS Arrow": "syntaxOperator",
  "JS This": "syntaxVariable",
  "TS Generic": "syntaxType",
  "TS Namespace": "syntaxType",
  "Python Self": "syntaxVariable",
  "Python Dunder": "syntaxVariable",
  "Rust Macro": "syntaxOperator",
  "Rust Lifetime": "syntaxType",
  "Lua Global": "syntaxVariable",
  "Lua Function": "syntaxFunction",
  "Shell Variable": "syntaxVariable",
  "Shell Command": "syntaxFunction",
  "CSS Property": "syntaxProperty",
  "CSS Value": "syntaxString",
  "CSS Class": "syntaxType",
  "SQL Keyword": "syntaxKeyword",
  "SQL Table": "syntaxType",
  "SQL Column": "syntaxProperty",
  "Doc Tag": "syntaxOperator",
  "Doc Description": "syntaxComment",
  "Punctuation Brackets": "syntaxPunctuation",
  "Punctuation Parameters": "syntaxPunctuation",
  "Punctuation Array": "syntaxPunctuation",
  "Punctuation Object": "syntaxPunctuation",
  "Meta Import": "syntaxKeyword",
  "Meta Export": "syntaxKeyword",
  "Meta Embedded": "syntaxVariable",
  "Link URL": "syntaxLink",
  "Quote Punctuation": "syntaxPunctuation",
  "Template String Punctuation": "syntaxOperator",
  "Escape Punctuation": "syntaxOperator",
  "Heading Marker": "syntaxType",
  "Emphasis Marker": "syntaxKeyword",
  "Deleted Punctuation": "diagError",
  "Inserted Punctuation": "syntaxFunction",
};

const VSCODE_SEMANTIC_EXPECTATIONS = {
  namespace: "syntaxType",
  class: "syntaxType",
  interface: "syntaxType",
  enum: "syntaxType",
  typeParameter: "syntaxType",
  property: "syntaxProperty",
  variable: "syntaxVariable",
  parameter: "syntaxVariable",
  function: "syntaxFunction",
  method: "syntaxFunction",
  macro: "syntaxOperator",
  "keyword.controlFlow": "syntaxKeyword",
  "variable.readonly": "syntaxNumber",
  "variable.defaultLibrary": "syntaxNumber",
  "property.defaultLibrary": "syntaxNumber",
  operator: "syntaxOperator",
};

const OPENCODE_SYNTAX_ROLE_EXPECTATIONS = {
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

const OBSIDIAN_MARKER_BY_VARIANT = {
  night: "karasu-dark",
  snow: "karasu-light",
};

const OBSIDIAN_REQUIRED_SELECTORS = [
  ".theme-light.minimal-default-light",
  ".theme-dark.minimal-default-dark",
  ".theme-light.minimal-karasu-light",
  ".theme-dark.minimal-karasu-dark",
  "minimal-light-contrast",
  "minimal-light-tonal",
  "minimal-light-white",
  "minimal-dark-tonal",
  "minimal-dark-black",
];

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function flattenPalette(palette) {
  return {
    ...palette.background,
    ...palette.foreground,
    ...palette.syntax,
    ...palette.bright,
  };
}

function resolveToken(tokenValue, paletteMap) {
  if (tokenValue.startsWith("#")) return tokenValue;
  const resolved = paletteMap[tokenValue];
  if (!resolved) throw new Error(`Unknown palette token: ${tokenValue}`);
  return resolved;
}

function normalizeHex(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) return trimmed.toLowerCase();
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(trimmed)) {
    return trimmed.replace(/\s+/g, "");
  }
  return trimmed;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEqual(label, actual, expected) {
  const normalizedActual = normalizeHex(actual);
  const normalizedExpected = normalizeHex(expected);
  if (normalizedActual !== normalizedExpected) {
    throw new Error(`${label} mismatch: expected ${expected}, got ${actual}`);
  }
}

function buildCanonicalRoles(tokenMap) {
  return {
    role_comment: tokenMap.syntaxComment,
    role_keyword: tokenMap.syntaxKeyword,
    role_type: tokenMap.syntaxType,
    role_function: tokenMap.syntaxFunction,
    role_string: tokenMap.syntaxString,
    role_number: tokenMap.syntaxNumber,
    role_operator: tokenMap.syntaxOperator,
    role_property: tokenMap.syntaxProperty,
    role_variable: tokenMap.syntaxVariable,
    role_punctuation: tokenMap.syntaxPunctuation,
    role_link: tokenMap.syntaxLink,
    role_error: tokenMap.diagError,
    role_warning: tokenMap.diagWarning,
    role_info: tokenMap.diagInfo,
    role_hint: tokenMap.diagHint,
  };
}

function parseGhostty(pathRel) {
  const content = fs.readFileSync(path.join(root, pathRel), "utf8");
  const values = {};
  const ansi = {};

  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const paletteMatch = trimmed.match(/^palette\s*=\s*(\d+)\s*=\s*(#[0-9a-fA-F]{6})$/);
    if (paletteMatch) {
      ansi[Number.parseInt(paletteMatch[1], 10)] = paletteMatch[2];
      return;
    }

    const kvMatch = trimmed.match(/^([a-zA-Z0-9-]+)\s*=\s*(.+)$/);
    if (!kvMatch) return;
    values[kvMatch[1]] = kvMatch[2];
  });

  return { values, ansi };
}

function parseIterm2Color(fileRel, keyName) {
  const xml = fs.readFileSync(path.join(root, fileRel), "utf8");
  const keyIndex = xml.indexOf(`<key>${keyName}</key>`);
  if (keyIndex === -1) return null;
  const dictMatch = xml.slice(keyIndex).match(/<dict>.*?<\/dict>/s);
  if (!dictMatch) return null;
  const dict = dictMatch[0];
  const red = parseFloat(dict.match(/<key>Red Component<\/key><real>(.*?)<\/real>/)?.[1] ?? "0");
  const green = parseFloat(dict.match(/<key>Green Component<\/key><real>(.*?)<\/real>/)?.[1] ?? "0");
  const blue = parseFloat(dict.match(/<key>Blue Component<\/key><real>(.*?)<\/real>/)?.[1] ?? "0");
  const toHex = (value) => Math.round(value * 255).toString(16).padStart(2, "0");
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function parseZedTheme(fileRel) {
  const theme = readJson(fileRel);
  return {
    style: theme.themes?.[0]?.style ?? {},
    syntax: theme.themes?.[0]?.style?.syntax ?? {},
    players: theme.themes?.[0]?.style?.players ?? [],
  };
}

function parseVSCodeTheme(fileRel) {
  return readJson(fileRel);
}

function parseOpenCodeTheme(fileRel) {
  return readJson(fileRel);
}

function resolveOpenCodeRef(theme, value) {
  if (typeof value !== "string") return value;
  if (value.startsWith("#")) return value;
  if (theme.defs?.[value] !== undefined) return theme.defs[value];
  return value;
}

function parseOpenCodeRole(theme, role, mode) {
  const value = theme.theme?.[role]?.[mode];
  return resolveOpenCodeRef(theme, value);
}

function parseObsidianCssVarsByMarker(css, marker) {
  const markerText = `/* ${marker} */`;
  const markerIndex = css.indexOf(markerText);
  assert(markerIndex !== -1, `obsidian snippet missing marker: ${markerText}`);
  const openBraceIndex = css.indexOf("{", markerIndex);
  const closeBraceIndex = css.indexOf("}", openBraceIndex + 1);
  assert(openBraceIndex !== -1 && closeBraceIndex !== -1, `obsidian snippet invalid block for marker: ${marker}`);

  const body = css.slice(openBraceIndex + 1, closeBraceIndex);
  const vars = {};
  const pattern = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match = pattern.exec(body);
  while (match) {
    vars[match[1]] = match[2].trim();
    match = pattern.exec(body);
  }
  return vars;
}

function parseObsidianSnippet(fileRel) {
  const css = fs.readFileSync(path.join(root, fileRel), "utf8");
  return {
    css,
    darkVars: parseObsidianCssVarsByMarker(css, OBSIDIAN_MARKER_BY_VARIANT.night),
    lightVars: parseObsidianCssVarsByMarker(css, OBSIDIAN_MARKER_BY_VARIANT.snow),
  };
}

function parseNeovimPaletteColor(variant, key) {
  const file = fs.readFileSync(path.join(root, `lua/karasu/palette/${variant}.lua`), "utf8");
  const pattern = new RegExp(`^\\s*${key}\\s*=\\s*"(#[0-9A-Fa-f]{6})"`, "m");
  return file.match(pattern)?.[1] ?? null;
}

function parseNeovimCursor() {
  const file = fs.readFileSync(path.join(root, "lua/karasu/highlights/editor.lua"), "utf8");
  return file.includes("Cursor") && file.includes("colors.cursor");
}

function parseLuaHighlightRoleMap(relPath) {
  const content = fs.readFileSync(path.join(root, relPath), "utf8");
  const result = {};
  const pattern = /utils\.hl\("([^"]+)",\s*\{[^}]*?fg\s*=\s*colors\.(role_[a-z_]+)/gms;
  let match = pattern.exec(content);
  while (match) {
    result[match[1]] = match[2];
    match = pattern.exec(content);
  }
  return result;
}

function tokenMapForVariant(variant, paletteMap) {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [key, resolveToken(value[variant], paletteMap)])
  );
}

function getAnsiHexMap(palette) {
  const order = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
  const map = {};
  order.forEach((name, idx) => {
    map[palette.ansi.normal[name]] = idx;
  });
  order.forEach((name, idx) => {
    map[palette.ansi.bright[name]] = idx + 8;
  });
  return map;
}

function expectedAnsiByIndex(palette) {
  const order = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
  const expected = {};
  order.forEach((name, idx) => {
    expected[idx] = palette.ansi.normal[name];
    expected[idx + 8] = palette.ansi.bright[name];
  });
  return expected;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

function rgbDistance(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

function nearestXtermIndex(hex) {
  const rgb = hexToRgb(hex);
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let i = 0; i < xtermColors.length; i += 1) {
    const distance = rgbDistance(rgb, xtermColors[i]);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = i;
    }
  }
  return bestIndex;
}

function ansiIndexForHex(hex, ansiHexMap) {
  if (ansiHexMap[hex] !== undefined) return ansiHexMap[hex];
  return nearestXtermIndex(hex);
}

function buildXtermColors() {
  const colors = [];
  const base = [
    [0, 0, 0],
    [205, 0, 0],
    [0, 205, 0],
    [205, 205, 0],
    [0, 0, 238],
    [205, 0, 205],
    [0, 205, 205],
    [229, 229, 229],
    [127, 127, 127],
    [255, 0, 0],
    [0, 255, 0],
    [255, 255, 0],
    [92, 92, 255],
    [255, 0, 255],
    [0, 255, 255],
    [255, 255, 255],
  ];
  colors.push(...base);
  const steps = [0, 95, 135, 175, 215, 255];
  for (let r = 0; r < 6; r += 1) {
    for (let g = 0; g < 6; g += 1) {
      for (let b = 0; b < 6; b += 1) {
        colors.push([steps[r], steps[g], steps[b]]);
      }
    }
  }
  for (let i = 0; i < 24; i += 1) {
    const level = 8 + i * 10;
    colors.push([level, level, level]);
  }
  return colors;
}

function assertNeovimHighlightMap(label, map, expectations) {
  Object.entries(expectations).forEach(([group, expectedRole]) => {
    assert(map[group], `${label} missing highlight mapping for ${group}`);
    assertEqual(`${label} ${group}`, map[group], expectedRole);
  });
}

function checkNeovimStaticMappings() {
  const treeSitterMap = parseLuaHighlightRoleMap("lua/karasu/highlights/treesitter.lua");
  assertNeovimHighlightMap("neovim treesitter", treeSitterMap, NEOVIM_TREE_SITTER_EXPECTATIONS);

  const syntaxMap = parseLuaHighlightRoleMap("lua/karasu/highlights/syntax.lua");
  assertNeovimHighlightMap("neovim syntax", syntaxMap, NEOVIM_SYNTAX_EXPECTATIONS);

  const lspMap = parseLuaHighlightRoleMap("lua/karasu/highlights/lsp.lua");
  assertNeovimHighlightMap("neovim lsp", lspMap, NEOVIM_LSP_EXPECTATIONS);
}

function checkNeovimVariant(variant, expected, canonicalRoles) {
  assertEqual(`neovim primary text (${variant})`, parseNeovimPaletteColor(variant, "fg0"), expected.primaryText);
  assertEqual(`neovim secondary text (${variant})`, parseNeovimPaletteColor(variant, "fg1"), expected.secondaryText);
  assertEqual(`neovim tertiary text (${variant})`, parseNeovimPaletteColor(variant, "fg2"), expected.tertiaryText);
  assertEqual(`neovim muted text (${variant})`, parseNeovimPaletteColor(variant, "fg3"), expected.mutedText);
  assertEqual(`neovim dim text (${variant})`, parseNeovimPaletteColor(variant, "fg_dim"), expected.dimText);

  Object.entries(canonicalRoles).forEach(([roleKey, roleValue]) => {
    assertEqual(`neovim ${roleKey} (${variant})`, parseNeovimPaletteColor(variant, roleKey), roleValue);
  });

  const neovimCursor = parseNeovimCursor();
  assert(neovimCursor, "neovim cursor highlight is not using the cursor token");
}

function checkGhostty(variant, expected, palette) {
  const ghostty = parseGhostty(`platforms/ghostty/karasu-${variant}`);
  assertEqual(`ghostty primary text (${variant})`, ghostty.values.foreground, expected.primaryText);
  assertEqual(`ghostty background (${variant})`, ghostty.values.background, expected.background);
  assertEqual(`ghostty cursor (${variant})`, ghostty.values["cursor-color"], expected.cursorHex);
  assertEqual(`ghostty selection bg (${variant})`, ghostty.values["selection-background"], expected.selectionBg);
  assertEqual(`ghostty selection fg (${variant})`, ghostty.values["selection-foreground"], expected.selectionFg);

  const ansiExpected = expectedAnsiByIndex(palette);
  Object.entries(ansiExpected).forEach(([idx, color]) => {
    assertEqual(`ghostty ansi ${idx} (${variant})`, ghostty.ansi[idx], color);
  });
}

function checkIterm2(variant, expected, palette) {
  const itermTheme = `platforms/iterm2/karasu-${variant}.itermcolors`;
  assertEqual(`iterm2 primary text (${variant})`, parseIterm2Color(itermTheme, "Foreground Color"), expected.primaryText);
  assertEqual(`iterm2 background (${variant})`, parseIterm2Color(itermTheme, "Background Color"), expected.background);
  assertEqual(`iterm2 cursor (${variant})`, parseIterm2Color(itermTheme, "Cursor Color"), expected.cursorHex);
  assertEqual(`iterm2 selection bg (${variant})`, parseIterm2Color(itermTheme, "Selection Color"), expected.selectionBg);
  assertEqual(`iterm2 selection fg (${variant})`, parseIterm2Color(itermTheme, "Selected Text Color"), expected.selectionFg);

  const ansiExpected = expectedAnsiByIndex(palette);
  Object.entries(ansiExpected).forEach(([idx, color]) => {
    assertEqual(`iterm2 ansi ${idx} (${variant})`, parseIterm2Color(itermTheme, `Ansi ${idx} Color`), color);
  });
}

function checkVSCode(variant, expected, tokenMap, palette) {
  const vscodeTheme = parseVSCodeTheme(`platforms/vscode/themes/karasu-${variant}-color-theme.json`);
  const colors = vscodeTheme.colors ?? {};

  assertEqual(`vscode theme foreground (${variant})`, colors.foreground, expected.primaryText);
  assertEqual(`vscode editor foreground (${variant})`, colors["editor.foreground"], expected.primaryText);
  assertEqual(`vscode sidebar foreground (${variant})`, colors["sideBar.foreground"], expected.secondaryText);
  assertEqual(`vscode editor line number (${variant})`, colors["editorLineNumber.foreground"], expected.mutedText);
  assertEqual(`vscode background (${variant})`, colors["editor.background"], expected.background);
  assertEqual(`vscode cursor (${variant})`, colors["editorCursor.foreground"], expected.cursorHex);
  assertEqual(`vscode selection bg (${variant})`, colors["editor.selectionBackground"], expected.selectionBg);
  assertEqual(`vscode selection fg (${variant})`, colors["editor.selectionForeground"], expected.selectionFg);

  const ansiExpected = expectedAnsiByIndex(palette);
  const terminalAnsiKeys = [
    "terminal.ansiBlack",
    "terminal.ansiRed",
    "terminal.ansiGreen",
    "terminal.ansiYellow",
    "terminal.ansiBlue",
    "terminal.ansiMagenta",
    "terminal.ansiCyan",
    "terminal.ansiWhite",
    "terminal.ansiBrightBlack",
    "terminal.ansiBrightRed",
    "terminal.ansiBrightGreen",
    "terminal.ansiBrightYellow",
    "terminal.ansiBrightBlue",
    "terminal.ansiBrightMagenta",
    "terminal.ansiBrightCyan",
    "terminal.ansiBrightWhite",
  ];

  const emittedTerminalAnsi = terminalAnsiKeys.filter((key) => colors[key] !== undefined);
  if (emittedTerminalAnsi.length > 0) {
    assert(
      emittedTerminalAnsi.length === terminalAnsiKeys.length,
      `vscode terminal ansi family incomplete (${variant}): expected ${terminalAnsiKeys.length} keys, got ${emittedTerminalAnsi.length}`
    );
    terminalAnsiKeys.forEach((key, idx) => {
      assertEqual(`vscode ${key} (${variant})`, colors[key], ansiExpected[idx]);
    });
  }

  const roleColor = (tokenKey) => tokenMap[tokenKey];
  const tokenRules = vscodeTheme.tokenColors ?? [];

  Object.entries(VSCODE_TOKEN_RULE_EXPECTATIONS).forEach(([ruleName, tokenKey]) => {
    const rule = tokenRules.find((entry) => entry.name === ruleName);
    assert(rule, `vscode tokenColors missing rule "${ruleName}" (${variant})`);
    const foreground = rule.settings?.foreground ?? null;
    assertEqual(`vscode tokenColors "${ruleName}" (${variant})`, foreground, roleColor(tokenKey));
  });

  const semantic = vscodeTheme.semanticTokenColors ?? {};
  Object.entries(VSCODE_SEMANTIC_EXPECTATIONS).forEach(([semanticKey, tokenKey]) => {
    assertEqual(
      `vscode semantic ${semanticKey} (${variant})`,
      semantic[semanticKey],
      roleColor(tokenKey)
    );
  });
}

function checkZed(variant, expected, tokenMap) {
  const zedTheme = parseZedTheme(`platforms/zed/themes/karasu-${variant}.json`);
  assertEqual(`zed primary text (${variant})`, zedTheme.style.text, expected.primaryText);
  assertEqual(`zed foreground (${variant})`, zedTheme.style.foreground, expected.primaryText);
  assertEqual(`zed editor foreground (${variant})`, zedTheme.style["editor.foreground"], expected.primaryText);
  assertEqual(`zed muted text (${variant})`, zedTheme.style["text.muted"], expected.mutedText);
  assertEqual(`zed cursor (${variant})`, zedTheme.players[0]?.cursor ?? null, expected.cursorHex);

  Object.entries(ZED_EXPECTED_SYNTAX_TOKEN).forEach(([scope, tokenKey]) => {
    const entry = zedTheme.syntax[scope];
    assert(entry, `zed syntax missing scope "${scope}" (${variant})`);
    assertEqual(`zed syntax ${scope} (${variant})`, entry.color, tokenMap[tokenKey]);
  });
}

function checkOpenCode(variant, expected, tokenMap, expectedCursorAnsi) {
  const openCodeTheme = parseOpenCodeTheme(`platforms/opencode/themes/karasu-${variant}.json`);
  assertEqual(`opencode primary text dark (${variant})`, parseOpenCodeRole(openCodeTheme, "text", "dark"), expected.primaryText);
  assertEqual(`opencode primary text light (${variant})`, parseOpenCodeRole(openCodeTheme, "text", "light"), expected.primaryText);
  assertEqual(`opencode muted text dark (${variant})`, parseOpenCodeRole(openCodeTheme, "textMuted", "dark"), tokenMap.syntaxComment);
  assertEqual(`opencode muted text light (${variant})`, parseOpenCodeRole(openCodeTheme, "textMuted", "light"), tokenMap.syntaxComment);

  Object.entries(OPENCODE_SYNTAX_ROLE_EXPECTATIONS).forEach(([role, tokenKey]) => {
    assertEqual(`opencode ${role} dark (${variant})`, parseOpenCodeRole(openCodeTheme, role, "dark"), tokenMap[tokenKey]);
    assertEqual(`opencode ${role} light (${variant})`, parseOpenCodeRole(openCodeTheme, role, "light"), tokenMap[tokenKey]);
  });

  const openCodeCursor = parseOpenCodeRole(openCodeTheme, "cursor", "dark");
  if (typeof openCodeCursor === "number") {
    assertEqual(`opencode cursor (${variant})`, openCodeCursor, expectedCursorAnsi);
  } else {
    assertEqual(`opencode cursor (${variant})`, openCodeCursor, expected.cursorHex);
  }
}

let obsidianSelectorsChecked = false;

function checkObsidian(variant, paletteMap, tokenMap) {
  const parsed = parseObsidianSnippet("platforms/obsidian/snippets/karasu-minimal.css");
  assert(!parsed.css.includes("{{"), "obsidian snippet contains unresolved template placeholders");

  if (!obsidianSelectorsChecked) {
    OBSIDIAN_REQUIRED_SELECTORS.forEach((selector) => {
      assert(parsed.css.includes(selector), `obsidian snippet missing selector fragment: ${selector}`);
    });
    obsidianSelectorsChecked = true;
  }

  const expectedVars = buildObsidianMinimalVariantVars({ variant, paletteMap, tokenMap });
  const vars = variant === "night" ? parsed.darkVars : parsed.lightVars;

  Object.entries(expectedVars).forEach(([key, expected]) => {
    const cssVarName = key.replaceAll("_", "-");
    assert(vars[cssVarName] !== undefined, `obsidian ${variant} missing CSS variable --${cssVarName}`);
    assertEqual(`obsidian --${cssVarName} (${variant})`, vars[cssVarName], expected);
  });
}

function checkVariant(variant) {
  const palette = palettes[variant];
  const paletteMap = flattenPalette(palette);
  const tokenMap = tokenMapForVariant(variant, paletteMap);
  const canonicalRoles = buildCanonicalRoles(tokenMap);
  const ansiHexMap = getAnsiHexMap(palette);

  const expected = {
    primaryText: paletteMap.karasuFg0,
    secondaryText: paletteMap.karasuFg1,
    tertiaryText: paletteMap.karasuFg2,
    mutedText: paletteMap.karasuFg3,
    dimText: paletteMap.karasuFgDim,
    background: paletteMap.karasuBg0,
    selectionBg: tokenMap.selectionBg,
    selectionFg: tokenMap.selectionFg,
    cursorHex: tokenMap.cursor,
  };
  const expectedCursorAnsi = ansiIndexForHex(expected.cursorHex, ansiHexMap);

  checkNeovimVariant(variant, expected, canonicalRoles);
  checkGhostty(variant, expected, palette);
  checkIterm2(variant, expected, palette);
  checkVSCode(variant, expected, tokenMap, palette);
  checkZed(variant, expected, tokenMap);
  checkOpenCode(variant, expected, tokenMap, expectedCursorAnsi);
  checkObsidian(variant, paletteMap, tokenMap);
}

try {
  checkNeovimStaticMappings();
  checkVariant("night");
  checkVariant("snow");
  console.log("Consistency checks passed (syntax roles + terminal ANSI + UI tokens + Obsidian snippet).");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
