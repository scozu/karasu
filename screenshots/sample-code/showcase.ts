/* Screenshot fixture: open this same file in Neovim and Zed. */
/* It intentionally mixes many syntax roles for broad theme coverage. */

type ThemeMode = "night" | "snow";
type Hex = `#${string}`;

interface PaletteRole {
  readonly id: string;
  readonly label: string;
  readonly hex: Hex;
  readonly weight?: number;
}

interface ThemeConfig {
  mode: ThemeMode;
  background: Hex;
  foreground: Hex;
  roles: PaletteRole[];
  flags: {
    readonly transparent: boolean;
    readonly strict: boolean;
  };
}

enum Level {
  Info = "info",
  Warn = "warn",
  Error = "error",
}

const defaults: Readonly<ThemeConfig> = {
  mode: "night",
  background: "#121212",
  foreground: "#d4c5b9",
  roles: [
    { id: "keyword", label: "Keyword", hex: "#a987a8", weight: 700 },
    { id: "string", label: "String", hex: "#95b572" },
    { id: "function", label: "Function", hex: "#7c9fa8" },
    { id: "number", label: "Number", hex: "#c4a657" },
    { id: "error", label: "Error", hex: "#c4746e", weight: 800 },
  ],
  flags: {
    transparent: false,
    strict: true,
  },
};

const roleMap = new Map<string, PaletteRole>(defaults.roles.map((r) => [r.id, r]));
const ansi = [0, 1, 2, 3, 4, 5, 6, 7] as const;
const regex = /^(?<key>[a-z-]+)=(?<value>#[0-9a-fA-F]{6})$/;
const big = 9_007_199_254_740_991n;
const maybeNote: string | null = null;

class ThemeEngine {
  #active: ThemeConfig;

  constructor(base: ThemeConfig) {
    this.#active = { ...base, roles: [...base.roles] };
  }

  public setMode(mode: ThemeMode): this {
    this.#active.mode = mode;
    return this;
  }

  public upsertRole(role: PaletteRole): void {
    const index = this.#active.roles.findIndex((item) => item.id === role.id);
    if (index >= 0) this.#active.roles[index] = role;
    else this.#active.roles.push(role);
  }

  public summarize(): string {
    const missing = this.#active.roles.filter((role) => !regex.test(`${role.id}=${role.hex}`));
    const problem = missing.length > 0 ? `invalid=${missing.length}` : "ok";
    return `${this.#active.mode}:${this.#active.foreground}->${this.#active.background} (${problem})`;
  }

  public get config(): ThemeConfig {
    return this.#active;
  }
}

function pick<T>(value: T | undefined, fallback: T): T {
  return value ?? fallback;
}

function formatRole(role: PaletteRole): string {
  const weight = role.weight?.toString() ?? "normal";
  return `${role.id.padEnd(9)} ${role.hex} ${weight}`;
}

async function renderPreview(config: ThemeConfig): Promise<string[]> {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  await wait(5);

  const header = `mode=${config.mode} bg=${config.background} fg=${config.foreground}`;
  const lines = config.roles.map(formatRole);
  return [header, ...lines];
}

function log(level: Level, message: string, meta: Record<string, unknown> = {}): void {
  const stamp = new Date().toISOString();
  const payload = { level, stamp, message, meta };
  const out = level === Level.Error ? console.error : level === Level.Warn ? console.warn : console.info;
  out(payload);
}

async function main(): Promise<void> {
  const engine = new ThemeEngine({ ...defaults, mode: "snow", foreground: "#3c3836" })
    .setMode("night");

  engine.upsertRole({ id: "operator", label: "Operator", hex: "#d6936b" });

  const selected = pick(roleMap.get("keyword"), defaults.roles[0]);
  const note = maybeNote ?? "fallback note";
  const tuple: [string, number, boolean] = [selected.id, ansi.length, defaults.flags.strict];
  const [name, count, strict] = tuple;

  const lines = await renderPreview(engine.config);
  lines.forEach((line, idx) => {
    const n = idx + 1;
    console.log(`${n.toString().padStart(2, "0")} | ${line}`);
  });

  for (const entry of defaults.roles) {
    if (!entry.hex.startsWith("#")) throw new Error(`bad hex: ${entry.id}`);
  }

  switch (strict) {
    case true:
      log(Level.Info, `strict mode for ${name}`, { count, summary: engine.summarize(), big });
      break;
    default:
      log(Level.Warn, "strict mode disabled", { count, note });
      break;
  }

  try {
    JSON.parse("{\"ok\":true}");
  } catch (error) {
    log(Level.Error, "parse failed", { error });
  } finally {
    const done = `done:${engine.config.mode}`.toUpperCase();
    console.log(done);
  }
}

void main();

