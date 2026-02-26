import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function withAlpha(hex, alpha) {
  if (typeof hex !== "string" || !hex.startsWith("#") || hex.length !== 7) return hex;
  return `${hex}${alpha}`;
}

function hexToRgbCsv(hex) {
  const clean = hex.replace("#", "");
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

function renderTemplate(template, templateMap) {
  return template.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    const value = templateMap[key];
    if (value === undefined) {
      throw new Error(`Unknown template key: ${key}`);
    }
    return value;
  });
}

function prefixed(map, prefix) {
  return Object.fromEntries(Object.entries(map).map(([key, value]) => [`${prefix}${key}`, value]));
}

export function buildObsidianMinimalVariantVars({ variant, paletteMap, tokenMap }) {
  const linkColor = tokenMap.syntaxLink;
  const linkHover = paletteMap.karasuBrightBlue;
  const externalLinkColor = paletteMap.karasuAqua;
  const externalLinkHover = paletteMap.karasuBrightCyan;
  const colorPink = paletteMap.karasuBrightMagenta;

  return {
    bg1: paletteMap.karasuBg0,
    bg2: paletteMap.karasuBg1,
    bg3: withAlpha(tokenMap.selectionBg, "66"),
    ui1: paletteMap.karasuBg3,
    ui2: paletteMap.karasuBg4,
    ui3: tokenMap.syntaxProperty,
    tx1: paletteMap.karasuFg0,
    tx2: paletteMap.karasuFg1,
    tx3: paletteMap.karasuFg3,
    hl1: withAlpha(tokenMap.selectionBg, "99"),
    hl2: withAlpha(paletteMap.karasuYellow, variant === "night" ? "66" : "59"),
    sp1: "#FFFFFF",
    ax1: paletteMap.karasuBlue,
    ax2: paletteMap.karasuBrightBlue,
    ax3: paletteMap.karasuAqua,
    color_red: paletteMap.karasuRed,
    color_orange: paletteMap.karasuOrange,
    color_yellow: paletteMap.karasuYellow,
    color_green: paletteMap.karasuGreen,
    color_cyan: paletteMap.karasuAqua,
    color_blue: paletteMap.karasuBlue,
    color_purple: paletteMap.karasuPurple,
    color_pink: colorPink,
    color_red_rgb: hexToRgbCsv(paletteMap.karasuRed),
    color_orange_rgb: hexToRgbCsv(paletteMap.karasuOrange),
    color_yellow_rgb: hexToRgbCsv(paletteMap.karasuYellow),
    color_green_rgb: hexToRgbCsv(paletteMap.karasuGreen),
    color_cyan_rgb: hexToRgbCsv(paletteMap.karasuAqua),
    color_blue_rgb: hexToRgbCsv(paletteMap.karasuBlue),
    color_purple_rgb: hexToRgbCsv(paletteMap.karasuPurple),
    color_pink_rgb: hexToRgbCsv(colorPink),
    code_background: paletteMap.karasuBg1,
    code_normal: paletteMap.karasuFg0,
    code_comment: tokenMap.syntaxComment,
    code_function: tokenMap.syntaxFunction,
    code_keyword: tokenMap.syntaxKeyword,
    code_important: tokenMap.diagError,
    code_operator: tokenMap.syntaxOperator,
    code_property: tokenMap.syntaxProperty,
    code_punctuation: tokenMap.syntaxPunctuation,
    code_string: tokenMap.syntaxString,
    code_tag: tokenMap.syntaxKeyword,
    code_value: tokenMap.syntaxNumber,
    link_color: linkColor,
    link_color_hover: linkHover,
    link_external_color: externalLinkColor,
    link_external_color_hover: externalLinkHover,
  };
}

export function buildObsidianMinimalSnippet({
  nightPaletteMap,
  nightTokenMap,
  snowPaletteMap,
  snowTokenMap,
}) {
  const templatePath = path.join(__dirname, "templates", "karasu-minimal.css");
  const template = fs.readFileSync(templatePath, "utf8");

  const nightVars = buildObsidianMinimalVariantVars({
    variant: "night",
    paletteMap: nightPaletteMap,
    tokenMap: nightTokenMap,
  });
  const snowVars = buildObsidianMinimalVariantVars({
    variant: "snow",
    paletteMap: snowPaletteMap,
    tokenMap: snowTokenMap,
  });

  const rendered = renderTemplate(template, {
    ...prefixed(nightVars, "night_"),
    ...prefixed(snowVars, "snow_"),
  });

  return `${rendered.trimEnd()}\n`;
}
