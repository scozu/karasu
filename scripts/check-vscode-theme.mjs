import fs from "fs";
import path from "path";

const root = process.cwd();

const requiredFamilies = [
  "activityBarBadge",
  "badge",
  "banner",
  "button",
  "checkbox",
  "debugToolBar",
  "descriptionForeground",
  "dropdown",
  "input",
  "list",
  "menu",
  "menubar",
  "panel",
  "panelSectionHeader",
  "peekView",
  "scrollbar",
  "settings",
  "statusBarItem",
  "editorGroupHeader",
  "editorGutter",
  "editorHoverWidget",
  "editorSuggestWidget",
  "editorOverviewRuler",
  "editorRuler",
  "editorWhitespace",
  "editorBracketHighlight",
  "editorBracketMatch",
  "editorBracketPairGuide",
  "minimapGutter",
  "sideBarSectionHeader",
  "titleBar",
  "toolbar",
  "window",
  "diffEditor",
  "gitDecoration",
  "textLink",
  "textBlockQuote",
  "textPreformat",
];

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), "utf8"));
}

function hasFamilyKey(colors, family) {
  return Object.keys(colors).some((key) => key === family || key.startsWith(`${family}.`));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isHexColor(value) {
  return /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value);
}

function assertResolvedColor(value, label) {
  assert(typeof value === "string", `${label} must be a string, got ${typeof value}`);
  assert(!/^karasu[A-Z]/.test(value), `${label} has unresolved palette reference: ${value}`);
  assert(isHexColor(value), `${label} must be a hex color, got ${value}`);
}

function checkVariant(variant) {
  const theme = readJson(`platforms/vscode/themes/karasu-${variant}-color-theme.json`);
  const colorCount = Object.keys(theme.colors || {}).length;
  const tokenCount = Array.isArray(theme.tokenColors) ? theme.tokenColors.length : 0;
  const semanticCount = Object.keys(theme.semanticTokenColors || {}).length;

  assert(theme.semanticHighlighting === true, `karasu-${variant}: semanticHighlighting must be true`);
  assert(colorCount >= 160 && colorCount <= 200, `karasu-${variant}: expected 160-200 color keys, got ${colorCount}`);
  assert(tokenCount >= 70, `karasu-${variant}: expected at least 70 token rules, got ${tokenCount}`);
  assert(semanticCount >= 12, `karasu-${variant}: expected at least 12 semantic token entries, got ${semanticCount}`);

  for (const family of requiredFamilies) {
    assert(
      hasFamilyKey(theme.colors, family),
      `karasu-${variant}: missing required color family ${family}`
    );
  }

  for (const [key, value] of Object.entries(theme.colors)) {
    assertResolvedColor(value, `karasu-${variant} colors.${key}`);
  }

  for (const [key, value] of Object.entries(theme.semanticTokenColors || {})) {
    if (typeof value === "string") {
      assertResolvedColor(value, `karasu-${variant} semanticTokenColors.${key}`);
    }
  }

  for (const [index, rule] of (theme.tokenColors || []).entries()) {
    const settings = rule.settings || {};
    if (settings.foreground !== undefined) {
      assertResolvedColor(settings.foreground, `karasu-${variant} tokenColors[${index}].foreground`);
    }
    if (settings.background !== undefined) {
      assertResolvedColor(settings.background, `karasu-${variant} tokenColors[${index}].background`);
    }
  }

  return {
    variant,
    colorCount,
    tokenCount,
    semanticCount,
  };
}

try {
  const night = checkVariant("night");
  const snow = checkVariant("snow");
  console.log(
    `VS Code theme checks passed. night(colors=${night.colorCount}, tokenColors=${night.tokenCount}, semantic=${night.semanticCount}) snow(colors=${snow.colorCount}, tokenColors=${snow.tokenCount}, semantic=${snow.semanticCount})`
  );
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
