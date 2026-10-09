#!/usr/bin/env node

// installer:cli.ts
import { homedir } from "node:os";
import { dirname as dirname2, join as join2, resolve as resolve2 } from "node:path";
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
var require_multiselect = __commonJS(function(exports, module) {
  var color = require_kleur();
  var { cursor } = require_src();
  var Prompt = require_prompt();
  var { clear, figures, style, wrap, entriesToDisplay } = require_util();

  class MultiselectPrompt extends Prompt {
    constructor(opts = {}) {
      super(opts);
      this.msg = opts.message;
      this.cursor = opts.cursor || 0;
      this.scrollIndex = opts.cursor || 0;
      this.hint = opts.hint || "";
      this.warn = opts.warn || "- This option is disabled -";
      this.minSelected = opts.min;
      this.showMinError = false;
      this.maxChoices = opts.max;
      this.instructions = opts.instructions;
      this.optionsPerPage = opts.optionsPerPage || 10;
      this.value = opts.choices.map((ch, idx) => {
        if (typeof ch === "string")
          ch = { title: ch, value: idx };
        return {
          title: ch && (ch.title || ch.value || ch),
          description: ch && ch.description,
          value: ch && (ch.value === undefined ? idx : ch.value),
          selected: ch && ch.selected,
          disabled: ch && ch.disabled
        };
      });
      this.clear = clear("", this.out.columns);
      if (!opts.overrideRender) {
        this.render();
      }
    }
    reset() {
      this.value.map((v) => !v.selected);
      this.cursor = 0;
      this.fire();
      this.render();
    }
    selected() {
      return this.value.filter((v) => v.selected);
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
      const selected = this.value.filter((e) => e.selected);
      if (this.minSelected && selected.length < this.minSelected) {
        this.showMinError = true;
        this.render();
      } else {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
    }
    first() {
      this.cursor = 0;
      this.render();
    }
    last() {
      this.cursor = this.value.length - 1;
      this.render();
    }
    next() {
      this.cursor = (this.cursor + 1) % this.value.length;
      this.render();
    }
    up() {
      if (this.cursor === 0) {
        this.cursor = this.value.length - 1;
      } else {
        this.cursor--;
      }
      this.render();
    }
    down() {
      if (this.cursor === this.value.length - 1) {
        this.cursor = 0;
      } else {
        this.cursor++;
      }
      this.render();
    }
    left() {
      this.value[this.cursor].selected = false;
      this.render();
    }
    right() {
      if (this.value.filter((e) => e.selected).length >= this.maxChoices)
        return this.bell();
      this.value[this.cursor].selected = true;
      this.render();
    }
    handleSpaceToggle() {
      const v = this.value[this.cursor];
      if (v.selected) {
        v.selected = false;
        this.render();
      } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
        return this.bell();
      } else {
        v.selected = true;
        this.render();
      }
    }
    toggleAll() {
      if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
        return this.bell();
      }
      const newSelected = !this.value[this.cursor].selected;
      this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
      this.render();
    }
    _(c, key) {
      if (c === " ") {
        this.handleSpaceToggle();
      } else if (c === "a") {
        this.toggleAll();
      } else {
        return this.bell();
      }
    }
    renderInstructions() {
      if (this.instructions === undefined || this.instructions) {
        if (typeof this.instructions === "string") {
          return this.instructions;
        }
        return `
Instructions:
` + `    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
` + `    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === undefined ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
      }
      return "";
    }
    renderOption(cursor2, v, i, arrowIndicator) {
      const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
      let title, desc;
      if (v.disabled) {
        title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
      } else {
        title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        if (cursor2 === i && v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = `
` + wrap(v.description, { margin: prefix.length, width: this.out.columns });
          }
        }
      }
      return prefix + title + color.gray(desc || "");
    }
    paginateOptions(options) {
      if (options.length === 0) {
        return color.red("No matches for this query.");
      }
      let { startIndex, endIndex } = entriesToDisplay(this.cursor, options.length, this.optionsPerPage);
      let prefix, styledOptions = [];
      for (let i = startIndex;i < endIndex; i++) {
        if (i === startIndex && startIndex > 0) {
          prefix = figures.arrowUp;
        } else if (i === endIndex - 1 && endIndex < options.length) {
          prefix = figures.arrowDown;
        } else {
          prefix = " ";
        }
        styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
      }
      return `
` + styledOptions.join(`
`);
    }
    renderOptions(options) {
      if (!this.done) {
        return this.paginateOptions(options);
      }
      return "";
    }
    renderDoneOrInstructions() {
      if (this.done) {
        return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
      }
      const output = [color.gray(this.hint), this.renderInstructions()];
      if (this.value[this.cursor].disabled) {
        output.push(color.yellow(this.warn));
      }
      return output.join(" ");
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      super.render();
      let prompt = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(false),
        this.renderDoneOrInstructions()
      ].join(" ");
      if (this.showMinError) {
        prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
        this.showMinError = false;
      }
      prompt += this.renderOptions(this.value);
      this.out.write(this.clear + prompt);
      this.clear = clear(prompt, this.out.columns);
    }
  }
  module.exports = MultiselectPrompt;
});
var require_autocompleteMultiselect = __commonJS(function(exports, module) {
  var color = require_kleur();
  var { cursor } = require_src();
  var MultiselectPrompt = require_multiselect();
  var { clear, style, figures } = require_util();

  class AutocompleteMultiselectPrompt extends MultiselectPrompt {
    constructor(opts = {}) {
      opts.overrideRender = true;
      super(opts);
      this.inputValue = "";
      this.clear = clear("", this.out.columns);
      this.filteredOptions = this.value;
      this.render();
    }
    last() {
      this.cursor = this.filteredOptions.length - 1;
      this.render();
    }
    next() {
      this.cursor = (this.cursor + 1) % this.filteredOptions.length;
      this.render();
    }
    up() {
      if (this.cursor === 0) {
        this.cursor = this.filteredOptions.length - 1;
      } else {
        this.cursor--;
      }
      this.render();
    }
    down() {
      if (this.cursor === this.filteredOptions.length - 1) {
        this.cursor = 0;
      } else {
        this.cursor++;
      }
      this.render();
    }
    left() {
      this.filteredOptions[this.cursor].selected = false;
      this.render();
    }
    right() {
      if (this.value.filter((e) => e.selected).length >= this.maxChoices)
        return this.bell();
      this.filteredOptions[this.cursor].selected = true;
      this.render();
    }
    delete() {
      if (this.inputValue.length) {
        this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
        this.updateFilteredOptions();
      }
    }
    updateFilteredOptions() {
      const currentHighlight = this.filteredOptions[this.cursor];
      this.filteredOptions = this.value.filter((v) => {
        if (this.inputValue) {
          if (typeof v.title === "string") {
            if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          if (typeof v.value === "string") {
            if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
        return true;
      });
      const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
      this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
      this.render();
    }
    handleSpaceToggle() {
      const v = this.filteredOptions[this.cursor];
      if (v.selected) {
        v.selected = false;
        this.render();
      } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
        return this.bell();
      } else {
        v.selected = true;
        this.render();
      }
    }
    handleInputChange(c) {
      this.inputValue = this.inputValue + c;
      this.updateFilteredOptions();
    }
    _(c, key) {
      if (c === " ") {
        this.handleSpaceToggle();
      } else {
        this.handleInputChange(c);
      }
    }
    renderInstructions() {
      if (this.instructions === undefined || this.instructions) {
        if (typeof this.instructions === "string") {
          return this.instructions;
        }
        return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
      }
      return "";
    }
    renderCurrentInput() {
      return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
    }
    renderOption(cursor2, v, i) {
      let title;
      if (v.disabled)
        title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
      else
        title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
      return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
    }
    renderDoneOrInstructions() {
      if (this.done) {
        return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
      }
      const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
      if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
        output.push(color.yellow(this.warn));
      }
      return output.join(" ");
    }
    render() {
      if (this.closed)
        return;
      if (this.firstRender)
        this.out.write(cursor.hide);
      super.render();
      let prompt = [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(false),
        this.renderDoneOrInstructions()
      ].join(" ");
      if (this.showMinError) {
        prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
        this.showMinError = false;
      }
      prompt += this.renderOptions(this.filteredOptions);
      this.out.write(this.clear + prompt);
      this.clear = clear(prompt, this.out.columns);
    }
  }
  module.exports = AutocompleteMultiselectPrompt;
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
var import_autocompleteMultiselect = __toESM(require_autocompleteMultiselect(), 1);
var import_confirm = __toESM(require_confirm(), 1);
var import_prompt = __toESM(require_prompt(), 1);
var import_util = __toESM(require_util(), 1);
var import_sisteransi = __toESM(require_src(), 1);

class SearchPicker extends import_autocompleteMultiselect.default {
  constructor(options) {
    super(options);
    this.onResize = () => this.render();
    this.out.on("resize", this.onResize);
  }
  close() {
    if (this.onResize)
      this.out.off("resize", this.onResize);
    super.close();
  }
  handleSpaceToggle() {
    if (this.filteredOptions.length)
      super.handleSpaceToggle();
    else
      this.bell();
  }
  left() {
    if (this.filteredOptions.length)
      super.left();
    else
      this.bell();
  }
  right() {
    if (this.filteredOptions.length)
      super.right();
    else
      this.bell();
  }
  renderOption(focused, option, index, pageArrow) {
    return `${focused === index ? ">" : " "} ${pageArrow || " "} ${super.renderOption(focused, option, index)}`;
  }
  renderDoneOrInstructions() {
    return this.done ? `${this.value.filter((option) => option.selected).length} selected` : super.renderDoneOrInstructions();
  }
  render() {
    if (this.closed)
      return;
    if (this.firstRender)
      this.out.write(import_sisteransi.cursor.hide);
    import_prompt.default.prototype.render.call(this);
    this.optionsPerPage = Math.max(1, Math.min(6, (this.out.rows || 24) - 10));
    const lines = [`${this.done ? this.aborted ? "×" : "✔" : "?"} ${this.msg}`];
    if (this.done)
      lines.push(this.renderDoneOrInstructions());
    else
      lines.push(this.instructions, `Search: ${this.inputValue || "Type to filter"} (${this.filteredOptions.length}/${this.value.length})`);
    const frame = lines.join(`
`) + this.renderOptions(this.filteredOptions);
    this.out.write(this.clear + frame);
    this.clear = import_util.clear(frame, this.out.columns);
  }
}
function ask(Prompt2, options, format = (value) => value) {
  return new Promise((resolve, reject) => {
    const prompt = new Prompt2(options);
    prompt.on("submit", (value) => resolve(format(value)));
    prompt.on("abort", () => reject(new Error("cancelled")));
  });
}
var multiselect = (options) => ask(SearchPicker, options, (values) => values.filter((option) => option.selected).map((option) => option.value));
var confirm = (options) => ask(import_confirm.default, options);

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
  const optionsPerPage = Math.max(1, Math.min(6, (process.stdout.rows || 24) - 10));
  const choices = (popular) => agents.filter((agent) => agent.popular === popular && (!global || agent.global)).map((agent) => ({ value: agent.id, title: agent.label }));
  const settings = {
    optionsPerPage,
    min: 0,
    instructions: "Type to search; arrows move; Space selects; Enter confirms"
  };
  while (true) {
    const popular = await ask2(multiselect({ message: "Popular agents", choices: choices(true), ...settings }));
    const more = await ask2(confirm({ message: "Install additional agents?", initial: false }));
    const additional = more ? await ask2(multiselect({ message: "Additional agents", choices: choices(false), ...settings })) : [];
    const selected = [...popular, ...additional];
    if (selected.length)
      return selected;
    console.log("Choose at least one agent. You can leave Popular agents empty and choose an additional agent.");
  }
}
async function allowReplacement(message) {
  return Boolean(await ask2(confirm({ message, initial: false })));
}

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

// installer:cli.ts
var root = resolve2(dirname2(fileURLToPath(import.meta.url)), "..");
var product = readJSON(join2(root, "cli/product.json"));
var agents = readJSON(join2(root, "cli/agents.json"));
var context = {
  home: resolve2(process.env.WEB_STACK_HOME || homedir()),
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

${product.command} [setup|init|remove|agents]

setup     Install the CLI and skills globally (default)
init      Install or update skills using this CLI
remove    Remove this product's skills
agents    List supported agents alphabetically

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
  console.log(`${product.title} · ${global ? "Global" : "Project"} installation`);
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
    const bin = dirname2(cli.operations.at(-1).target);
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
