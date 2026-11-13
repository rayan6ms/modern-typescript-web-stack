#!/usr/bin/env node

// installer:cli.ts
import { homedir as homedir2 } from "node:os";
import { dirname as dirname3, join as join3, resolve as resolve4 } from "node:path";
import { fileURLToPath } from "node:url";

// installer:vendor/prompts.mjs
import { createRequire } from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toESMCache_node;
var __toESMCache_esm;
var __toESM = (mod, isNodeMode, target) => {
  var canCache = mod != null && typeof mod === "object";
  if (canCache) {
    var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
    var cached = cache.get(mod);
    if (cached)
      return cached;
  }
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  if (mod && typeof mod === "object" || typeof mod === "function") {
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: __accessProp.bind(mod, key),
          enumerable: true
        });
  }
  if (canCache)
    cache.set(mod, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ createRequire(import.meta.url);
var require_kleur = __commonJS(function(exports, module) {
  var { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;
  var $ = {
    enabled: !NODE_DISABLE_COLORS && TERM !== "dumb" && FORCE_COLOR !== "0",
    reset: init(0, 0),
    bold: init(1, 22),
    dim: init(2, 22),
    italic: init(3, 23),
    underline: init(4, 24),
    inverse: init(7, 27),
    hidden: init(8, 28),
    strikethrough: init(9, 29),
    black: init(30, 39),
    red: init(31, 39),
    green: init(32, 39),
    yellow: init(33, 39),
    blue: init(34, 39),
    magenta: init(35, 39),
    cyan: init(36, 39),
    white: init(37, 39),
    gray: init(90, 39),
    grey: init(90, 39),
    bgBlack: init(40, 49),
    bgRed: init(41, 49),
    bgGreen: init(42, 49),
    bgYellow: init(43, 49),
    bgBlue: init(44, 49),
    bgMagenta: init(45, 49),
    bgCyan: init(46, 49),
    bgWhite: init(47, 49)
  };
  function run(arr, str) {
    let i = 0, tmp, beg = "", end = "";
    for (;i < arr.length; i++) {
      tmp = arr[i];
      beg += tmp.open;
      end += tmp.close;
      if (str.includes(tmp.close)) {
        str = str.replace(tmp.rgx, tmp.close + tmp.open);
      }
    }
    return beg + str + end;
  }
  function chain(has, keys) {
    let ctx = { has, keys };
    ctx.reset = $.reset.bind(ctx);
    ctx.bold = $.bold.bind(ctx);
    ctx.dim = $.dim.bind(ctx);
    ctx.italic = $.italic.bind(ctx);
    ctx.underline = $.underline.bind(ctx);
    ctx.inverse = $.inverse.bind(ctx);
    ctx.hidden = $.hidden.bind(ctx);
    ctx.strikethrough = $.strikethrough.bind(ctx);
    ctx.black = $.black.bind(ctx);
    ctx.red = $.red.bind(ctx);
    ctx.green = $.green.bind(ctx);
    ctx.yellow = $.yellow.bind(ctx);
    ctx.blue = $.blue.bind(ctx);
    ctx.magenta = $.magenta.bind(ctx);
    ctx.cyan = $.cyan.bind(ctx);
    ctx.white = $.white.bind(ctx);
    ctx.gray = $.gray.bind(ctx);
    ctx.grey = $.grey.bind(ctx);
    ctx.bgBlack = $.bgBlack.bind(ctx);
    ctx.bgRed = $.bgRed.bind(ctx);
    ctx.bgGreen = $.bgGreen.bind(ctx);
    ctx.bgYellow = $.bgYellow.bind(ctx);
    ctx.bgBlue = $.bgBlue.bind(ctx);
    ctx.bgMagenta = $.bgMagenta.bind(ctx);
    ctx.bgCyan = $.bgCyan.bind(ctx);
    ctx.bgWhite = $.bgWhite.bind(ctx);
    return ctx;
  }
  function init(open, close) {
    let blk = {
      open: `\x1B[${open}m`,
      close: `\x1B[${close}m`,
      rgx: new RegExp(`\\x1b\\[${close}m`, "g")
    };
    return function(txt) {
      if (this !== undefined && this.has !== undefined) {
        this.has.includes(open) || (this.has.push(open), this.keys.push(blk));
        return txt === undefined ? this : $.enabled ? run(this.keys, txt + "") : txt + "";
      }
      return txt === undefined ? chain([open], [blk]) : $.enabled ? run([blk], txt + "") : txt + "";
    };
  }
  module.exports = $;
});
var require_action = __commonJS(function(exports, module) {
  module.exports = (key, isSelect) => {
    if (key.meta && key.name !== "escape")
      return;
    if (key.ctrl) {
      if (key.name === "a")
        return "first";
      if (key.name === "c")
        return "abort";
      if (key.name === "d")
        return "abort";
      if (key.name === "e")
        return "last";
      if (key.name === "g")
        return "reset";
    }
    if (isSelect) {
      if (key.name === "j")
        return "down";
      if (key.name === "k")
        return "up";
    }
    if (key.name === "return")
      return "submit";
    if (key.name === "enter")
      return "submit";
    if (key.name === "backspace")
      return "delete";
    if (key.name === "delete")
      return "deleteForward";
    if (key.name === "abort")
      return "abort";
    if (key.name === "escape")
      return "exit";
    if (key.name === "tab")
      return "next";
    if (key.name === "pagedown")
      return "nextPage";
    if (key.name === "pageup")
      return "prevPage";
    if (key.name === "home")
      return "home";
    if (key.name === "end")
      return "end";
    if (key.name === "up")
      return "up";
    if (key.name === "down")
      return "down";
    if (key.name === "right")
      return "right";
    if (key.name === "left")
      return "left";
    return false;
  };
});
var require_strip = __commonJS(function(exports, module) {
  module.exports = (str) => {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
    ].join("|");
    const RGX = new RegExp(pattern, "g");
    return typeof str === "string" ? str.replace(RGX, "") : str;
  };
});
var require_src = __commonJS(function(exports, module) {
  var ESC = "\x1B";
  var CSI = `${ESC}[`;
  var beep = "\x07";
  var cursor = {
    to(x, y) {
      if (!y)
        return `${CSI}${x + 1}G`;
      return `${CSI}${y + 1};${x + 1}H`;
    },
    move(x, y) {
      let ret = "";
      if (x < 0)
        ret += `${CSI}${-x}D`;
      else if (x > 0)
        ret += `${CSI}${x}C`;
      if (y < 0)
        ret += `${CSI}${-y}A`;
      else if (y > 0)
        ret += `${CSI}${y}B`;
      return ret;
    },
    up: (count = 1) => `${CSI}${count}A`,
    down: (count = 1) => `${CSI}${count}B`,
    forward: (count = 1) => `${CSI}${count}C`,
    backward: (count = 1) => `${CSI}${count}D`,
    nextLine: (count = 1) => `${CSI}E`.repeat(count),
    prevLine: (count = 1) => `${CSI}F`.repeat(count),
    left: `${CSI}G`,
    hide: `${CSI}?25l`,
    show: `${CSI}?25h`,
    save: `${ESC}7`,
    restore: `${ESC}8`
  };
  var scroll = {
    up: (count = 1) => `${CSI}S`.repeat(count),
    down: (count = 1) => `${CSI}T`.repeat(count)
  };
  var erase = {
    screen: `${CSI}2J`,
    up: (count = 1) => `${CSI}1J`.repeat(count),
    down: (count = 1) => `${CSI}J`.repeat(count),
    line: `${CSI}2K`,
    lineEnd: `${CSI}K`,
    lineStart: `${CSI}1K`,
    lines(count) {
      let clear = "";
      for (let i = 0;i < count; i++)
        clear += this.line + (i < count - 1 ? cursor.up() : "");
      if (count)
        clear += cursor.left;
      return clear;
    }
  };
  module.exports = { cursor, scroll, erase, beep };
});
var require_clear = __commonJS(function(exports, module) {
  var strip = require_strip();
  var { erase, cursor } = require_src();
  var width = (str) => [...strip(str)].length;
  module.exports = function(prompt, perLine) {
    if (!perLine)
      return erase.line + cursor.to(0);
    let rows = 0;
    const lines = prompt.split(/\r?\n/);
    for (let line of lines) {
      rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
    }
    return erase.lines(rows);
  };
});
var require_figures = __commonJS(function(exports, module) {
  var main = {
    arrowUp: "↑",
    arrowDown: "↓",
    arrowLeft: "←",
    arrowRight: "→",
    radioOn: "◉",
    radioOff: "◯",
    tick: "✔",
    cross: "✖",
    ellipsis: "…",
    pointerSmall: "›",
    line: "─",
    pointer: "❯"
  };
  var win = {
    arrowUp: main.arrowUp,
    arrowDown: main.arrowDown,
    arrowLeft: main.arrowLeft,
    arrowRight: main.arrowRight,
    radioOn: "(*)",
    radioOff: "( )",
    tick: "√",
    cross: "×",
    ellipsis: "...",
    pointerSmall: "»",
    line: "─",
    pointer: ">"
  };
  var figures = process.platform === "win32" ? win : main;
  module.exports = figures;
});
var require_style = __commonJS(function(exports, module) {
  var c = require_kleur();
  var figures = require_figures();
  var styles = Object.freeze({
    password: { scale: 1, render: (input) => "*".repeat(input.length) },
    emoji: { scale: 2, render: (input) => "\uD83D\uDE03".repeat(input.length) },
    invisible: { scale: 0, render: (input) => "" },
    default: { scale: 1, render: (input) => `${input}` }
  });
  var render = (type) => styles[type] || styles.default;
  var symbols = Object.freeze({
    aborted: c.red(figures.cross),
    done: c.green(figures.tick),
    exited: c.yellow(figures.cross),
    default: c.cyan("?")
  });
  var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
  var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
  var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
  module.exports = {
    styles,
    render,
    symbols,
    symbol,
    delimiter,
    item
  };
});
var require_lines = __commonJS(function(exports, module) {
  var strip = require_strip();
  module.exports = function(msg, perLine) {
    let lines = String(strip(msg) || "").split(/\r?\n/);
    if (!perLine)
      return lines.length;
    return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
  };
});
var require_wrap = __commonJS(function(exports, module) {
  module.exports = (msg, opts = {}) => {
    const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
    const width = opts.width;
    return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
      if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
        arr[arr.length - 1] += ` ${w}`;
      else
        arr.push(`${tab}${w}`);
      return arr;
    }, [tab]).join(`
`)).join(`
`);
  };
});
var require_entriesToDisplay = __commonJS(function(exports, module) {
  module.exports = (cursor, total, maxVisible) => {
    maxVisible = maxVisible || total;
    let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
    if (startIndex < 0)
      startIndex = 0;
    let endIndex = Math.min(startIndex + maxVisible, total);
    return { startIndex, endIndex };
  };
});
var require_util = __commonJS(function(exports, module) {
  module.exports = {
    action: require_action(),
    clear: require_clear(),
    style: require_style(),
    strip: require_strip(),
    figures: require_figures(),
    lines: require_lines(),
    wrap: require_wrap(),
    entriesToDisplay: require_entriesToDisplay()
  };
});
var require_prompt = __commonJS(function(exports, module) {
  var readline = __require("readline");
  var { action } = require_util();
  var EventEmitter = __require("events");
  var { beep, cursor } = require_src();
  var color = require_kleur();

  class Prompt extends EventEmitter {
    constructor(opts = {}) {
      super();
      this.firstRender = true;
      this.in = opts.stdin || process.stdin;
      this.out = opts.stdout || process.stdout;
      this.onRender = (opts.onRender || (() => {
        return;
      })).bind(this);
      const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
      readline.emitKeypressEvents(this.in, rl);
      if (this.in.isTTY)
        this.in.setRawMode(true);
      const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
      const keypress = (str, key) => {
        let a = action(key, isSelect);
        if (a === false) {
          this._ && this._(str, key);
        } else if (typeof this[a] === "function") {
          this[a](key);
        } else {
          this.bell();
        }
      };
      this.close = () => {
        this.out.write(cursor.show);
        this.in.removeListener("keypress", keypress);
        if (this.in.isTTY)
          this.in.setRawMode(false);
        rl.close();
        this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
        this.closed = true;
      };
      this.in.on("keypress", keypress);
    }
    fire() {
      this.emit("state", {
        value: this.value,
        aborted: !!this.aborted,
        exited: !!this.exited
      });
    }
    bell() {
      this.out.write(beep);
    }
    render() {
      this.onRender(color);
      if (this.firstRender)
        this.firstRender = false;
    }
  }
  module.exports = Prompt;
});
var require_confirm = __commonJS(function(exports, module) {
  var color = require_kleur();
  var Prompt = require_prompt();
  var { style, clear } = require_util();
  var { erase, cursor } = require_src();

  class ConfirmPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.value = opts.initial;
      this.initialValue = !!opts.initial;
      this.yesMsg = opts.yes || "yes";
      this.yesOption = opts.yesOption || "(Y/n)";
      this.noMsg = opts.no || "no";
      this.noOption = opts.noOption || "(y/N)";
      this.render();
    }
    reset() {
      this.value = this.initialValue;
      this.fire();
      this.render();
    }
    exit() {
      this.abort();
    }
    abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    submit() {
      this.value = this.value || false;
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write(`
`);
      this.close();
    }
    _(c, key) {
      if (c.toLowerCase() === "y") {
        this.value = true;
        return this.submit();
      }
      if (c.toLowerCase() === "n") {
        this.value = false;
        return this.submit();
      }
      return this.bell();
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      else
        this.out.write(clear(this.outputText, this.out.columns));
      super.render();
      this.outputText = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(this.done),
        this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
      ].join(" ");
      this.out.write(erase.line + cursor.to(0) + this.outputText);
    }
  }
  module.exports = ConfirmPrompt;
});
var import_confirm = __toESM(require_confirm(), 1);
var import_prompt = __toESM(require_prompt(), 1);
var import_util = __toESM(require_util(), 1);
var import_sisteransi = __toESM(require_src(), 1);
var import_kleur = __toESM(require_kleur(), 1);
import_kleur.default.enabled = Boolean(process.stdout.isTTY || process.env.FORCE_COLOR) && !("NO_COLOR" in process.env) && !process.env.NODE_DISABLE_COLORS && process.env.FORCE_COLOR !== "0" && process.env.TERM !== "dumb";
var heading = (text) => import_kleur.default.bold(text);
var muted = (text) => import_kleur.default.gray(text);
var width = (text) => [...import_util.strip(text)].length;
var height = (text, columns) => text.split(`
`).reduce((sum, line) => sum + Math.max(1, Math.ceil(width(line) / columns)), 0);
var clip = (text, columns) => [...text].length <= columns ? text : [...text].slice(0, Math.max(0, columns - 1)).join("") + "…";
function filtered(choices, showAll, query) {
  return query ? choices.filter((choice) => `${choice.title} ${choice.value}`.toLowerCase().includes(query.toLowerCase())) : choices.filter((choice) => showAll || choice.popular);
}
function renderAgentFrame({
  choices,
  showAll = false,
  query = "",
  cursor: focused = 0,
  scrollCursor = focused,
  rows = 24,
  columns = 80,
  error = false,
  done = false,
  aborted = false
}) {
  columns = Math.max(1, columns);
  const selected = choices.filter((choice) => choice.selected).length;
  if (done)
    return {
      frame: `  ${aborted ? muted("Cancelled") : import_kleur.default.green(`${selected} agents selected`)}`,
      visible: [],
      start: 0,
      end: 0,
      pageSize: 0
    };
  const visible = filtered(choices, showAll, query);
  const title = query ? "Search all agents" : showAll ? "All agents" : "Popular agents";
  const instructions = columns >= 64 ? ["Type to search | ↑↓ move | Space selects | Enter confirms"] : columns >= 32 ? ["Type to search | ↑↓ move", "Space selects | Enter confirms"] : ["Type to search", "↑↓ move | Space selects", "Enter confirms"];
  const lines = [
    muted(`  ${title} · ${selected} selected`),
    ...instructions.map((line) => muted(`  ${line}`)),
    muted(`  Search: ${clip(query || "Type to filter", Math.max(1, columns - 10))}`)
  ];
  const otherCount = choices.filter((choice) => !choice.popular).length;
  const action = showAll ? "Popular agents" : `Other agents (${otherCount} more)`;
  const actionHint = columns >= 44 ? " · Tab to browse" : columns >= 36 ? " · Tab" : "";
  const actionFocused = focused === visible.length;
  const actionLine = `  ${actionFocused ? import_kleur.default.cyan("›") : " "}   ${actionFocused ? import_kleur.default.cyan().underline(action) : action}${muted(actionHint)}`;
  const longestOption = Math.max(1, ...visible.map((choice) => height(`    › ○ ${choice.title}`, columns)));
  const budget = rows - 3 - height(lines.join(`
`), columns) - height(actionLine, columns) - 1;
  const pageSize = Math.min(visible.length, Math.max(1, Math.floor(budget / longestOption)));
  const start = Math.min(Math.max(0, scrollCursor - Math.floor(pageSize / 2)), Math.max(0, visible.length - pageSize));
  const end = start + pageSize;
  for (let index = start;index < end; index++) {
    const choice = visible[index];
    const marker = choice.selected ? import_kleur.default.green("●") : "○";
    const label = focused === index ? import_kleur.default.cyan().underline(choice.title) : choice.title;
    lines.push(`    ${focused === index ? import_kleur.default.cyan("›") : " "} ${marker} ${label}`);
  }
  if (!visible.length)
    lines.push(muted("    No agents match this search"));
  lines.push(actionLine);
  const remaining = end < visible.length;
  const range = pageSize < visible.length ? columns >= 44 ? `Showing ${start + 1}–${end} of ${visible.length} | ${start && remaining ? "↑↓" : start ? "↑" : "↓"} more agents` : `${start + 1}–${end} of ${visible.length} | ${start && remaining ? "↑↓" : start ? "↑" : "↓"} more agents` : `${visible.length} agents`;
  lines.push(error ? import_kleur.default.yellow("  Select an agent with Space") : muted(`  ${range}`));
  return { frame: lines.join(`
`), visible, start, end, pageSize };
}

class AgentPicker extends import_prompt.default {
  constructor(options) {
    super(options);
    this.value = options.choices.map((choice) => ({ ...choice, selected: false }));
    this.query = "";
    this.showAll = false;
    this.cursor = 0;
    this.scrollCursor = 0;
    this.error = false;
    this.previousFrame = "";
    this.previousColumns = this.out.columns || 80;
    this.onResize = () => this.render();
    this.out.on("resize", this.onResize);
    const close = this.close;
    this.close = () => {
      this.out.off("resize", this.onResize);
      close();
    };
    this.render();
  }
  get visible() {
    return filtered(this.value, this.showAll, this.query);
  }
  move(next) {
    this.cursor = next;
    if (next >= 0 && next < this.visible.length)
      this.scrollCursor = next;
    this.error = false;
    this.render();
  }
  up() {
    this.move(this.cursor <= 0 ? this.visible.length : this.cursor - 1);
  }
  down() {
    this.move(this.cursor >= this.visible.length ? 0 : this.cursor + 1);
  }
  first() {
    this.move(this.visible.length ? 0 : -1);
  }
  home() {
    this.first();
  }
  last() {
    this.move(this.visible.length);
  }
  end() {
    this.last();
  }
  nextPage() {
    this.move(Math.min(this.visible.length, this.cursor + Math.max(1, this.pageSize)));
  }
  prevPage() {
    this.move(Math.max(0, this.cursor - Math.max(1, this.pageSize)));
  }
  next() {
    this.changeView();
  }
  changeView() {
    this.showAll = !this.showAll;
    this.query = "";
    this.cursor = this.scrollCursor = 0;
    this.error = false;
    this.render();
  }
  toggle(selected) {
    if (this.cursor === this.visible.length)
      return this.changeView();
    const choice = this.visible[this.cursor];
    if (!choice)
      return this.bell();
    choice.selected = selected === undefined ? !choice.selected : selected;
    this.error = false;
    this.fire();
    this.render();
  }
  left() {
    this.toggle(false);
  }
  right() {
    this.toggle(true);
  }
  filter() {
    this.cursor = this.visible.length ? 0 : -1;
    this.scrollCursor = 0;
    this.error = false;
    this.render();
  }
  delete() {
    this.query = [...this.query].slice(0, -1).join("");
    this.filter();
  }
  deleteForward() {
    this.delete();
  }
  reset() {
    this.query = "";
    this.filter();
  }
  _(text) {
    if (text === " ")
      return this.toggle();
    if (typeof text !== "string" || !text || /[\u0000-\u001f\u007f]/.test(text))
      return this.bell();
    this.query = [...this.query + text].slice(0, 100).join("");
    this.filter();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.render();
    this.out.write(`
`);
    this.close();
  }
  submit() {
    if (this.cursor === this.visible.length)
      return this.changeView();
    if (!this.value.some((choice) => choice.selected)) {
      this.error = true;
      return this.render();
    }
    this.done = true;
    this.render();
    this.out.write(`
`);
    this.close();
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(import_sisteransi.cursor.hide);
    super.render();
    const result = renderAgentFrame({
      choices: this.value,
      showAll: this.showAll,
      query: this.query,
      cursor: this.cursor,
      scrollCursor: this.scrollCursor,
      error: this.error,
      done: this.done,
      aborted: this.aborted,
      rows: this.out.rows || 24,
      columns: this.out.columns || 80
    });
    this.pageSize = result.pageSize;
    if (this.previousFrame)
      this.out.write(import_util.clear(this.previousFrame, this.out.columns || this.previousColumns));
    this.out.write(result.frame);
    this.previousFrame = result.frame;
    this.previousColumns = this.out.columns || 80;
  }
}

class StyledConfirm extends import_confirm.default {
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(import_sisteransi.cursor.hide);
    else
      this.out.write(import_util.clear(this.outputText, this.out.columns));
    import_prompt.default.prototype.render.call(this);
    this.outputText = `  ${import_kleur.default.bold(this.msg)} ${muted(this.done ? this.value ? "Yes" : "No" : this.initialValue ? "(Y/n)" : "(y/N)")}`;
    this.out.write(this.outputText);
  }
}
function ask(PromptType, options, format = (value) => value) {
  return new Promise((resolve, reject) => {
    const prompt = new PromptType(options);
    prompt.on("submit", (value) => resolve(format(value)));
    prompt.on("abort", () => reject(new Error("cancelled")));
  });
}
var multiselect = (options) => ask(AgentPicker, options, (values) => values.filter((choice) => choice.selected).map((choice) => choice.value));
var confirm = (options) => ask(StyledConfirm, options);

// installer:picker.ts
class Cancelled extends Error {
}
async function ask2(prompt) {
  try {
    return await prompt;
  } catch (error) {
    if (error instanceof Error && error.message === "cancelled") {
      console.log("Cancelled. Nothing was installed.");
      throw new Cancelled;
    }
    throw error;
  }
}
async function selectAgents(agents, global) {
  return ask2(multiselect({
    choices: agents.filter((agent) => !global || agent.global).map((agent) => ({ value: agent.id, title: agent.label, popular: agent.popular }))
  }));
}
async function allowReplacement(message) {
  return Boolean(await ask2(confirm({ message, initial: false })));
}

// installer:companion-cli.ts
import { homedir } from "node:os";
import { resolve as resolve3 } from "node:path";

// installer:companion.ts
import { execFileSync } from "node:child_process";
import { createHash as createHash2 } from "node:crypto";
import {
  cpSync as cpSync2,
  existsSync as existsSync2,
  lstatSync as lstatSync2,
  mkdirSync as mkdirSync2,
  mkdtempSync as mkdtempSync2,
  readFileSync as readFileSync2,
  readdirSync as readdirSync2,
  rmSync as rmSync2,
  writeFileSync as writeFileSync2,
  realpathSync as realpathSync2
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname as dirname2, join as join2, resolve as resolve2 } from "node:path";

// installer:agents.json
var agents_default = [
  {
    id: "adal",
    label: "AdaL",
    local: ".adal/skills",
    global: "HOME/.adal/skills",
    popular: false
  },
  {
    id: "aider-desk",
    label: "AiderDesk",
    local: ".aider-desk/skills",
    global: "HOME/.aider-desk/skills",
    popular: false
  },
  {
    id: "amp",
    label: "Amp",
    local: ".agents/skills",
    global: "CONFIG/agents/skills",
    popular: true
  },
  {
    id: "antigravity",
    label: "Antigravity",
    local: ".agents/skills",
    global: "HOME/.gemini/config/skills",
    popular: false,
    legacyGlobal: [
      "HOME/.gemini/antigravity/skills"
    ]
  },
  {
    id: "antigravity-cli",
    label: "Antigravity CLI",
    local: ".agents/skills",
    global: "HOME/.gemini/antigravity-cli/skills",
    popular: false
  },
  {
    id: "astrbot",
    label: "AstrBot",
    local: "data/skills",
    global: "HOME/.astrbot/data/skills",
    popular: false
  },
  {
    id: "augment",
    label: "Augment",
    local: ".augment/skills",
    global: "HOME/.augment/skills",
    popular: false
  },
  {
    id: "autohand-code",
    label: "Autohand Code CLI",
    local: ".autohand/skills",
    global: "AUTOHAND/skills",
    popular: false
  },
  {
    id: "claude-code",
    label: "Claude Code",
    local: ".claude/skills",
    global: "CLAUDE/skills",
    popular: true
  },
  {
    id: "cline",
    label: "Cline",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: true
  },
  {
    id: "codestudio",
    label: "Code Studio",
    local: ".codestudio/skills",
    global: "HOME/.codestudio/skills",
    popular: false
  },
  {
    id: "codearts-agent",
    label: "CodeArts Agent",
    local: ".codeartsdoer/skills",
    global: "HOME/.codeartsdoer/skills",
    popular: false
  },
  {
    id: "codebuddy",
    label: "CodeBuddy",
    local: ".codebuddy/skills",
    global: "HOME/.codebuddy/skills",
    popular: false
  },
  {
    id: "codemaker",
    label: "Codemaker",
    local: ".codemaker/skills",
    global: "HOME/.codemaker/skills",
    popular: false
  },
  {
    id: "codex",
    label: "Codex",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: true
  },
  {
    id: "command-code",
    label: "Command Code",
    local: ".commandcode/skills",
    global: "HOME/.commandcode/skills",
    popular: false
  },
  {
    id: "continue",
    label: "Continue",
    local: ".continue/skills",
    global: "HOME/.continue/skills",
    popular: false
  },
  {
    id: "cortex",
    label: "Cortex Code",
    local: ".cortex/skills",
    global: "HOME/.snowflake/cortex/skills",
    popular: false
  },
  {
    id: "crush",
    label: "Crush",
    local: ".crush/skills",
    global: "HOME/.config/crush/skills",
    popular: false
  },
  {
    id: "cursor",
    label: "Cursor",
    local: ".agents/skills",
    global: "HOME/.cursor/skills",
    popular: true
  },
  {
    id: "deepagents",
    label: "Deep Agents",
    local: ".agents/skills",
    global: "HOME/.deepagents/agent/skills",
    popular: false
  },
  {
    id: "devin",
    label: "Devin for Terminal",
    local: ".devin/skills",
    global: "CONFIG/devin/skills",
    popular: false
  },
  {
    id: "dexto",
    label: "Dexto",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: false
  },
  {
    id: "droid",
    label: "Droid",
    local: ".agents/skills",
    global: "HOME/.factory/skills",
    popular: false
  },
  {
    id: "eve",
    label: "Eve",
    local: "agent/skills",
    global: null,
    popular: false
  },
  {
    id: "firebender",
    label: "Firebender",
    local: ".agents/skills",
    global: "HOME/.firebender/skills",
    popular: false
  },
  {
    id: "forgecode",
    label: "ForgeCode",
    local: ".forge/skills",
    global: "HOME/.forge/skills",
    popular: false
  },
  {
    id: "fx",
    label: "fx",
    local: ".fx/skills",
    global: "HOME/.fx/skills",
    popular: false
  },
  {
    id: "gemini-cli",
    label: "Gemini CLI",
    local: ".agents/skills",
    global: "HOME/.gemini/skills",
    popular: true
  },
  {
    id: "github-copilot",
    label: "GitHub Copilot",
    local: ".agents/skills",
    global: "HOME/.copilot/skills",
    popular: true
  },
  {
    id: "goose",
    label: "Goose",
    local: ".goose/skills",
    global: "CONFIG/goose/skills",
    popular: false
  },
  {
    id: "grok",
    label: "Grok Build",
    local: ".grok/skills",
    global: "GROK/skills",
    popular: false
  },
  {
    id: "hermes-agent",
    label: "Hermes Agent",
    local: ".hermes/skills",
    global: "HERMES/skills",
    popular: false
  },
  {
    id: "bob",
    label: "IBM Bob",
    local: ".bob/skills",
    global: "HOME/.bob/skills",
    popular: false
  },
  {
    id: "iflow-cli",
    label: "iFlow CLI",
    local: ".iflow/skills",
    global: "HOME/.iflow/skills",
    popular: false
  },
  {
    id: "inference-sh",
    label: "inference.sh",
    local: ".inferencesh/skills",
    global: "HOME/.inferencesh/skills",
    popular: false
  },
  {
    id: "jazz",
    label: "Jazz",
    local: ".jazz/skills",
    global: "HOME/.jazz/skills",
    popular: false
  },
  {
    id: "junie",
    label: "Junie",
    local: ".junie/skills",
    global: "HOME/.junie/skills",
    popular: false
  },
  {
    id: "kilo",
    label: "Kilo Code",
    local: ".agents/skills",
    global: "HOME/.kilo/skills",
    popular: true
  },
  {
    id: "kimchi",
    label: "Kimchi",
    local: ".kimchi/skills",
    global: "HOME/.config/kimchi/harness/skills",
    popular: false
  },
  {
    id: "kimi-code-cli",
    label: "Kimi Code CLI",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: false
  },
  {
    id: "kiro-cli",
    label: "Kiro CLI",
    local: ".kiro/skills",
    global: "HOME/.kiro/skills",
    popular: false
  },
  {
    id: "kode",
    label: "Kode",
    local: ".kode/skills",
    global: "HOME/.kode/skills",
    popular: false
  },
  {
    id: "lingma",
    label: "Lingma",
    local: ".lingma/skills",
    global: "HOME/.lingma/skills",
    popular: false
  },
  {
    id: "loaf",
    label: "Loaf",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: false
  },
  {
    id: "mcpjam",
    label: "MCPJam",
    local: ".mcpjam/skills",
    global: "HOME/.mcpjam/skills",
    popular: false
  },
  {
    id: "minimax-code",
    label: "MiniMax Code",
    local: ".minimax/skills",
    global: "HOME/.minimax/skills",
    popular: false
  },
  {
    id: "mistral-vibe",
    label: "Mistral Vibe",
    local: ".vibe/skills",
    global: "VIBE/skills",
    popular: false
  },
  {
    id: "moxby",
    label: "Moxby",
    local: ".moxby/skills",
    global: "HOME/.moxby/skills",
    popular: false
  },
  {
    id: "mux",
    label: "Mux",
    local: ".mux/skills",
    global: "HOME/.mux/skills",
    popular: false
  },
  {
    id: "neovate",
    label: "Neovate",
    local: ".neovate/skills",
    global: "HOME/.neovate/skills",
    popular: false
  },
  {
    id: "ona",
    label: "Ona",
    local: ".ona/skills",
    global: "HOME/.ona/skills",
    popular: false
  },
  {
    id: "openclaw",
    label: "OpenClaw",
    local: "skills",
    global: "HOME/.openclaw/skills",
    popular: false
  },
  {
    id: "opencode",
    label: "OpenCode",
    local: ".agents/skills",
    global: "CONFIG/opencode/skills",
    popular: true
  },
  {
    id: "openhands",
    label: "OpenHands",
    local: ".openhands/skills",
    global: "HOME/.openhands/skills",
    popular: false
  },
  {
    id: "pi",
    label: "Pi",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: false
  },
  {
    id: "pochi",
    label: "Pochi",
    local: ".pochi/skills",
    global: "HOME/.pochi/skills",
    popular: false
  },
  {
    id: "posit-assistant",
    label: "Posit Assistant",
    local: ".posit/assistant/skills",
    global: "HOME/.posit/assistant/skills",
    popular: false
  },
  {
    id: "promptscript",
    label: "PromptScript",
    local: ".agents/skills",
    global: null,
    popular: false
  },
  {
    id: "qoder",
    label: "Qoder",
    local: ".qoder/skills",
    global: "HOME/.qoder/skills",
    popular: false
  },
  {
    id: "qoder-cn",
    label: "Qoder CN",
    local: ".qoder/skills",
    global: "HOME/.qoder-cn/skills",
    popular: false
  },
  {
    id: "qwen-code",
    label: "Qwen Code",
    local: ".qwen/skills",
    global: "HOME/.qwen/skills",
    popular: false
  },
  {
    id: "reasonix",
    label: "Reasonix",
    local: ".reasonix/skills",
    global: "HOME/.reasonix/skills",
    popular: false
  },
  {
    id: "replit",
    label: "Replit",
    local: ".agents/skills",
    global: "CONFIG/agents/skills",
    popular: false
  },
  {
    id: "roo",
    label: "Roo Code",
    local: ".roo/skills",
    global: "HOME/.roo/skills",
    popular: false
  },
  {
    id: "rovodev",
    label: "Rovo Dev",
    local: ".rovodev/skills",
    global: "HOME/.rovodev/skills",
    popular: false
  },
  {
    id: "sarvam-code",
    label: "Sarvam Code",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: false
  },
  {
    id: "tabnine-cli",
    label: "Tabnine CLI",
    local: ".tabnine/agent/skills",
    global: "HOME/.tabnine/agent/skills",
    popular: false
  },
  {
    id: "terramind",
    label: "Terramind",
    local: ".terramind/skills",
    global: "HOME/.terramind/skills",
    popular: false
  },
  {
    id: "tinycloud",
    label: "Tinycloud",
    local: ".tinycloud/skills",
    global: "HOME/.tinycloud/skills",
    popular: false
  },
  {
    id: "trae",
    label: "Trae",
    local: ".trae/skills",
    global: "HOME/.trae/skills",
    popular: false
  },
  {
    id: "trae-cn",
    label: "Trae CN",
    local: ".trae/skills",
    global: "HOME/.trae-cn/skills",
    popular: false
  },
  {
    id: "universal",
    label: "Universal",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: false
  },
  {
    id: "warp",
    label: "Warp",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: false
  },
  {
    id: "windsurf",
    label: "Windsurf",
    local: ".windsurf/skills",
    global: "HOME/.codeium/windsurf/skills",
    popular: true
  },
  {
    id: "zcode",
    label: "ZCode",
    local: ".zcode/skills",
    global: "HOME/.zcode/skills",
    popular: false
  },
  {
    id: "zed",
    label: "Zed",
    local: ".agents/skills",
    global: "HOME/.agents/skills",
    popular: false
  },
  {
    id: "zencoder",
    label: "Zencoder",
    local: ".zencoder/skills",
    global: "HOME/.zencoder/skills",
    popular: false
  },
  {
    id: "zenflow",
    label: "Zenflow",
    local: ".zencoder/skills",
    global: "HOME/.zencoder/skills",
    popular: false
  }
];

// installer:companion-catalog.json
var companion_catalog_default = [
  {
    id: "impeccable",
    role: "Primary design skill",
    when: "Default for new interfaces, substantial visual changes, design systems, and iterative critique/refinement. More workflow and tooling than a small edit needs.",
    repo: "pbakaus/impeccable",
    ref: "c4cd1924c389f68d37c687d9c2bbf13f12547c41",
    license: "LICENSE",
    paths: {
      codex: ".agents/skills/impeccable",
      "claude-code": ".claude/skills/impeccable",
      cursor: ".cursor/skills/impeccable",
      "gemini-cli": ".gemini/skills/impeccable",
      "github-copilot": ".github/skills/impeccable",
      opencode: ".opencode/skills/impeccable",
      antigravity: ".agent/skills/impeccable",
      devin: ".devin/skills/impeccable",
      grok: ".grok/skills/impeccable",
      "hermes-agent": ".hermes/skills/impeccable",
      "kiro-cli": ".kiro/skills/impeccable",
      pi: ".pi/skills/impeccable",
      qoder: ".qoder/skills/impeccable",
      trae: ".trae/skills/impeccable",
      "trae-cn": ".trae-cn/skills/impeccable",
      "mistral-vibe": ".vibe/skills/impeccable",
      replit: ".agents/skills/impeccable",
      rovodev: ".rovodev/skills/impeccable"
    },
    requiredFiles: [
      "reference/craft-floor.md",
      "reference/new-work.md",
      "scripts/impeccable",
      "scripts/VERSION",
      "scripts/engine-checksums.txt"
    ],
    requirements: "The launcher fetches its checksum-verified engine on first use. New design may contact the visual catalog. Hooks and live mode remain opt-in.",
    extraFiles: {
      opencode: [
        {
          source: ".opencode/commands/impeccable.md",
          target: "commands/impeccable.md"
        }
      ]
    },
    agentNotes: {
      cursor: "Agent Skills may need enabling in Cursor settings.",
      "gemini-cli": "Agent Skills may need enabling in Gemini CLI settings.",
      "hermes-agent": "Project-local skills may require hermes skills trust; preserve the host trust decision.",
      trae: "Restart Trae after installation.",
      "trae-cn": "Restart Trae after installation.",
      opencode: "The native /impeccable command uses commands/impeccable.md. Its build/subtask behavior remains subject to host and user delegation rules."
    },
    localDirectories: {
      codex: ".agents/skills",
      "claude-code": ".claude/skills",
      cursor: ".cursor/skills",
      "gemini-cli": ".gemini/skills",
      "github-copilot": ".github/skills",
      opencode: ".opencode/skills",
      antigravity: ".agent/skills",
      devin: ".devin/skills",
      grok: ".grok/skills",
      "hermes-agent": ".hermes/skills",
      "kiro-cli": ".kiro/skills",
      pi: ".pi/skills",
      qoder: ".qoder/skills",
      trae: ".trae/skills",
      "trae-cn": ".trae-cn/skills",
      "mistral-vibe": ".vibe/skills",
      replit: ".agents/skills",
      rovodev: ".rovodev/skills"
    }
  },
  {
    id: "frontend-design",
    role: "Lightweight design alternative",
    when: "Small, quick UI implementations or refinements with an established direction. Text-only aesthetic guidance with a simpler workflow; choose it as the primary design skill for that task.",
    repo: "anthropics/skills",
    ref: "41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f",
    license: "skills/frontend-design/LICENSE.txt",
    paths: {
      default: "skills/frontend-design"
    },
    requiredFiles: [
      "LICENSE.txt"
    ],
    requirements: "Text-only guidance; no separate engine. Reuse the existing brief and keep the change scoped."
  },
  {
    id: "modern-web-guidance",
    role: "Browser platform companion",
    when: "HTML/CSS/client JavaScript, native interactions, browser support, accessibility, loading, images, or lifecycle. Use its relevant guides; it complements design and component skills rather than choosing the visual style.",
    repo: "GoogleChrome/modern-web-guidance",
    ref: "4dd968349e54ca45a05dd5c818fb035c9054b022",
    license: "LICENSE",
    paths: {
      default: "skills/modern-web-guidance"
    },
    requiredFiles: [
      "guides/accessibility/accessibility.md"
    ],
    requirements: "Search/retrieve uses a separate guidance CLI and may need network access; bundled guides are available offline. Follow stack runtime, typing, and browser-support requirements."
  },
  {
    id: "shadcn",
    role: "Component implementation companion",
    when: "React work using shadcn/ui, its registry, presets, or components.json. Skip for Solid, Marko, Leptos, HTMX, and unrelated React projects.",
    repo: "shadcn-ui/ui",
    ref: "e62c9435fff729a175f38983dee73b2cb4f6a069",
    license: "LICENSE.md",
    paths: {
      default: "skills/shadcn"
    },
    requiredFiles: [
      "cli.md",
      "customization.md",
      "design-system.md"
    ],
    requirements: "Use the selected React workspace and its configured shadcn CLI. Registry access may need network; do not initialize or change components during skill installation."
  },
  {
    id: "ui-sdk",
    role: "Selected UI SDK implementation companion",
    when: "The user selects UI SDK or the affected workspace uses @ui-sdk/*; compose or extend its behaviors, framework adapters, keyboard/focus/ARIA, and agent interactions. Beta: do not replace suitable existing primitives merely to use this skill.",
    repo: "vercel-labs/ui",
    ref: "8ff6bcf7100d48230a3fab8c72475d99316cc58a",
    license: "LICENSE",
    paths: {
      default: "packages/core/skills/ui-sdk"
    },
    requiredFiles: [
      "references/build-interface.md",
      "references/create-component.md",
      "references/agent-ready.md",
      "references/testing.md"
    ],
    requirements: "Requires selected @ui-sdk/core and the matching framework adapter for implementation. Prefer documentation bundled with the application package version. The skill alone installs no runtime library or agent-action exposure."
  },
  {
    id: "security-audit",
    role: "Security review companion",
    when: "Security questions, focused vulnerability review, or an explicitly requested codebase audit. Guidance is the default; full audits add independent verification, coverage records, and reporting. Ordinary auth implementation alone does not trigger an audit.",
    repo: "cloudflare/security-audit-skill",
    ref: "c1c8a8c1471069fb0e188eeaff69b8e8db6564a8",
    license: "LICENSE",
    paths: {
      default: "skills/security-audit"
    },
    requiredFiles: [
      "RECONNAISSANCE.md",
      "HUNTING.md",
      "VALIDATION-AND-REPORTING.md",
      "report-schema.json",
      "validate-findings.cjs",
      "validate-coverage-ledger.cjs"
    ],
    requirements: "Focused questions use guidance mode. Full audits require independent agents; target-code execution additionally requires the skill's restricted OS sandbox. File installation establishes neither capability."
  }
];

// installer:engine.ts
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
function readJSON(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}
function stat(path) {
  try {
    return lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT")
      return;
    throw error;
  }
}
function inside(parent, path) {
  const difference = relative(parent, path);
  return difference === "" || !isAbsolute(difference) && difference !== ".." && !difference.startsWith(`..${sep}`);
}
function canonical(path) {
  const absolute = resolve(path);
  const current = stat(absolute);
  if (current)
    return realpathSync(absolute);
  const parent = dirname(absolute);
  if (parent === absolute)
    return absolute;
  return join(canonical(parent), relative(parent, absolute));
}
function skillDirectory(agent, global, context) {
  if (!global)
    return resolve(context.cwd, agent.local);
  if (!agent.global)
    throw new Error(`${agent.label} supports project installation only. Use --local.`);
  const roots = {
    HOME: context.home,
    CONFIG: context.env.XDG_CONFIG_HOME || join(context.home, ".config"),
    CLAUDE: context.env.CLAUDE_CONFIG_DIR || join(context.home, ".claude"),
    VIBE: context.env.VIBE_HOME || join(context.home, ".vibe"),
    HERMES: context.env.HERMES_HOME || join(context.home, ".hermes"),
    AUTOHAND: context.env.AUTOHAND_HOME || join(context.home, ".autohand"),
    GROK: context.env.GROK_HOME || join(context.home, ".grok"),
    SARVAM: context.env.SARVAM_HOME || join(context.home, ".sarvam")
  };
  const [token, ...parts] = agent.global.split("/");
  const root = roots[token];
  if (!root)
    throw new Error(`Invalid global directory for ${agent.label}`);
  if (agent.id === "openclaw") {
    const legacy = [".openclaw", ".clawdbot", ".moltbot"].find((name) => existsSync(join(context.home, name)));
    if (legacy)
      return join(context.home, legacy, "skills");
  }
  return resolve(root, ...parts);
}
function fingerprints(root) {
  const result = {};
  function walk(path, prefix) {
    const current = lstatSync(path);
    if (current.isSymbolicLink())
      throw new Error(`Refusing a symlink: ${path}`);
    if (current.isDirectory()) {
      for (const name of readdirSync(path).sort())
        walk(join(path, name), prefix ? `${prefix}/${name}` : name);
    } else if (current.isFile()) {
      result[prefix] = createHash("sha256").update(readFileSync(path)).digest("hex");
    } else
      throw new Error(`Unsupported file: ${path}`);
  }
  walk(root, "");
  return result;
}
function matches(root, hashes) {
  try {
    return JSON.stringify(fingerprints(root)) === JSON.stringify(hashes);
  } catch {
    return false;
  }
}
function sameUnchangedLegacy(source, target, name) {
  try {
    if (readJSON(join(target, "SOURCE.json")).package !== name)
      return false;
    const original = fingerprints(source), installed = fingerprints(target);
    delete original["SOURCE.json"];
    delete installed["SOURCE.json"];
    return JSON.stringify(original) === JSON.stringify(installed);
  } catch {
    return false;
  }
}
function planSkills(root, product, selected, global, context, remove = false) {
  const operations = [], conflicts = [];
  const directories = [
    ...new Set(selected.map((agent) => canonical(skillDirectory(agent, global, context))))
  ];
  const names = [product.id, `${product.id}-kickoff`];
  const hashes = Object.fromEntries(names.map((name) => [name, fingerprints(join(root, "skills", name))]));
  for (const directory of directories) {
    const receiptPath = join(directory, `.${product.id}-install.json`);
    const receiptStat = stat(receiptPath);
    if (receiptStat?.isSymbolicLink())
      throw new Error(`Refusing a symlink: ${receiptPath}`);
    const receipt = receiptStat ? readJSON(receiptPath) : undefined;
    if (receipt && (receipt.schemaVersion !== 1 || receipt.product !== product.id))
      throw new Error(`Unrecognized installation record: ${receiptPath}`);
    let changed = false;
    for (const name of names) {
      const target = join(directory, name), source = join(root, "skills", name);
      const current = stat(target);
      if (current?.isSymbolicLink())
        throw new Error(`Refusing a symlink: ${target}`);
      if (current && !current.isDirectory())
        throw new Error(`Expected a skill directory: ${target}`);
      if (inside(canonical(source), target) || inside(target, canonical(source)))
        throw new Error(`Source and installation directories overlap: ${target}`);
      if (remove && !current)
        continue;
      if (current) {
        const known = receipt?.skills?.[name];
        if (!(known && matches(target, known)) && !sameUnchangedLegacy(source, target, name))
          conflicts.push(target);
        if (!remove && matches(target, hashes[name]))
          continue;
      }
      operations.push({ target, ...remove ? {} : { source } });
      changed = true;
    }
    if (remove) {
      if (receiptStat)
        operations.push({ target: receiptPath });
    } else if (changed || !receiptStat) {
      operations.push({
        target: receiptPath,
        bytes: JSON.stringify({
          schemaVersion: 1,
          product: product.id,
          version: product.version,
          skills: hashes
        }, null, 2) + `
`
      });
    }
  }
  return { operations, conflicts, directories };
}
function planCLI(root, product, context) {
  const prefix = resolve(context.env.WEB_STACK_CLI_PREFIX || join(context.home, ".local"));
  const target = join(prefix, "share", product.command);
  const launcher = join(prefix, "bin", product.command + (process.platform === "win32" ? ".cmd" : ""));
  const source = canonical(root);
  for (const path of [target, launcher]) {
    if (stat(path)?.isSymbolicLink())
      throw new Error(`Refusing a symlink: ${path}`);
  }
  if (canonical(target) === source)
    return { operations: [], conflicts: [], directories: [target] };
  if (inside(source, canonical(target)) || inside(canonical(target), source))
    throw new Error("CLI source and installation directories overlap.");
  if (stat(target) && readJSON(join(target, "cli/product.json")).id !== product.id)
    throw new Error(`Another installation occupies ${target}`);
  const marker = `Managed by ${product.command}`;
  if (stat(launcher) && !readFileSync(launcher, "utf8").includes(marker))
    throw new Error(`Another command occupies ${launcher}`);
  const entry = join(target, "cli/index.mjs");
  const quote = (value) => "'" + value.replaceAll("'", "'\\''") + "'";
  const bytes = process.platform === "win32" ? `@echo off\r
REM ${marker}\r
where bun >nul 2>nul\r
if errorlevel 1 (node "${entry.replaceAll("%", "%%")}" %*) else (bun "${entry.replaceAll("%", "%%")}" %*)\r
` : `#!/bin/sh
# ${marker}
if command -v bun >/dev/null 2>&1; then exec bun ${quote(entry)} "$@"; fi
if command -v node >/dev/null 2>&1; then exec node ${quote(entry)} "$@"; fi
printf '%s\\n' 'Install Bun or Node.js 22+ to run ${product.command}.' >&2
exit 1
`;
  return {
    operations: [
      { target, source: root },
      { target: launcher, bytes, mode: 493 }
    ],
    conflicts: [],
    directories: [target]
  };
}
function applyOperations(operations, cliSource) {
  const staged = [];
  const preserved = new Set;
  try {
    for (const operation of operations) {
      mkdirSync(dirname(operation.target), { recursive: true });
      const temporary = mkdtempSync(join(dirname(operation.target), ".stack-install-"));
      const item = {
        operation,
        temporary,
        backup: join(temporary, "previous"),
        existed: false,
        activated: false
      };
      staged.push(item);
      const next = join(temporary, "next");
      if (operation.source) {
        if (operation.source === cliSource) {
          mkdirSync(next);
          for (const name of ["cli", "skills", "package.json", "LICENSE", "SOURCE.json"])
            cpSync(join(operation.source, name), join(next, name), { recursive: true });
        } else
          cpSync(operation.source, next, { recursive: true, preserveTimestamps: true });
      } else if (operation.bytes !== undefined)
        writeFileSync(next, operation.bytes, { mode: operation.mode || 420 });
    }
    for (const item of staged) {
      const { operation, temporary, backup } = item;
      if (stat(operation.target)) {
        renameSync(operation.target, backup);
        item.existed = true;
      }
      if (operation.source || operation.bytes !== undefined)
        renameSync(join(temporary, "next"), operation.target);
      item.activated = true;
    }
  } catch (error) {
    const failedRestores = [];
    for (const item of staged.toReversed()) {
      try {
        if (item.activated)
          rmSync(item.operation.target, { recursive: true, force: true });
        if (item.existed)
          renameSync(item.backup, item.operation.target);
      } catch {
        failedRestores.push(item.backup);
        preserved.add(item.temporary);
      }
    }
    if (failedRestores.length)
      throw new Error(`Installation failed. Preserved recovery files: ${failedRestores.join(", ")}`, { cause: error });
    throw error;
  } finally {
    for (const item of staged) {
      if (!preserved.has(item.temporary))
        rmSync(item.temporary, { recursive: true, force: true });
    }
  }
}

// installer:companion.ts
var marker = ".stack-companion-source.json";
function stat2(path) {
  try {
    return lstatSync2(path);
  } catch (error) {
    if (error.code === "ENOENT")
      return;
    throw error;
  }
}
function validPath(path) {
  return typeof path === "string" && /^(?:[a-zA-Z0-9_.-]+\/)*[a-zA-Z0-9_.-]+$/.test(path) && !path.split("/").some((part) => part === "." || part === "..");
}
function validCommand(path) {
  return typeof path === "string" && /^commands\/[a-z0-9-]+\.md$/.test(path);
}
function validHashes(value, commands = false) {
  return value !== null && typeof value === "object" && !Array.isArray(value) && Object.entries(value).every(([path, hash]) => validPath(path) && (!commands || validCommand(path)) && typeof hash === "string" && /^[a-f0-9]{64}$/.test(hash));
}
function sha(path) {
  return createHash2("sha256").update(readFileSync2(path)).digest("hex");
}
function same(left, right) {
  return Object.keys(left).length === Object.keys(right).length && Object.entries(left).every(([key, value]) => right[key] === value);
}
function sameSource(left, right) {
  return left.repo === right.repo && left.ref === right.ref && left.path === right.path && left.license === right.license && JSON.stringify(left.extras || []) === JSON.stringify(right.extras || []);
}
function projectDirectories(cwd) {
  const directories = [resolve2(cwd)];
  let current = directories[0];
  while (!existsSync2(join2(current, ".git")) && dirname2(current) !== current) {
    current = dirname2(current);
    directories.push(current);
  }
  return existsSync2(join2(current, ".git")) ? directories : [directories[0]];
}
function sourceFor(companion, agent) {
  const paths = companion.paths;
  const path = paths[agent] || paths.default;
  if (!path)
    throw new Error(`No reviewed ${companion.id} build for ${agent}. Available agents: ${Object.keys(paths).join(", ")}.`);
  const extras = companion.extraFiles?.[agent];
  return { repo: companion.repo, ref: companion.ref, path, license: companion.license, ...extras ? { extras } : {} };
}
function gitEnvironment(environment) {
  const result = { ...environment, GIT_TERMINAL_PROMPT: "0", GIT_LFS_SKIP_SMUDGE: "1" };
  for (const key of Object.keys(result))
    if (/^GIT_(?:DIR|COMMON_DIR|WORK_TREE|INDEX_FILE|OBJECT_DIRECTORY|ALTERNATE_OBJECT_DIRECTORIES|NAMESPACE|SHALLOW_FILE|CONFIG(?:_.*)?|PREFIX|INTERNAL_SUPER_PREFIX)$/.test(key))
      delete result[key];
  return result;
}
function fetchSkill(source, root) {
  if (!/^[\w-]+\/[\w.-]+$/.test(source.repo) || !/^[a-f0-9]{40}$/.test(source.ref))
    throw new Error("Expected an allowlisted GitHub repository and full commit pin.");
  const paths = [source.path, source.license, ...(source.extras || []).map((extra) => extra.source)];
  if (!paths.every(validPath) || !(source.extras || []).every((extra) => validPath(extra.target)))
    throw new Error("Invalid upstream skill path.");
  const hooks = join2(root, "empty-hooks");
  mkdirSync2(hooks);
  const git = (args, input) => {
    try {
      return execFileSync("git", [
        "-c",
        `core.hooksPath=${hooks}`,
        "-c",
        "core.fsmonitor=false",
        "-c",
        `core.worktree=${root}`,
        "-c",
        "core.bare=false",
        "-c",
        "core.autocrlf=false",
        "-C",
        root,
        ...args
      ], {
        input,
        encoding: "utf8",
        timeout: 60000,
        maxBuffer: 1024 * 1024,
        env: gitEnvironment(process.env),
        stdio: ["pipe", "pipe", "pipe"]
      });
    } catch (error) {
      if (error.code === "ENOENT")
        throw new Error("Install Git to download companion skills.");
      const reason = error.code === "ETIMEDOUT" ? "Git timed out" : "Git could not retrieve the pinned files";
      throw new Error(`${reason}: ${source.repo}@${source.ref}. Check network/Git access and retry; no existing skill was replaced.`);
    }
  };
  git(["init", "--quiet", `--template=${hooks}`]);
  git(["remote", "add", "origin", `https://github.com/${source.repo}.git`]);
  git(["config", "remote.origin.promisor", "true"]);
  git(["config", "remote.origin.partialclonefilter", "blob:none"]);
  git(["sparse-checkout", "set", "--no-cone", "--stdin"], paths.map((path, i) => `/${path}${i === 0 ? "/" : ""}
`).join(""));
  git(["fetch", "--quiet", "--depth=1", "--filter=blob:none", "origin", source.ref]);
  git(["checkout", "--quiet", "--detach", "FETCH_HEAD"]);
  if (git(["rev-parse", "HEAD"]).trim() !== source.ref)
    throw new Error("Upstream revision mismatch.");
}
function validateTree(root) {
  let files = 0, bytes = 0;
  const walk = (path) => {
    const entry = lstatSync2(path);
    if (entry.isSymbolicLink())
      throw new Error(`Skill contains a symlink: ${path}`);
    if (entry.isDirectory()) {
      for (const name of readdirSync2(path))
        walk(join2(path, name));
    } else if (entry.isFile()) {
      if (++files > 2500 || (bytes += entry.size) > 64 * 1024 * 1024)
        throw new Error("Skill exceeds the installation size limit.");
    } else
      throw new Error(`Unsupported skill file: ${path}`);
  };
  walk(root);
}
function complete(root, companion) {
  const paths = ["SKILL.md", ...companion.requiredFiles];
  const missing = paths.filter((path) => !existsSync2(join2(root, path)) || !lstatSync2(realpathSync2(join2(root, path))).isFile());
  if (missing.length)
    throw new Error(`Incomplete existing or downloaded skill: ${root}; missing ${missing.join(", ")}. Repair explicitly; existing files are preserved.`);
  const header = /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync2(join2(root, "SKILL.md"), "utf8"))?.[1];
  const name = header && /^name:\s*["']?([a-z0-9-]+)["']?\s*$/m.exec(header)?.[1];
  if (name !== companion.id)
    throw new Error(`Skill identity mismatch at ${root}; expected ${companion.id}.`);
}
function receiptAt(root) {
  const path = join2(root, marker);
  if (!stat2(path)?.isFile())
    return;
  try {
    const value = JSON.parse(readFileSync2(path, "utf8"));
    const source = value?.source;
    if (value?.schemaVersion !== 2 || !source || typeof source.repo !== "string" || !/^[\w-]+\/[\w.-]+$/.test(source.repo) || typeof source.ref !== "string" || !/^[a-f0-9]{40}$/.test(source.ref) || !validPath(source.path) || !validPath(source.license) || source.extras !== undefined && (!Array.isArray(source.extras) || !source.extras.every((extra) => extra && validPath(extra.source) && validCommand(extra.target))) || !validHashes(value.files) || typeof value.files["SKILL.md"] !== "string" || marker in value.files || !validHashes(value.extraFiles, true) || !Object.keys(value.extraFiles).every((path) => source.extras?.some((extra) => extra.target === path)))
      return;
    return value;
  } catch {
    return;
  }
}
function inventory(root) {
  validateTree(root);
  const hashes = fingerprints(root);
  delete hashes[marker];
  return hashes;
}
function unchanged(root, receipt) {
  if (!same(inventory(root), receipt.files))
    return false;
  return Object.entries(receipt.extraFiles).every(([path, hash]) => validPath(path) && stat2(join2(dirname2(root), "..", path))?.isFile() && sha(join2(dirname2(root), "..", path)) === hash);
}
function ensureCompanion(options, context, fetchSource = fetchSkill) {
  const companion = companion_catalog_default.find((entry) => entry.id === options.id);
  if (!companion)
    throw new Error(`Unknown companion: ${options.id}. Run skill list.`);
  const agent = agents_default.find((entry) => entry.id === options.agent);
  if (!agent)
    throw new Error(`Unknown agent: ${options.agent}. Use an identifier from the stack's agents command.`);
  const expected = sourceFor(companion, agent.id);
  const nativeLocal = companion.localDirectories?.[agent.id];
  const selectedAgent = nativeLocal ? { ...agent, local: nativeLocal } : agent;
  if (!existsSync2(context.cwd) || !lstatSync2(realpathSync2(context.cwd)).isDirectory())
    throw new Error(`Project directory does not exist: ${context.cwd}`);
  const directories = projectDirectories(realpathSync2(context.cwd));
  const candidates = [];
  const sharedAliases = new Set;
  if (options.local !== false)
    for (const cwd of directories) {
      candidates.push(skillDirectory(selectedAgent, false, { ...context, cwd }));
      if (selectedAgent.local !== agent.local) {
        const shared = skillDirectory(agent, false, { ...context, cwd });
        candidates.push(shared);
        sharedAliases.add(join2(shared, companion.id));
      }
      if (agent.id === "codex")
        candidates.push(join2(cwd, ".codex/skills"));
    }
  if (options.local !== true) {
    if (agent.global)
      candidates.push(skillDirectory(agent, true, context));
    if (agent.id === "codex")
      candidates.push(join2(context.env.CODEX_HOME || join2(context.home, ".codex"), "skills"));
    for (const legacy of agent.legacyGlobal || [])
      candidates.push(skillDirectory({ ...agent, global: legacy }, true, context));
  }
  const existing = [...new Set(candidates)].map((directory) => join2(directory, companion.id)).find((path) => {
    if (!stat2(path))
      return false;
    const record = receiptAt(path);
    if (sharedAliases.has(path) && (!record || record.source.repo !== expected.repo || record.source.path !== expected.path))
      return false;
    if (record && record.source.repo === expected.repo && record.source.path !== expected.path && !options.update)
      throw new Error(`Different provider build at ${path}. Preserve it and use the correct provider directory or an explicit managed update.`);
    return true;
  });
  const notes = companion.agentNotes?.[agent.id];
  const details = { skill: companion.id, agent: agent.id, requirements: companion.requirements, ...notes ? { activationNotes: notes } : {} };
  let receipt;
  if (existing) {
    receipt = receiptAt(existing);
    const catalogMatch = receipt ? sameSource(receipt.source, expected) : null;
    const integrity = receipt && (options.update || options.check) ? unchanged(existing, receipt) : undefined;
    if (!options.update || catalogMatch && integrity) {
      complete(existing, companion);
      return {
        status: "available",
        ...details,
        entrypoint: realpathSync2(join2(existing, "SKILL.md")),
        managed: Boolean(receipt),
        catalogMatch,
        ...integrity !== undefined ? { unchanged: integrity } : {},
        missingActivationFiles: (expected.extras || []).filter((extra) => !existsSync2(join2(dirname2(dirname2(existing)), extra.target))).map((extra) => extra.target)
      };
    }
    if (!receipt)
      throw new Error(`Unmanaged skill at ${existing}. Updates preserve unrecognized copies; review or replace it explicitly.`);
    if (!integrity)
      throw new Error(`Edited or incomplete managed skill at ${existing}. Preserve your changes and resolve them before updating.`);
  }
  const directory = existing ? dirname2(existing) : skillDirectory(selectedAgent, !options.local, { ...context, cwd: directories.at(-1) });
  const destination = join2(canonical(directory), companion.id);
  if (existing && stat2(existing)?.isSymbolicLink() && options.update)
    throw new Error(`Updates preserve symlinked skills: ${existing}`);
  const source = sourceFor(companion, agent.id);
  const result = { ...details, entrypoint: join2(destination, "SKILL.md"), source };
  if (options.check)
    return { status: "missing", ...result };
  if (options.dryRun)
    return { status: existing ? "would-update" : "would-install", ...result };
  mkdirSync2(dirname2(destination), { recursive: true });
  const lock = `${destination}.install-lock`;
  try {
    mkdirSync2(lock);
  } catch (error) {
    if (error.code === "EEXIST")
      throw new Error(`An install lock exists: ${lock}. Retry after the other install finishes; if it was interrupted, verify it has stopped before removing this lock.`);
    throw error;
  }
  let download;
  try {
    writeFileSync2(join2(lock, "owner.json"), JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() }) + `
`);
    if (existing ? !receipt || !unchanged(existing, receipt) : stat2(destination))
      throw new Error(`The installation changed while acquiring its lock: ${destination}. Retry to inspect its current state.`);
    download = mkdtempSync2(join2(tmpdir(), "stack-companion-source-"));
    fetchSource(source, download);
    const upstream = join2(download, source.path);
    validateTree(upstream);
    complete(upstream, companion);
    const license = join2(download, source.license);
    if (!stat2(license)?.isFile())
      throw new Error("Downloaded skill license is missing.");
    if (!existsSync2(join2(upstream, "LICENSE")) && !existsSync2(join2(upstream, "LICENSE.txt")))
      cpSync2(license, join2(upstream, "UPSTREAM-LICENSE"));
    const extraFiles = {};
    const operations = [{ target: destination, source: upstream }];
    const agentRoot = dirname2(dirname2(destination));
    for (const extra of source.extras || []) {
      if (!validPath(extra.source) || !validPath(extra.target))
        throw new Error("Invalid native command path.");
      const from = join2(download, extra.source), to = join2(agentRoot, extra.target);
      if (!stat2(from)?.isFile())
        throw new Error(`Missing native command: ${extra.source}`);
      if (stat2(to)?.isSymbolicLink())
        throw new Error(`Preserving a symlinked command: ${to}`);
      const hash = sha(from), current = stat2(to);
      if (current && (!current.isFile() || !receipt?.extraFiles[extra.target] && sha(to) !== hash))
        throw new Error(`Preserving an existing native command: ${to}`);
      if (!current || receipt?.extraFiles[extra.target]) {
        operations.push({ target: to, source: from });
        extraFiles[extra.target] = hash;
      }
    }
    for (const old of Object.keys(receipt?.extraFiles || {}))
      if (!source.extras?.some((extra) => extra.target === old)) {
        if (!validPath(old))
          throw new Error("Invalid managed command path.");
        operations.push({ target: join2(agentRoot, old) });
      }
    const next = { schemaVersion: 2, source, files: inventory(upstream), extraFiles };
    writeFileSync2(join2(upstream, marker), JSON.stringify(next, null, 2) + `
`);
    if (existing && !unchanged(existing, receipt))
      throw new Error(`Skill changed during download: ${existing}. Existing files were preserved.`);
    if (!existing && stat2(destination))
      throw new Error(`A skill appeared during download: ${destination}. Existing files were preserved; retry to reuse it.`);
    applyOperations(operations);
    return { status: existing ? "updated" : "installed", ...result, managed: true, catalogMatch: true };
  } finally {
    if (download)
      rmSync2(download, { recursive: true, force: true });
    rmSync2(lock, { recursive: true, force: true });
  }
}

// installer:companion-cli.ts
function companionMain(args) {
  if (!args.length || args[0] === "--help" || args[0] === "-h") {
    console.log(`skill <id> --agent <id> [--local|--global] [--project <path>] [--check|--dry-run|--update]
skill list

Reuse an accessible companion; missing skills install globally. --local/--global restrict lookup and installation to that scope. --check exits 2 when missing, without writes/network. --update applies the catalog pin only to unchanged copies managed by this helper; combine with --dry-run to preview.`);
    return;
  }
  if (args[0] === "list") {
    if (args.length !== 1)
      throw new Error("skill list takes no options.");
    console.log(JSON.stringify(companion_catalog_default.map(({ id, role, when, requirements, paths }) => ({
      id,
      role,
      when,
      requirements,
      agents: "default" in paths ? "directory-mapped agents" : Object.keys(paths)
    })), null, 2));
    return;
  }
  const options = { id: args[0], agent: "" };
  let project = process.cwd(), scope;
  for (let index = 1;index < args.length; index++) {
    const arg = args[index];
    if (arg === "--agent" || arg === "--project") {
      const value = args[++index];
      if (!value || value.startsWith("--"))
        throw new Error(`${arg} needs a value.`);
      if (arg === "--agent")
        options.agent = value;
      else
        project = resolve3(value);
    } else if (arg === "--local" || arg === "--global") {
      if (scope && scope !== arg)
        throw new Error("Choose either --local or --global.");
      scope = arg;
      options.local = arg === "--local";
    } else if (arg === "--check")
      options.check = true;
    else if (arg === "--dry-run")
      options.dryRun = true;
    else if (arg === "--update")
      options.update = true;
    else
      throw new Error(`Unknown companion option: ${arg}`);
  }
  if (!options.agent)
    throw new Error("--agent is required. Use the current agent's identifier; none is assumed.");
  if (options.check && options.dryRun)
    throw new Error("Choose either --check or --dry-run.");
  if (options.check && options.update)
    throw new Error("Choose either --check or --update.");
  const result = ensureCompanion(options, {
    home: resolve3(process.env.WEB_STACK_HOME || homedir()),
    cwd: project,
    env: process.env
  });
  console.log(JSON.stringify(result, null, 2));
  if (result.status === "missing")
    process.exitCode = 2;
}

// installer:cli.ts
var root = resolve4(dirname3(fileURLToPath(import.meta.url)), "..");
var product = readJSON(join3(root, "cli/product.json"));
var agents = readJSON(join3(root, "cli/agents.json"));
var context = {
  home: resolve4(process.env.WEB_STACK_HOME || homedir2()),
  cwd: process.cwd(),
  env: process.env
};
async function main() {
  if (!process.versions.bun && Number(process.versions.node.split(".")[0]) < 22)
    throw new Error("Install Bun or Node.js 22+ to run this CLI.");
  const args = process.argv.slice(2);
  let action = args[0] && !args[0].startsWith("-") ? args.shift() : "setup";
  if (action === "install")
    action = "init";
  if (action === "uninstall")
    action = "remove";
  if (action === "skill") {
    companionMain(args);
    return;
  }
  let global = true, scope, force = false, dryRun = false, help = false, version = false;
  const chosen = [];
  for (let i = 0;i < args.length; i++) {
    const arg = args[i];
    if (arg === "--global" || arg === "--local") {
      if (scope && scope !== arg)
        throw new Error("Choose either --global or --local.");
      scope = arg;
      global = arg === "--global";
    } else if (arg === "--agent" || arg.startsWith("--agent=")) {
      const value = arg.includes("=") ? arg.slice(8) : args[++i];
      if (!value || value.startsWith("-"))
        throw new Error("--agent needs an agent identifier. Run agents to list them.");
      chosen.push(...value.split(","));
    } else if (arg === "--force")
      force = true;
    else if (arg === "--dry-run")
      dryRun = true;
    else if (arg === "--help" || arg === "-h")
      help = true;
    else if (arg === "--version" || arg === "-v")
      version = true;
    else
      throw new Error(`Unknown option: ${arg}`);
  }
  if (version) {
    console.log(product.version);
    return;
  }
  if (help) {
    console.log(`${product.title}

${product.command} [setup|init|remove|agents|skill]

setup     Install the CLI and skills globally (default)
init      Install or update skills using this CLI
remove    Remove this product's skills
agents    List supported agents alphabetically
skill     Find/install one on-demand companion; use skill --help

--agent <id>  Skip the picker; repeat or use comma-separated IDs
--local       Install skills in the current project
--global      Install skills for all projects (default)
--dry-run     Show destinations without writing files
--force       Replace existing or edited copies
--version     Show the bundled version`);
    return;
  }
  if (!["setup", "init", "remove", "agents"].includes(action))
    throw new Error(`Unknown command: ${action}`);
  if (action === "agents") {
    for (const agent of agents)
      console.log(`${agent.id.padEnd(20)} ${agent.label}${!agent.global ? " (project only)" : ""}`);
    return;
  }
  for (const id of chosen)
    if (!agents.some((agent) => agent.id === id))
      throw new Error(`Unknown agent: ${id}. Run ${product.command} agents for the supported identifiers.`);
  const tty = Boolean(process.stdin.isTTY && process.stdout.isTTY);
  if (!chosen.length && !tty)
    throw new Error(`Interactive setup needs a terminal. Use --agent <id>; run ${product.command} agents to list choices.`);
  console.log(heading(`${product.title} · ${global ? "Global" : "Project"} installation`));
  const selected = chosen.length ? [...new Set(chosen)] : await selectAgents(agents, global);
  const targets = agents.filter((agent) => selected.includes(agent.id));
  const plan = planSkills(root, product, targets, global, context, action === "remove");
  const cli = action === "setup" ? planCLI(root, product, context) : undefined;
  if (dryRun) {
    for (const agent of targets)
      console.log(`${agent.label}: ${skillDirectory(agent, global, context)}`);
    if (cli)
      for (const directory of cli.directories)
        console.log(`CLI: ${directory}`);
    if (plan.conflicts.length)
      console.log(`Existing or edited copies: ${plan.conflicts.join(", ")}`);
    console.log("Dry run. No files changed.");
    return;
  }
  if (plan.conflicts.length && !force) {
    if (!tty)
      throw new Error("Existing or edited skills would be replaced. Use --force to replace them explicitly.");
    if (!await allowReplacement(`Replace ${plan.conflicts.length} existing or edited skill copies?`))
      throw new Cancelled;
  }
  applyOperations([...cli?.operations || [], ...plan.operations], cli ? root : undefined);
  for (const directory of plan.directories)
    console.log(`${action === "remove" ? "Removed" : "Installed"} both skills: ${directory}`);
  if (cli?.operations.length) {
    const bin = dirname3(cli.operations.at(-1).target);
    console.log(`CLI installed: ${cli.operations.at(-1).target}`);
    if (!(process.env.PATH || "").split(process.platform === "win32" ? ";" : ":").includes(bin))
      console.log(`Add ${bin} to PATH to use ${product.command} from your terminal.`);
  }
  if (action !== "remove")
    console.log(`Open your website in your agent and use the ${product.id}-kickoff skill.`);
}
main().catch((error) => {
  if (error instanceof Cancelled) {
    process.exitCode = 130;
    return;
  }
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
