import fs from "fs";
import path from "path";

const root = process.cwd();

const palettes = {
  night: readJson("palette/night.json"),
  snow: readJson("palette/snow.json"),
};
const tokens = readJson("palette/tokens.json");

const xtermColors = buildXtermColors();

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
  if (!resolved) {
    throw new Error(`Unknown palette token: ${tokenValue}`);
  }
  return resolved;
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

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
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

function parseGhostty(pathRel) {
  const content = fs.readFileSync(path.join(root, pathRel), "utf8");
  const map = {};
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [key, value] = trimmed.split("=").map((part) => part.trim());
    if (!key || !value) return;
    map[key] = value;
  });
  return map;
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
    players: theme.themes?.[0]?.style?.players ?? [],
  };
}

function parseVSCodeColor(fileRel, colorKey) {
  const theme = readJson(fileRel);
  return theme.colors?.[colorKey] ?? null;
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

function parseNeovimPaletteColor(variant, key) {
  const file = fs.readFileSync(path.join(root, `lua/karasu/palette/${variant}.lua`), "utf8");
  const pattern = new RegExp(`^\\s*${key}\\s*=\\s*"(#[0-9A-Fa-f]{6})"`, "m");
  return file.match(pattern)?.[1] ?? null;
}

function parseNeovimCursor() {
  const file = fs.readFileSync(path.join(root, "lua/karasu/highlights/editor.lua"), "utf8");
  return file.includes("Cursor") && file.includes("colors.cursor");
}

function assertEqual(label, actual, expected) {
  if (
    typeof actual === "string" &&
    typeof expected === "string" &&
    actual.startsWith("#") &&
    expected.startsWith("#")
  ) {
    actual = actual.toLowerCase();
    expected = expected.toLowerCase();
  }
  if (actual !== expected) {
    throw new Error(`${label} mismatch: expected ${expected}, got ${actual}`);
  }
}

function checkVariant(variant) {
  const palette = palettes[variant];
  const paletteMap = flattenPalette(palette);
  const tokenMap = Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [key, resolveToken(value[variant], paletteMap)])
  );
  const ansiHexMap = getAnsiHexMap(palette);
  const expected = {
    primaryText: paletteMap.karasuFg0,
    secondaryText: paletteMap.karasuFg1,
    tertiaryText: paletteMap.karasuFg2,
    mutedText: paletteMap.karasuFg3,
    dimText: paletteMap.karasuFgDim,
    commentText: tokenMap.syntaxComment,
    background: paletteMap.karasuBg0,
    selectionBg: tokenMap.selectionBg,
    selectionFg: tokenMap.selectionFg,
    cursorHex: tokenMap.cursor,
  };
  const expectedCursorAnsi = ansiIndexForHex(expected.cursorHex, ansiHexMap);

  assertEqual(
    `neovim primary text (${variant})`,
    parseNeovimPaletteColor(variant, "fg0"),
    expected.primaryText
  );
  assertEqual(
    `neovim secondary text (${variant})`,
    parseNeovimPaletteColor(variant, "fg1"),
    expected.secondaryText
  );
  assertEqual(
    `neovim tertiary text (${variant})`,
    parseNeovimPaletteColor(variant, "fg2"),
    expected.tertiaryText
  );
  assertEqual(
    `neovim muted text (${variant})`,
    parseNeovimPaletteColor(variant, "fg3"),
    expected.mutedText
  );
  assertEqual(
    `neovim dim text (${variant})`,
    parseNeovimPaletteColor(variant, "fg_dim"),
    expected.dimText
  );

  const ghostty = parseGhostty(`platforms/ghostty/karasu-${variant}`);
  assertEqual(`ghostty primary text (${variant})`, ghostty.foreground, expected.primaryText);
  assertEqual(`ghostty background (${variant})`, ghostty.background, expected.background);
  assertEqual(`ghostty cursor (${variant})`, ghostty["cursor-color"], expected.cursorHex);
  assertEqual(`ghostty selection bg (${variant})`, ghostty["selection-background"], expected.selectionBg);
  assertEqual(`ghostty selection fg (${variant})`, ghostty["selection-foreground"], expected.selectionFg);

  const itermTheme = `platforms/iterm2/karasu-${variant}.itermcolors`;
  assertEqual(
    `iterm2 primary text (${variant})`,
    parseIterm2Color(itermTheme, "Foreground Color"),
    expected.primaryText
  );
  assertEqual(
    `iterm2 background (${variant})`,
    parseIterm2Color(itermTheme, "Background Color"),
    expected.background
  );
  assertEqual(`iterm2 cursor (${variant})`, parseIterm2Color(itermTheme, "Cursor Color"), expected.cursorHex);
  assertEqual(
    `iterm2 selection bg (${variant})`,
    parseIterm2Color(itermTheme, "Selection Color"),
    expected.selectionBg
  );
  assertEqual(
    `iterm2 selection fg (${variant})`,
    parseIterm2Color(itermTheme, "Selected Text Color"),
    expected.selectionFg
  );

  const vscodeTheme = `platforms/vscode/themes/karasu-${variant}-color-theme.json`;
  assertEqual(
    `vscode theme foreground (${variant})`,
    parseVSCodeColor(vscodeTheme, "foreground"),
    expected.primaryText
  );
  assertEqual(
    `vscode editor foreground (${variant})`,
    parseVSCodeColor(vscodeTheme, "editor.foreground"),
    expected.primaryText
  );
  assertEqual(
    `cursor editor foreground (${variant})`,
    parseVSCodeColor(vscodeTheme, "editor.foreground"),
    expected.primaryText
  );
  assertEqual(
    `vscode sidebar foreground (${variant})`,
    parseVSCodeColor(vscodeTheme, "sideBar.foreground"),
    expected.secondaryText
  );
  assertEqual(
    `vscode editor line number (${variant})`,
    parseVSCodeColor(vscodeTheme, "editorLineNumber.foreground"),
    expected.mutedText
  );
  assertEqual(
    `vscode background (${variant})`,
    parseVSCodeColor(vscodeTheme, "editor.background"),
    expected.background
  );
  assertEqual(
    `vscode cursor (${variant})`,
    parseVSCodeColor(vscodeTheme, "editorCursor.foreground"),
    expected.cursorHex
  );
  assertEqual(
    `vscode selection bg (${variant})`,
    parseVSCodeColor(vscodeTheme, "editor.selectionBackground"),
    expected.selectionBg
  );
  assertEqual(
    `vscode selection fg (${variant})`,
    parseVSCodeColor(vscodeTheme, "editor.selectionForeground"),
    expected.selectionFg
  );

  const zedTheme = parseZedTheme(`platforms/zed/themes/karasu-${variant}.json`);
  assertEqual(`zed primary text (${variant})`, zedTheme.style.text, expected.primaryText);
  assertEqual(`zed foreground (${variant})`, zedTheme.style.foreground, expected.primaryText);
  assertEqual(
    `zed editor foreground (${variant})`,
    zedTheme.style["editor.foreground"],
    expected.primaryText
  );
  assertEqual(`zed muted text (${variant})`, zedTheme.style["text.muted"], expected.mutedText);
  assertEqual(`zed cursor (${variant})`, zedTheme.players[0]?.cursor ?? null, expected.cursorHex);

  const openCodeTheme = parseOpenCodeTheme(`platforms/opencode/themes/karasu-${variant}.json`);
  assertEqual(
    `opencode primary text dark (${variant})`,
    parseOpenCodeRole(openCodeTheme, "text", "dark"),
    expected.primaryText
  );
  assertEqual(
    `opencode primary text light (${variant})`,
    parseOpenCodeRole(openCodeTheme, "text", "light"),
    expected.primaryText
  );
  assertEqual(
    `opencode muted text dark (${variant})`,
    parseOpenCodeRole(openCodeTheme, "textMuted", "dark"),
    expected.commentText
  );
  assertEqual(
    `opencode muted text light (${variant})`,
    parseOpenCodeRole(openCodeTheme, "textMuted", "light"),
    expected.commentText
  );

  const openCodeCursor = parseOpenCodeRole(openCodeTheme, "cursor", "dark");
  if (typeof openCodeCursor === "number") {
    assertEqual(`opencode cursor (${variant})`, openCodeCursor, expectedCursorAnsi);
  } else {
    assertEqual(`opencode cursor (${variant})`, openCodeCursor, expected.cursorHex);
  }

  const neovimCursor = parseNeovimCursor();
  if (!neovimCursor) {
    throw new Error("neovim cursor highlight is not using the cursor token");
  }
}

try {
  checkVariant("night");
  checkVariant("snow");
  console.log("Consistency checks passed.");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
