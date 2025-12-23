/**
 * FrameNote v0.1 (Monaco + Diagnostics + Outline + Completion + Hover)
 */

/** @typedef {"center"|"stack"|"split"} LayoutType */
/** @typedef {{kind:"text", value:string, size?:"small"|"medium"|"large", weight?:"normal"|"bold", align?:"left"|"center"|"right", tone?:"normal"|"weak", importance?:"low"|"high"}} TextBlock */
/** @typedef {{kind:"diagram", nodes:string[], edges:[number,number][]}} DiagramBlock */
/** @typedef {{kind:"split", left:(TextBlock|DiagramBlock)[], right:(TextBlock|DiagramBlock)[]}} SplitBlock */
/** @typedef {(TextBlock|DiagramBlock|SplitBlock)} SlideBlock */
/** @typedef {{title:string, layout:LayoutType, content:SlideBlock[]}} SlideNode */
/** @typedef {{slides:SlideNode[]}} DocumentNode */
/** @typedef {{line:number, message:string}} Diagnostic */

// -----------------------------
// Utilities
// -----------------------------
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const isBlank = (s) => s.trim().length === 0;

function escapeXml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function stripLeadingWS(line) {
  return line.replace(/^\s+/, "");
}

function parseKeyValue(line) {
  const t = stripLeadingWS(line);
  const idx = t.indexOf(":");
  if (idx === -1) return null;
  const k = t.slice(0, idx).trim();
  const v = t.slice(idx + 1).trim();
  return { k, v };
}

function readQuotedStringFromLine(line, diag, lineNo) {
  const m = line.match(/"([^"]*)"/);
  if (!m) {
    diag.push({ line: lineNo, message: 'Expected a quoted string like "text".' });
    return "";
  }
  return m[1];
}

// -----------------------------
// Parser (line-based, tolerant)
// -----------------------------
/**
 * @param {string} source
 * @returns {{doc: DocumentNode, diagnostics: Diagnostic[]}}
 */
function parseDocument(source) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const diagnostics = /** @type {Diagnostic[]} */([]);
  const slides = /** @type {SlideNode[]} */([]);

  let i = 0;

  function peek() { return lines[i] ?? ""; }
  function next() { i++; return lines[i - 1] ?? ""; }
  function eof() { return i >= lines.length; }

  function parseSlide() {
    next(); // slide:

    let title = "";
    /** @type {LayoutType} */
    let layout = "center";
    /** @type {SlideBlock[]} */
    const content = [];

    // slide properties
    while (!eof()) {
      const t = stripLeadingWS(peek());
      if (t === "slide:" || t === "text:" || t === "diagram:" || t === "left:" || t === "right:") break;
      if (isBlank(t)) { next(); continue; }

      if (t.startsWith("title:")) {
        const kv = parseKeyValue(t);
        title = (kv?.v ?? "").replace(/^"|"$/g, "");
        if (title.length === 0) diagnostics.push({ line: i + 1, message: "title is empty (or missing quotes)." });
        next();
        continue;
      }

      if (t.startsWith("layout:")) {
        const kv = parseKeyValue(t);
        const v = (kv?.v ?? "").trim();
        if (v === "center" || v === "stack" || v === "split") layout = v;
        else diagnostics.push({ line: i + 1, message: `Unknown layout: ${v}` });
        next();
        continue;
      }

      diagnostics.push({ line: i + 1, message: `Unknown slide property: ${t}` });
      next();
    }

    // blocks until next slide
    while (!eof()) {
      const t = stripLeadingWS(peek());
      if (t === "slide:") break;
      if (isBlank(t)) { next(); continue; }

      if (t === "text:") { content.push(parseTextBlock()); continue; }
      if (t === "diagram:") { content.push(parseDiagramBlock()); continue; }
      if (t === "left:" || t === "right:") { content.push(parseSplitBlock()); continue; }

      diagnostics.push({ line: i + 1, message: `Unknown block start: ${t}` });
      next();
    }

    if (!title) diagnostics.push({ line: 0, message: "A slide is missing title:. (Recommended to set it)" });
    return { title: title || "(Untitled)", layout, content };
  }

  function parseTextBlock() {
    next(); // text:

    while (!eof() && isBlank(peek())) next();
    const lineNo = i + 1;
    const raw = next();
    const value = readQuotedStringFromLine(raw, diagnostics, lineNo);

    /** @type {TextBlock} */
    const block = { kind: "text", value };

    while (!eof()) {
      const t = stripLeadingWS(peek());
      if (t === "slide:" || t === "text:" || t === "diagram:" || t === "left:" || t === "right:") break;
      if (isBlank(t)) { next(); break; }

      const kv = parseKeyValue(t);
      if (!kv) {
        diagnostics.push({ line: i + 1, message: `Expected key: value, got: ${t}` });
        next();
        continue;
      }

      const { k, v } = kv;

      if (k === "size" && (v === "small" || v === "medium" || v === "large")) block.size = v;
      else if (k === "weight" && (v === "normal" || v === "bold")) block.weight = v;
      else if (k === "align" && (v === "left" || v === "center" || v === "right")) block.align = v;
      else if (k === "tone" && (v === "normal" || v === "weak")) block.tone = v;
      else if (k === "importance" && (v === "low" || v === "high")) block.importance = v;
      else diagnostics.push({ line: i + 1, message: `Unknown/invalid text property: ${k}: ${v}` });

      next();
    }

    return block;
  }

  function parseDiagramBlock() {
    next(); // diagram:

    /** @type {string[]} */
    const nodes = [];
    /** @type {[number, number][]} */
    const edges = [];

    function nodeIndex(label) {
      let idx = nodes.indexOf(label);
      if (idx === -1) { nodes.push(label); idx = nodes.length - 1; }
      return idx;
    }

    while (!eof()) {
      const t = stripLeadingWS(peek());
      if (t === "slide:" || t === "text:" || t === "diagram:" || t === "left:" || t === "right:") break;
      if (isBlank(t)) { next(); break; }

      const lineNo = i + 1;
      const line = next().trim();

      const boxes = [...line.matchAll(/\[([^\]]*)\]/g)].map(m => (m[1] ?? "").trim());
      const arrows = (line.match(/->/g) || []).length;

      if (boxes.length >= 2 && arrows >= 1) {
        for (let bi = 0; bi < boxes.length - 1; bi++) {
          const a = nodeIndex(boxes[bi]);
          const b = nodeIndex(boxes[bi + 1]);
          edges.push([a, b]);
        }
      } else if (boxes.length === 1) {
        nodeIndex(boxes[0]);
      } else {
        diagnostics.push({ line: lineNo, message: `Unrecognized diagram line: ${line}` });
      }
    }

    return { kind: "diagram", nodes, edges };
  }

  function parseSplitBlock() {
    /** @type {(TextBlock|DiagramBlock)[]} */
    const left = [];
    /** @type {(TextBlock|DiagramBlock)[]} */
    const right = [];

    /** @type {null|"left"|"right"} */
    let side = null;

    while (!eof()) {
      const t = stripLeadingWS(peek());
      if (t === "slide:") break;

      if (t === "left:") { side = "left"; next(); continue; }
      if (t === "right:") { side = "right"; next(); continue; }

      if (isBlank(t)) { next(); continue; }

      if (t === "text:") {
        const b = parseTextBlock();
        if (side === "left") left.push(b);
        else if (side === "right") right.push(b);
        else diagnostics.push({ line: i + 1, message: "text: inside split without left:/right: (ignored)" });
        continue;
      }

      if (t === "diagram:") {
        const b = parseDiagramBlock();
        if (side === "left") left.push(b);
        else if (side === "right") right.push(b);
        else diagnostics.push({ line: i + 1, message: "diagram: inside split without left:/right: (ignored)" });
        continue;
      }

      diagnostics.push({ line: i + 1, message: `Unknown line in split block: ${t}` });
      next();
    }

    return { kind: "split", left, right };
  }

  while (i < lines.length) {
    const t = stripLeadingWS(peek());
    if (t === "slide:") { slides.push(parseSlide()); continue; }
    i++;
  }

  if (slides.length === 0) {
    diagnostics.push({ line: 0, message: 'No slides found. Start with:\nslide:\n  title: "..."' });
  }

  return { doc: { slides }, diagnostics };
}

// -----------------------------
// Renderer (SVG)
// -----------------------------
const CANVAS_W = 1600;
const CANVAS_H = 900;

/**
 * @param {SVGSVGElement} svg
 * @param {SlideNode} slide
 */
function renderSlide(svg, slide) {
  svg.innerHTML = "";
  svg.insertAdjacentHTML("beforeend",
    `<rect x="0" y="0" width="${CANVAS_W}" height="${CANVAS_H}" fill="white"/>`
  );

  svg.insertAdjacentHTML("beforeend", `
    <text x="80" y="90" font-size="44" font-family="ui-sans-serif, system-ui" fill="#111">
      ${escapeXml(slide.title)}
    </text>
    <line x1="80" y1="120" x2="${CANVAS_W - 80}" y2="120" stroke="#e6e6e6" stroke-width="2"/>
  `);

  const x0 = 80, x1 = CANVAS_W - 80;
  const y0 = 160, y1 = CANVAS_H - 80;

  if (slide.layout === "split") {
    const split = slide.content.find(b => b.kind === "split");
    const leftBlocks = split?.kind === "split"
      ? split.left
      : slide.content.filter(b => b.kind !== "split").slice(0, 2);

    const rightBlocks = split?.kind === "split"
      ? split.right
      : slide.content.filter(b => b.kind !== "split").slice(2);

    renderBlocks(svg, leftBlocks, x0, (x0 + x1) / 2 - 20, y0, y1, "stack");
    renderBlocks(svg, rightBlocks, (x0 + x1) / 2 + 20, x1, y0, y1, "stack");
    return;
  }

  renderBlocks(svg, slide.content.filter(b => b.kind !== "split"), x0, x1, y0, y1, slide.layout);
}

function estimateBlockHeight(block, width) {
  if (block.kind === "text") {
    const size = block.size ?? "medium";
    const px = size === "large" ? 44 : size === "small" ? 26 : 34;
    const charsPerLine = Math.max(12, Math.floor(width / (px * 0.55)));
    const lines = Math.max(1, Math.ceil((block.value.length || 1) / charsPerLine));
    return clamp(lines * (px + 10) + 8, 60, 260);
  }
  if (block.kind === "diagram") {
    return clamp(220 + Math.max(0, block.nodes.length - 3) * 25, 220, 360);
  }
  return 120;
}

function renderBlocks(svg, blocks, x0, x1, y0, y1, layout) {
  const items = blocks.filter(b => b.kind !== "split");
  if (items.length === 0) return;

  const availableH = y1 - y0;
  const gap = 26;

  const heights = items.map(b => estimateBlockHeight(b, x1 - x0));
  const totalH = heights.reduce((a, b) => a + b, 0) + gap * (items.length - 1);

  let y = y0;
  if (layout === "center") y = y0 + Math.max(0, (availableH - totalH) / 2);

  for (let idx = 0; idx < items.length; idx++) {
    const b = items[idx];
    const h = heights[idx];
    if (b.kind === "text") renderText(svg, b, x0, x1, y, h);
    if (b.kind === "diagram") renderDiagram(svg, b, x0, x1, y, h);
    y += h + gap;
  }
}

function renderText(svg, block, x0, x1, y, h) {
  const size = block.size ?? "medium";
  const weight = block.weight ?? "normal";
  const align = block.align ?? "left";
  const tone = block.tone ?? "normal";
  const importance = block.importance ?? "low";

  const fontSize = size === "large" ? 44 : size === "small" ? 26 : 34;
  const fontWeight = weight === "bold" ? 700 : 400;

  let color = "#111";
  if (tone === "weak") color = "#666";
  if (importance === "high") color = "#0b3dff";

  const padding = 10;
  const w = x1 - x0;

  let textAlign = "left";
  if (align === "center") textAlign = "center";
  if (align === "right") textAlign = "right";

  svg.insertAdjacentHTML("beforeend", `
    <foreignObject x="${x0}" y="${y}" width="${w}" height="${h}">
      <div xmlns="http://www.w3.org/1999/xhtml"
           style="
             width:${w}px; height:${h}px;
             padding:${padding}px;
             box-sizing:border-box;
             font-family: ui-sans-serif, system-ui;
             font-size:${fontSize}px;
             font-weight:${fontWeight};
             color:${color};
             line-height:1.15;
             text-align:${textAlign};
             overflow:hidden;
           ">
        ${escapeXml(block.value)}
      </div>
    </foreignObject>
  `);
}

function renderDiagram(svg, diagram, x0, x1, y, h) {
  const nodes = diagram.nodes;
  if (nodes.length === 0) return;

  const boxH = 92;
  const boxW = clamp((x1 - x0) / Math.max(2, nodes.length) * 0.9, 220, 360);
  const centerY = y + h / 2;

  const totalW = (nodes.length * boxW) + (Math.max(0, nodes.length - 1) * 70);
  const startX = x0 + Math.max(0, ((x1 - x0) - totalW) / 2);

  const markerId = "arrowHead";
  if (!svg.querySelector(`#${markerId}`)) {
    svg.insertAdjacentHTML("beforeend", `
      <defs>
        <marker id="${markerId}" viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#333"></path>
        </marker>
      </defs>
    `);
  }

  const pos = [];
  for (let i = 0; i < nodes.length; i++) {
    const x = startX + i * (boxW + 70);
    const by = centerY - boxH / 2;
    pos.push({ x, y: by, w: boxW, h: boxH });
  }

  for (const [a, b] of diagram.edges) {
    if (a < 0 || b < 0 || a >= pos.length || b >= pos.length) continue;
    const A = pos[a], B = pos[b];

    svg.insertAdjacentHTML("beforeend", `
      <line x1="${A.x + A.w + 20}" y1="${A.y + A.h / 2}"
            x2="${B.x - 20}" y2="${B.y + B.h / 2}"
            stroke="#333" stroke-width="4"
            marker-end="url(#${markerId})" />
    `);
  }

  for (let i = 0; i < nodes.length; i++) {
    const p = pos[i];
    const label = nodes[i];

    svg.insertAdjacentHTML("beforeend", `
      <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}"
            rx="14" ry="14" fill="#f7f7f7" stroke="#cfcfcf" stroke-width="2"></rect>
      <foreignObject x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}">
        <div xmlns="http://www.w3.org/1999/xhtml"
             style="
               width:${p.w}px; height:${p.h}px;
               display:flex; align-items:center; justify-content:center;
               padding:12px; box-sizing:border-box;
               font-family: ui-sans-serif, system-ui;
               font-size:28px; color:#111;
               text-align:center; line-height:1.15;
             ">
          ${escapeXml(label)}
        </div>
      </foreignObject>
    `);
  }
}

// -----------------------------
// UI state & Outline
// -----------------------------
const svgEl = /** @type {SVGSVGElement} */(document.getElementById("slide"));
const errorsEl = document.getElementById("errors");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const slideIndexEl = document.getElementById("slideIndex");
const slideCountEl = document.getElementById("slideCount");
const outlineListEl = document.getElementById("outlineList");
const outlineCountEl = document.getElementById("outlineCount");

let currentDoc = /** @type {DocumentNode} */({ slides: [] });
let diagnostics = /** @type {Diagnostic[]} */([]);
let currentSlideIndex = 0;
let lastGoodDoc = /** @type {DocumentNode} */({ slides: [] });

function renderOutline() {
  const slides = currentDoc.slides;
  outlineCountEl.textContent = String(slides.length);

  outlineListEl.innerHTML = "";
  slides.forEach((s, idx) => {
    const item = document.createElement("div");
    item.className = "outline-item" + (idx === currentSlideIndex ? " active" : "");
    item.setAttribute("role", "listitem");
    item.tabIndex = 0;

    const num = document.createElement("div");
    num.className = "outline-num";
    num.textContent = String(idx + 1);

    const text = document.createElement("div");
    text.className = "outline-text";

    const title = document.createElement("div");
    title.className = "outline-titleline";
    title.textContent = s.title || "(Untitled)";

    const sub = document.createElement("div");
    sub.className = "outline-sub";
    sub.textContent = s.layout ? `layout: ${s.layout}` : "layout: center";

    text.appendChild(title);
    text.appendChild(sub);

    item.appendChild(num);
    item.appendChild(text);

    item.addEventListener("click", () => {
      currentSlideIndex = idx;
      updateUI();
    });
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        currentSlideIndex = idx;
        updateUI();
      }
    });

    outlineListEl.appendChild(item);
  });
}

function updateUI() {
  const slides = currentDoc.slides;
  const count = slides.length;

  slideCountEl.textContent = String(count);
  slideIndexEl.textContent = String(count === 0 ? 0 : currentSlideIndex + 1);

  prevBtn.disabled = count === 0 || currentSlideIndex <= 0;
  nextBtn.disabled = count === 0 || currentSlideIndex >= count - 1;

  if (diagnostics.length === 0) {
    errorsEl.textContent = "";
  } else {
    errorsEl.textContent = diagnostics
      .slice(0, 40)
      .map(d => d.line === 0 ? `⚠ ${d.message}` : `⚠ line ${d.line}: ${d.message}`)
      .join("\n");
  }

  renderOutline();

  if (count === 0) {
    svgEl.innerHTML = `
      <rect x="0" y="0" width="${CANVAS_W}" height="${CANVAS_H}" fill="white"/>
      <text x="800" y="430" text-anchor="middle" font-size="44" fill="#111"
            font-family="ui-sans-serif, system-ui">FrameNote</text>
      <text x="800" y="490" text-anchor="middle" font-size="22" fill="#666"
            font-family="ui-sans-serif, system-ui">Create a slide by typing "slide:"</text>
    `;
    return;
  }

  renderSlide(svgEl, slides[currentSlideIndex]);
}

function gotoSlide(delta) {
  const count = currentDoc.slides.length;
  if (count === 0) return;
  currentSlideIndex = clamp(currentSlideIndex + delta, 0, count - 1);
  updateUI();
}

prevBtn.addEventListener("click", () => gotoSlide(-1));
nextBtn.addEventListener("click", () => gotoSlide(+1));
window.addEventListener("keydown", (e) => {
  if (e.key === "PageUp") { e.preventDefault(); gotoSlide(-1); }
  if (e.key === "PageDown") { e.preventDefault(); gotoSlide(+1); }
});

// -----------------------------
// Monaco diagnostics (markers)
// -----------------------------
function applyDiagnosticsToMonaco(monacoObj, model, diags) {
  if (!monacoObj || !model) return;

  const markers = diags
    .filter(d => d.line > 0 && d.line <= model.getLineCount())
    .map(d => ({
      severity: monacoObj.MarkerSeverity.Warning,
      message: d.message,
      startLineNumber: d.line,
      endLineNumber: d.line,
      startColumn: 1,
      endColumn: model.getLineMaxColumn(d.line),
    }));

  monacoObj.editor.setModelMarkers(model, "framenote", markers);
}

// -----------------------------
// Completion + Hover (shared dictionary)
// -----------------------------
const DSL = {
  blocks: [
    { key: "slide:", insert: "slide:\n  title: \"Untitled\"\n  layout: center\n\n", doc: "Start a new slide." },
    { key: "text:", insert: "text:\n  \"Your text here\"\n  size: medium\n\n", doc: "Add a text block." },
    { key: "diagram:", insert: "diagram:\n  [A] -> [B] -> [C]\n\n", doc: "Add a box-arrow diagram (v0.1: horizontal)." },
    { key: "left:", insert: "left:\n  text:\n    \"Left\"\n\n", doc: "Split layout: left column." },
    { key: "right:", insert: "right:\n  text:\n    \"Right\"\n\n", doc: "Split layout: right column." },
  ],
  properties: [
    { key: "title:", insert: "title: \"\"", doc: "Slide title (string)." },
    { key: "layout:", insert: "layout: ", doc: "Slide layout.\n\n- center: vertically centered\n- stack : top-to-bottom\n- split : two-column" },
    { key: "size:", insert: "size: ", doc: "Text size.\n\n- small\n- medium\n- large" },
    { key: "weight:", insert: "weight: ", doc: "Text weight.\n\n- normal\n- bold" },
    { key: "align:", insert: "align: ", doc: "Text alignment.\n\n- left\n- center\n- right" },
    { key: "tone:", insert: "tone: ", doc: "Text tone.\n\n- normal\n- weak" },
    { key: "importance:", insert: "importance: ", doc: "Importance hint.\n\n- low\n- high" },
  ],
  values: {
    "layout:": [
      { key: "center", doc: "Vertically center content." },
      { key: "stack", doc: "Top-to-bottom blocks." },
      { key: "split", doc: "Two columns (left/right)." },
    ],
    "size:": [
      { key: "small", doc: "Small text." },
      { key: "medium", doc: "Default text size." },
      { key: "large", doc: "Large text." },
    ],
    "weight:": [
      { key: "normal", doc: "Normal weight." },
      { key: "bold", doc: "Bold weight." },
    ],
    "align:": [
      { key: "left", doc: "Left aligned." },
      { key: "center", doc: "Center aligned." },
      { key: "right", doc: "Right aligned." },
    ],
    "tone:": [
      { key: "normal", doc: "Normal tone." },
      { key: "weak", doc: "Muted tone." },
    ],
    "importance:": [
      { key: "low", doc: "Not emphasized." },
      { key: "high", doc: "Emphasized (accent color)." },
    ],
  }
};

function buildHoverMarkdownForWord(word) {
  if (!word) return null;

  // Normalize: allow both "layout" and "layout:"
  const w = word.endsWith(":") ? word : (word + ":");

  const block = DSL.blocks.find(b => b.key === w);
  if (block) {
    return `**${block.key}**\n\n${block.doc}`;
  }

  const prop = DSL.properties.find(p => p.key === w);
  if (prop) {
    return `**${prop.key}**\n\n${prop.doc}`;
  }

  // Values: search across all enums
  for (const [propKey, vals] of Object.entries(DSL.values)) {
    const hit = vals.find(v => v.key === word);
    if (hit) {
      return `**${word}**\n\n${hit.doc}\n\n*(value for \`${propKey}\`)*`;
    }
  }

  return null;
}

// -----------------------------
// Monaco integration (CDN)
// -----------------------------
let monacoEditor = null;

function initialContent() {
  return `slide:
  title: "FrameNote"
  layout: center

text:
  "Notes that become frames."
  size: large
  weight: bold
  align: center
  importance: high

diagram:
  [Input] -> [AST] -> [SVG Preview]


slide:
  title: "Split Layout"
  layout: split

left:
  text:
    "Explanation"
    size: medium
  diagram:
    [A] -> [B] -> [C]

right:
  text:
    "Key points"
    size: large
    weight: bold
    tone: weak

slide:
  title: "Try completion + hover"
  layout: center

text:
  "Type: lay + Ctrl+Space, then hover layout/split."
  siz: large
`;
}

function reparseAndRenderFromMonaco(monacoObj) {
  if (!monacoEditor) return;

  const model = monacoEditor.getModel();
  const src = monacoEditor.getValue();
  const result = parseDocument(src);

  if (result.doc.slides.length > 0) {
    currentDoc = result.doc;
    lastGoodDoc = result.doc;
  } else {
    currentDoc = lastGoodDoc;
  }

  diagnostics = result.diagnostics;
  applyDiagnosticsToMonaco(monacoObj, model, diagnostics);

  currentSlideIndex = clamp(currentSlideIndex, 0, Math.max(0, currentDoc.slides.length - 1));
  updateUI();
}

require.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs" }
});

require(["vs/editor/editor.main"], function () {
  const monacoObj = window.monaco;

  // language + tokens
  monacoObj.languages.register({ id: "framenote" });
  monacoObj.languages.setMonarchTokensProvider("framenote", {
    tokenizer: {
      root: [
        [/^\s*(slide:|text:|diagram:|left:|right:)\b/, "keyword"],
        [/\b(title|layout|size|weight|align|tone|importance)\b(?=\s*:)/, "attribute.name"],
        [/".*?"/, "string"],
        [/\[[^\]]*\]/, "type"],
        [/->/, "operator"],
      ],
    }
  });

  monacoObj.editor.defineTheme("framenote-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "7aa2ff", fontStyle: "bold" },
      { token: "attribute.name", foreground: "9ece6a" },
      { token: "string", foreground: "f7768e" },
      { token: "type", foreground: "e0af68" },
      { token: "operator", foreground: "bb9af7" },
    ],
    colors: { "editor.background": "#151925" }
  });

  const SNIPPETS = [
  {
    label: "slide",
    description: "New slide",
    body: [
      "slide:",
      "  title: \"${1:Title}\"",
      "  layout: ${2|center,stack,split|}",
      "",
      "$0"
    ].join("\n")
  },
  {
    label: "text",
    description: "Text block",
    body: [
      "text:",
      "  \"${1:Your text here}\"",
      "  size: ${2|small,medium,large|}",
      "  weight: ${3|normal,bold|}",
      "  align: ${4|left,center,right|}",
      "",
      "$0"
    ].join("\n")
  },
  {
    label: "diagram",
    description: "Box-arrow diagram",
    body: [
      "diagram:",
      "  [${1:A}] -> [${2:B}] -> [${3:C}]",
      "",
      "$0"
    ].join("\n")
  },
  {
    label: "split",
    description: "Split layout",
    body: [
      "layout: split",
      "",
      "left:",
      "  text:",
      "    \"${1:Left content}\"",
      "",
      "right:",
      "  text:",
      "    \"${2:Right content}\"",
      "",
      "$0"
    ].join("\n")
  }
];

monaco.languages.registerCompletionItemProvider("framenote", {
  triggerCharacters: ["\t"],
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position);
    const range = new monaco.Range(
      position.lineNumber,
      word.startColumn,
      position.lineNumber,
      word.endColumn
    );

    const suggestions = SNIPPETS.map(s => ({
      label: s.label,
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: s.body,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: { value: `**${s.label}**\n\n${s.description}` },
      range
    }));

    return { suggestions };
  }
});

  // Completion
  monacoObj.languages.registerCompletionItemProvider("framenote", {
    triggerCharacters: [":", " "],
    provideCompletionItems: (model, position) => {
      const line = model.getLineContent(position.lineNumber);
      const before = line.slice(0, Math.max(0, position.column - 1));
      const trimmed = before.trimStart();

      // word range under cursor (for replacement)
      const word = model.getWordUntilPosition(position);
      const range = new monacoObj.Range(
        position.lineNumber,
        word.startColumn,
        position.lineNumber,
        word.endColumn
      );

      /** @type {any[]} */
      const suggestions = [];

      const atLineStart = trimmed.length === 0;
      const hasColon = trimmed.includes(":");

      // Case A: line start -> suggest blocks (and properties lightly)
      if (atLineStart) {
        for (const b of DSL.blocks) {
          suggestions.push({
            label: b.key,
            kind: monacoObj.languages.CompletionItemKind.Keyword,
            insertText: b.insert,
            documentation: { value: `**${b.key}**\n\n${b.doc}` },
            range
          });
        }
        for (const p of DSL.properties) {
          suggestions.push({
            label: p.key,
            kind: monacoObj.languages.CompletionItemKind.Property,
            insertText: p.insert,
            documentation: { value: `**${p.key}**\n\n${p.doc}` },
            range
          });
        }
        return { suggestions };
      }

      // Case B: typing a key before ":" (e.g., lay -> layout:)
      if (!hasColon) {
        // suggest blocks and properties by prefix
        for (const b of DSL.blocks) {
          suggestions.push({
            label: b.key,
            kind: monacoObj.languages.CompletionItemKind.Keyword,
            insertText: b.key,
            documentation: { value: `**${b.key}**\n\n${b.doc}` },
            range
          });
        }
        for (const p of DSL.properties) {
          suggestions.push({
            label: p.key,
            kind: monacoObj.languages.CompletionItemKind.Property,
            insertText: p.key,
            documentation: { value: `**${p.key}**\n\n${p.doc}` },
            range
          });
        }
        return { suggestions };
      }

      // Case C: after "prop:" -> suggest values if known enum
      // Detect the nearest "xxxxx:" on this line
      const m = trimmed.match(/([a-zA-Z]+:)\s*[^:]*(?:$)/);
      const propKey = m ? (m[1].toLowerCase()) : null;

      if (propKey && DSL.values[propKey]) {
        for (const v of DSL.values[propKey]) {
          suggestions.push({
            label: v.key,
            kind: monacoObj.languages.CompletionItemKind.EnumMember,
            insertText: v.key,
            documentation: { value: `**${v.key}**\n\n${v.doc}\n\n*(value for \`${propKey}\`)*` },
            range
          });
        }
        return { suggestions };
      }

      // Fallback: show properties (useful when cursor is in property area)
      for (const p of DSL.properties) {
        suggestions.push({
          label: p.key,
          kind: monacoObj.languages.CompletionItemKind.Property,
          insertText: p.key,
          documentation: { value: `**${p.key}**\n\n${p.doc}` },
          range
        });
      }

      return { suggestions };
    }
  });

  // Hover
  monacoObj.languages.registerHoverProvider("framenote", {
    provideHover: (model, position) => {
      const wordInfo = model.getWordAtPosition(position);
      if (!wordInfo || !wordInfo.word) return null;

      const md = buildHoverMarkdownForWord(wordInfo.word);
      if (!md) return null;

      return {
        range: new monacoObj.Range(
          position.lineNumber,
          wordInfo.startColumn,
          position.lineNumber,
          wordInfo.endColumn
        ),
        contents: [{ value: md }]
      };
    }
  });

  // create editor
  monacoEditor = monacoObj.editor.create(document.getElementById("editor"), {
    value: initialContent(),
    language: "framenote",
    theme: "framenote-dark",
    fontSize: 13,
    lineHeight: 20,
    minimap: { enabled: false },
    automaticLayout: true,
    tabSize: 2,
    scrollBeyondLastLine: false,
    padding: { top: 10, bottom: 10 }
  });

  monacoEditor.onDidChangeModelContent(() => reparseAndRenderFromMonaco(monacoObj));
  reparseAndRenderFromMonaco(monacoObj);
});
