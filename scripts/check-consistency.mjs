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
  return paletteMap[tokenValue];
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

function parseZedCursor(fileRel) {
  const theme = readJson(fileRel);
  const players = theme.themes?.[0]?.style?.players ?? [];
  return players[0]?.cursor ?? null;
}

function parseVSCodeCursor(fileRel) {
  const theme = readJson(fileRel);
  return theme.colors?.["editorCursor.foreground"] ?? null;
}

function parseVSCodeSelection(fileRel) {
  const theme = readJson(fileRel);
  return theme.colors?.["editor.selectionBackground"] ?? null;
}

function parseOpenCodeCursor(fileRel) {
  const theme = readJson(fileRel);
  const value = theme.theme?.cursor?.dark ?? theme.theme?.cursor?.light;
  if (typeof value === "string") {
    return theme.defs?.[value];
  }
  return value;
}

function parseNeovimCursor() {
  const file = fs.readFileSync(path.join(root, "lua/karasu/highlights/editor.lua"), "utf8");
  return file.includes("Cursor") && file.includes("bright_yellow");
}

function assertEqual(label, actual, expected) {
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
  const expectedCursorHex = tokenMap.cursor;
  const expectedSelectionHex = tokenMap.selectionBg;
  const expectedCursorAnsi = ansiIndexForHex(expectedCursorHex, ansiHexMap);

  const ghostty = parseGhostty(`platforms/ghostty/karasu-${variant}`);
  assertEqual(`ghostty cursor (${variant})`, ghostty["cursor-color"], expectedCursorHex);
  assertEqual(`ghostty selection (${variant})`, ghostty["selection-background"], expectedSelectionHex);

  const itermCursor = parseIterm2Color(`platforms/iterm2/karasu-${variant}.itermcolors`, "Cursor Color");
  const itermSelection = parseIterm2Color(`platforms/iterm2/karasu-${variant}.itermcolors`, "Selection Color");
  assertEqual(`iterm2 cursor (${variant})`, itermCursor, expectedCursorHex);
  assertEqual(`iterm2 selection (${variant})`, itermSelection, expectedSelectionHex);

  const zedCursor = parseZedCursor(`platforms/zed/themes/karasu-${variant}.json`);
  assertEqual(`zed cursor (${variant})`, zedCursor, expectedCursorHex);

  const vscodeCursor = parseVSCodeCursor(`platforms/vscode/themes/karasu-${variant}-color-theme.json`);
  const vscodeSelection = parseVSCodeSelection(`platforms/vscode/themes/karasu-${variant}-color-theme.json`);
  assertEqual(`vscode cursor (${variant})`, vscodeCursor, expectedCursorHex);
  assertEqual(`vscode selection (${variant})`, vscodeSelection, expectedSelectionHex);

  const opencodeCursor = parseOpenCodeCursor(`platforms/opencode/themes/karasu-${variant}.json`);
  if (typeof opencodeCursor === "number") {
    assertEqual(`opencode cursor (${variant})`, opencodeCursor, expectedCursorAnsi);
  } else {
    assertEqual(`opencode cursor (${variant})`, opencodeCursor, expectedCursorHex);
  }

  const neovimCursor = parseNeovimCursor();
  if (!neovimCursor) {
    throw new Error("neovim cursor highlight is not using bright_yellow");
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
