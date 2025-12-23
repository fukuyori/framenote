# FrameNote v0.2

**FrameNote** is a lightweight, text-first slide authoring tool.  
Write structured notes in PDL (Presentation Description Language), and they instantly become presentation slides.

No WYSIWYG, no drag-and-drop — just structure and intent.

---

## ✨ Features

### Core Concept

- Write slides using **PDL** (YAML-based declarative language)
- Instant live preview with SVG rendering
- Fixed 16:9 aspect ratio
- Designed for clarity, not decoration

---

### PDL (Presentation Description Language)

FrameNote uses PDL v0.2, a declarative language for structured presentations.

#### Basic Structure

```yaml
meta:
  project: My Presentation
  author: Your Name

slides:
  - title: Slide Title
    body:
      text:
        - Bullet point 1
        - Bullet point 2
```

#### Body Styles

| Style | Description |
|-------|-------------|
| `text` | Text only (default) |
| `figure_caption` | Figure with caption and text |
| `figure_bullets` | Figure with bullet points |
| `split` | Left/right or top/bottom split layout |

#### Figure Example

```yaml
- title: Feature Overview
  body:
    style: figure_caption
    figure: screenshot.png
    caption: Application screenshot
    text:
      - Upload images via Images tab
      - Reference by filename
```

#### Split Layout

```yaml
- title: Comparison
  body:
    style: split
    split:
      direction: horizontal  # or vertical
      ratio: 0.5
      a:
        text:
          - Left content
      b:
        text:
          - Right content
```

#### Diagram (Box-Arrow)

```yaml
- title: Process Flow
  body:
    text:
      - Simple flow diagram
    diagram:
      boxes:
        - Step 1
        - Step 2
        - Step 3
```

#### Presenter Notes

```yaml
- title: Important Slide
  body:
    text:
      - Key point
  notes: Remember to emphasize this point
```

---

### Editor Features

Powered by **Monaco Editor** (VS Code core):

- Syntax highlighting for PDL
- Real-time validation with inline error markers
- Code completion and snippets
- Slide outline with click-to-jump

#### Snippets

Type and press `Tab` to expand:

| Trigger | Description |
|---------|-------------|
| `slide` | Basic slide template |
| `slide-figure` | Slide with figure |
| `slide-split` | Split layout slide |
| `diagram` | Box-arrow diagram |

---

### Image Management

1. Click **Images** tab
2. Drag & drop images or click to upload
3. Click thumbnail to copy filename
4. Use filename in PDL: `figure: image.png`

---

### Validation

FrameNote validates PDL in real-time:

| Code | Type | Description |
|------|------|-------------|
| `PDL-E*` | Error | Structural issues (missing required fields) |
| `PDL-W*` | Warning | Style issues (too many bullets, empty title) |

Errors are shown:
- Inline in the editor (red underline)
- In the diagnostics panel
- In the slide outline (red border)

---

### Presentation Mode

1. Click **Present** button (or press `F5` in future versions)
2. Use arrow keys or click buttons to navigate
3. Press `Escape` to exit

---

## 🧠 Design Philosophy

- **Text is the source of truth** — no hidden formatting
- **Structure over decoration** — focus on content
- **Errors should guide, not block** — preview remains usable
- **The editor teaches the language** — completions and hints

FrameNote is not a PowerPoint replacement.  
It is a **thinking tool** for structured presentations.

---

## 🚀 Getting Started

### Requirements

- Modern browser (Chrome, Edge, Firefox, Safari)
- No build tools required
- No installation needed

### Run

Just open `framenote-v0.2.html` in a browser.

---

## 📁 Project Structure

```
/
├── framenote-v0.2.html   # Single-file application
├── README.md             # English documentation
└── README-JP.md          # Japanese documentation
```

---

## 📋 PDL Specification

FrameNote v0.2 implements PDL v0.2 specification:

### Document Structure

```yaml
meta: MetaObject      # Optional
slides: SlideArray    # Required
```

### Slide Structure

```yaml
- title: string       # Required
  body: Body          # Required
  notes: string       # Optional
```

### Body Types

- **TextBody**: `{ text: string | string[] }`
- **FigureCaptionBody**: `{ style: "figure_caption", figure: string, caption: string, text?: ... }`
- **FigureBulletsBody**: `{ style: "figure_bullets", figure: string, text: string[] }`
- **SplitBody**: `{ style: "split", split: { a: Pane, b: Pane, direction?, ratio? } }`

---

## 🗺 Roadmap

### v0.3 (Planned)

- [ ] PDF export
- [ ] PPTX export
- [ ] Vertical diagram flow
- [ ] Theme customization
- [ ] Keyboard shortcuts panel

### Future

- [ ] Multiple figures per slide
- [ ] Section structure
- [ ] Templates library
- [ ] Cloud storage integration

---

## 📜 License

MIT License

---

## 🙌 Status

**Version:** 0.2  
**State:** Functional, experimental  
**Focus:** PDL language design and authoring experience

---

## 🔗 Links

- [PDL Specification](./pdl.md)
- [GitHub Repository](https://github.com/fukuyori/framenote)
