# FrameNote v0.3

**Text-first slide authoring tool using PDL (Presentation Description Language)**

FrameNote is a browser-based presentation tool that treats slides as declarative YAML documents. Focus on your content structure, not visual design — FrameNote handles the layout automatically.

![FrameNote](https://img.shields.io/badge/version-0.3-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Philosophy
- **Structure over decoration** — Write content, not design
- **Text-first authoring** — Full keyboard control with code editor
- **Zero setup** — Single HTML file, runs in any modern browser

### 📝 PDL (Presentation Description Language)
- YAML-based declarative format
- Human-readable and version-control friendly
- Separation of content and presentation

### 🎨 Templates (8 types)
| Template | Description |
|----------|-------------|
| `title` | Opening slide with title, subtitle, author, date |
| `section` | Section divider |
| `quote` | Quotation with author and source |
| `qa` | Q&A / Questions slide |
| `thanks` | Closing / Thank you slide |
| `agenda` | Agenda / Table of contents |
| `comparison` | Side-by-side comparison |
| `timeline` | Timeline with events |

### 🎭 Themes (10 presets)
`default` · `corporate` · `minimal` · `dark` · `nature` · `sunset` · `ocean` · `lavender` · `rose` · `midnight`

### 📤 Export Formats
- **PDF** — Print-ready document
- **PPTX** — Microsoft PowerPoint (native shapes)
- **HTML** — Standalone slideshow

### ⚡ Editor Features
- Monaco Editor (VS Code engine)
- PDL syntax highlighting
- Context-aware code completion (Ctrl+Space)
- Real-time preview
- YAML validation with error markers

## 🚀 Quick Start

1. Download `framenote-v0.3.html`
2. Open in a modern browser (Chrome, Firefox, Edge, Safari)
3. Start writing!

```yaml
meta:
  project: "My First Presentation"
  author: "Your Name"
  theme: default

slides:
  - template: title
    title: "Hello FrameNote"
    subtitle: "My first presentation"
    author: "Your Name"
    date: "2025"

  - title: "Introduction"
    body:
      text:
        - "FrameNote makes presentations easy"
        - "Just write YAML, get beautiful slides"
        - "Export to PDF, PPTX, or HTML"
```

## 📖 Documentation

- [Tutorial (English)](TUTORIAL.md)
- [チュートリアル (日本語)](TUTORIAL-JP.md)
- [README 日本語版](README-JP.md)

## 🎮 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Space` | Open code completion |
| `Tab` | Accept completion / Expand snippet |
| `Ctrl+S` | Save project (.fnote) |
| `F11` or click "Present" | Start slideshow |
| `Esc` | Exit slideshow |
| `←` / `→` | Navigate slides |

## 📁 File Formats

### .fnote (Project File)
ZIP archive containing:
```
project.fnote
├── manifest.json      # Project metadata
├── presentation.pdl.yaml  # PDL content
└── images/            # Uploaded images
    └── *.png, *.jpg
```

### .pdl.yaml (PDL File)
Plain YAML file with PDL structure.

## 🔧 PDL Structure

```yaml
meta:
  project: "Project Name"
  author: "Author"
  date: "2025-01-01"
  version: "1.0"
  theme: default
  header:
    show: true
    text: "{project}"
  footer:
    show: true
    left: "{author}"
    right: "{page} / {total}"

slides:
  - title: "Slide Title"
    body:
      text:
        - "Bullet point 1"
        - "Bullet point 2"
```

## 🎨 Customization

### Global Format (in meta)
```yaml
meta:
  format:
    accent:
      color: "#6366f1"
    title:
      color: "#1e1b4b"
      size: 48
    text:
      color: "#334155"
      size: 28
    bullet:
      color: "#6366f1"
```

### Per-Slide Format Override
```yaml
slides:
  - title: "Important Slide"
    format:
      background:
        color: "#dc2626"
      title:
        color: "#ffffff"
    body:
      text:
        - "This slide has custom colors"
```

## 🖼️ Images

1. Drag & drop images to the Images tab
2. Reference in PDL:

```yaml
- title: "Slide with Image"
  body:
    style: figure_caption
    figure: my-image.png
    caption: "Image caption"
```

## 📊 Diagrams

```yaml
- title: "Process Flow"
  body:
    diagram:
      type: box-arrow
      direction: horizontal
      boxes:
        - "Step 1"
        - "Step 2"
        - "Step 3"
```

## 🔄 Placeholders

Use in header/footer:
- `{project}` — Project name
- `{author}` — Author name
- `{date}` — Date
- `{page}` — Current page number
- `{total}` — Total pages

## 📋 Requirements

- Modern web browser with JavaScript enabled
- No server required
- No installation needed

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Made with ❤️ for presentation creators who prefer text over clicks.
