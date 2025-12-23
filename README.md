# FrameNote v0.2.1

**FrameNote** is a lightweight, text-first slide authoring tool.  
Write structured notes in PDL (Presentation Description Language), and they instantly become presentation slides.

No WYSIWYG, no drag-and-drop — just structure and intent.

---

## ✨ What's New in v0.2.1

- **Header & Footer** - Display project name, author, date, page numbers
- **FormatObject** - Customize fonts, sizes, colors for all text elements
- **Per-Slide Format** - Override global styles on individual slides
- **Placeholders** - `{project}`, `{author}`, `{date}`, `{page}`, `{total}`

---

## 🚀 Getting Started

### Requirements

- Modern browser (Chrome, Edge, Firefox, Safari)
- No build tools required
- No installation needed

### Run

Just open `framenote-v0.2.html` in a browser.

---

## 📖 Features

### PDL (Presentation Description Language)

Write slides in YAML format:

```yaml
meta:
  project: My Presentation
  author: Your Name
  date: "2025-01-01"

slides:
  - title: First Slide
    body:
      text:
        - Point 1
        - Point 2
```

### Body Styles

| Style | Description | Usage |
|-------|-------------|-------|
| `text` | Text only (default) | Simple content slides |
| `figure_caption` | Figure + caption + text | Image with description |
| `figure_bullets` | Figure + bullet points | Image with list |
| `split` | Left/right or top/bottom | Comparison, two-column |

### Header & Footer

```yaml
meta:
  header:
    show: true
    logo: "logo.png"        # Optional
    text: "{project}"
  
  footer:
    show: true
    left: "{author}"
    center: "{date}"
    right: "{page} / {total}"
```

#### Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{project}` | Project name from meta |
| `{author}` | Author from meta |
| `{date}` | Date from meta |
| `{version}` | Version from meta |
| `{page}` | Current page number |
| `{total}` | Total number of pages |

### Format Customization

#### Global Format (all slides)

```yaml
meta:
  format:
    title:
      font: "'Inter', sans-serif"
      size: 48
      weight: 700
      color: "#1a1a1a"
    body:
      font: "'Noto Sans JP', sans-serif"
      size: 24
      weight: 400
      color: "#333333"
    bullet:
      color: "#3b82f6"
      size: 6
    caption:
      size: 16
      color: "#666666"
    note:
      size: 14
      style: italic
      color: "#888888"
    diagram:
      boxColor: "#3b82f6"
      textColor: "#ffffff"
      arrowColor: "#666666"
```

#### Per-Slide Format (override)

```yaml
slides:
  - title: Important Slide
    format:
      title:
        color: "#dc2626"
        size: 56
      bullet:
        color: "#dc2626"
    body:
      text:
        - This slide has custom red styling
```

#### Format Priority

```
Default < meta.format (global) < slide.format (per-slide)
```

### Diagrams

```yaml
body:
  text:
    - Process overview
  diagram:
    boxes:
      - Step 1
      - Step 2
      - Step 3
```

### Split Layout

```yaml
body:
  style: split
  split:
    direction: horizontal   # or vertical
    ratio: 0.5              # 0.1 - 0.9
    a:
      text:
        - Left content
    b:
      figure: image.png
```

### Presenter Notes

```yaml
slides:
  - title: Slide Title
    body:
      text:
        - Content
    notes: "Speaker notes here (visible in preview, not in presentation)"
```

---

## 🖼️ Image Management

1. Click **Images** tab
2. Drag & drop images or click to upload
3. Click thumbnail to copy filename
4. Use filename in PDL: `figure: image.png`

---

## 💾 Project Files (.fnote)

Save and load complete projects including PDL and images.

### Save
- Click **Save** button
- Downloads `{project-name}.fnote` (ZIP format)

### Open
- Click **Open** button
- Select `.fnote` file
- PDL and images are restored

### File Structure

```
project.fnote (ZIP)
├── manifest.json
├── presentation.pdl.yaml
└── images/
    ├── image1.png
    └── image2.jpg
```

---

## ⌨️ Editor Features

Powered by **Monaco Editor** (VS Code core):

- Syntax highlighting for PDL
- Real-time validation
- Code completion
- Snippets (Tab to expand)

### Snippets

| Trigger | Description |
|---------|-------------|
| `slide` | Basic slide |
| `slide-figure` | Slide with figure |
| `slide-split` | Split layout slide |
| `slide-format` | Slide with custom format |
| `diagram` | Box-arrow diagram |
| `header-footer` | Header/footer config |
| `format` | Basic format config |
| `format-full` | Full format config |

---

## ✅ Validation

Real-time PDL validation with error codes:

| Code | Type | Description |
|------|------|-------------|
| `PDL-E*` | Error | Structural issues |
| `PDL-W*` | Warning | Style recommendations |

---

## 🎬 Presentation Mode

1. Click **Present** button
2. Navigate with arrow keys or buttons
3. Press `Escape` to exit

---

## 📁 Project Structure

```
/
├── framenote-v0.2.html   # Application (single file)
├── README.md             # English documentation
├── README-JP.md          # Japanese documentation
├── ROADMAP.md            # Development roadmap
└── sample-all-patterns.pdl.yaml  # All PDL patterns
```

---

## 🗺️ Roadmap

| Version | Features |
|---------|----------|
| v0.2.1 | Header/Footer, FormatObject, Per-slide format |
| v0.3 | PDF export, PPTX export, Themes |
| v0.4 | Advanced diagrams (vertical, branching) |
| v0.5 | Cloud storage, sharing |
| v1.0 | Stable release, CLI, plugins |

---

## 📜 License

MIT License

---

## 🔗 Links

- [GitHub Repository](https://github.com/fukuyori/framenote)
- [PDL Specification](./pdl.md)

---

**Version:** 0.2.1  
**Status:** Functional, experimental  
**Focus:** PDL language design and authoring experience
