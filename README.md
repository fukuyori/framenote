# FrameNote v0.1

**FrameNote** is a lightweight slide-authoring tool where  
**plain text notes are directly rendered into presentation slides**.

You write. It previews instantly.  
No WYSIWYG, no drag-and-drop — just structure and intent.

---

## ✨ Features (v0.1)

### Core Concept
- Write slides using a simple, readable DSL
- Instant live preview
- Fixed 16:9 aspect ratio
- Designed for clarity, not decoration

---

### Language (DSL)
FrameNote provides a minimal, structured language:

- Blocks:
  - `slide`
  - `text`
  - `diagram`
  - `left` / `right` (for split layout)

- Properties:
  - `title`
  - `layout`
  - `size`
  - `weight`
  - `align`
  - `tone`
  - `importance`

- Enumerated values (with validation):
  - `layout: center | stack | split`
  - `size: small | medium | large`
  - `align: left | center | right`
  - `importance: low | high`

---

### Live Preview
- Slides are rendered as **SVG**
- Layouts supported:
  - `center`
  - `stack`
  - `split`
- Text auto-sizing and alignment
- Box–arrow diagrams (horizontal, v0.1)

---

### Editor Experience
Powered by **Monaco Editor** (VS Code core):

- Syntax highlighting
- Diagnostics with inline squiggles
- Slide outline (click to jump)
- Code completion (blocks, properties, values)
- Hover documentation
- Snippets with **Tab expansion**
  - `slide<Tab>`
  - `text<Tab>`
  - `diagram<Tab>`
  - `split<Tab>`

---

### Error-Tolerant Design
- Syntax or semantic errors do not break preview
- Last valid slide state is preserved
- Errors are shown both inline and in a diagnostics panel

---

## 🧠 Design Philosophy

- Text is the source of truth
- Structure over decoration
- Errors should guide, not block
- The editor should *teach the language*

FrameNote is not a PowerPoint replacement.  
It is a **thinking tool** for structured slides.

---

## 🚀 Getting Started

### Requirements
- Modern browser (Chrome, Edge, Firefox)
- No build tools required

### Run
Just open `index.html` in a browser.

---

## 📁 Project Structure

```
/
├─ index.html      # App shell
├─ style.css       # UI styles
└─ app.js          # Parser, renderer, editor integration
```

---

## 🗺 Roadmap (Beyond v0.1)

Planned next steps:

- Preview → editor reverse navigation
- Diagram DSL extensions (vertical flow, branching)
- Context-aware snippets
- PDF export
- PowerPoint (PPTX) export
- Templates (title, agenda, diagram slides)

---

## 📜 License

MIT License (planned)

---

## 🙌 Status

**Version:** 0.1  
**State:** Functional, experimental  
**Focus:** Authoring experience and language design
