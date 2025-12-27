# FrameNote v0.4

**Text-First Slide Authoring Tool**

FrameNote is a declarative slide presentation tool using PDL (Presentation Description Language) in YAML format. Focus on content structure, not visual design.

## Features

### Core
- **PDL (YAML-based)** - Declarative presentation authoring
- **Single HTML file** - No installation required, runs in modern browsers
- **Monaco Editor** - Syntax highlighting, code completion, snippets
- **Real-time preview** - Instant visual feedback
- **10 Themes** - default, corporate, minimal, dark, nature, sunset, ocean, lavender, rose, midnight
- **7 Font Presets** - sans, serif, rounded, business, modern, elegant, handwritten (Google Fonts)

### Templates (8 types)
- `title` - Title slide with subtitle, author, date
- `section` - Section divider
- `quote` - Quotation with author
- `qa` - Q&A slide
- `thanks` - Thank you slide
- `agenda` - Agenda/TOC
- `comparison` - Side-by-side comparison
- `timeline` - Timeline events

### Content Elements
- **Text** - Paragraphs, bullet points, inline math (`$E=mc^2$`)
- **Tables** - Markdown format with alignment (`:---`, `:---:`, `---:`)
- **Code Blocks** - Syntax highlighting for 10+ languages
- **Math** - KaTeX LaTeX rendering (inline & block)
- **Shapes** - SVG primitives (rect, circle, arrow, diamond, etc.)
- **Flowcharts** - Mermaid-style diagrams
- **Sequence Diagrams** - UML sequence diagrams
- **Images** - Drag & drop upload

### Templates (21 types)
- `agenda` - Agenda/table of contents
- `bigtext` - Large impact text
- `blank` - Empty slide for custom content
- `cards` - Card grid layout
- `code` - Code block slide
- `comparison` - Side-by-side comparison
- `flowchart` - Flowchart slide
- `image` - Full-screen image with caption
- `mindmap` - Mind map diagram
- `qa` - Q&A slide
- `quote` - Quote with attribution
- `section` - Section divider
- `steps` - Process flow (1→2→3)
- `table` - Table slide
- `thanks` - Thank you slide
- `threecolumn` - Three column layout
- `timeline` - Timeline with events
- `title` - Title slide with subtitle
- `twocolumn` - Two column layout
- `video` - Video embed slide

### Export
- **PDF** - Print-ready document
- **PPTX** - PowerPoint format
- **HTML** - Self-contained presentation
- **.fnote** - Project file (save/load)

## Quick Start

1. Download `framenote.html`
2. Open in a modern browser (Chrome, Firefox, Edge, Safari)
3. Start writing PDL in the editor

## PDL Syntax

### Basic Structure

```yaml
meta:
  project: My Presentation
  author: Your Name
  theme: default

slides:
  - template: title
    title: "Welcome"
    subtitle: "Getting Started with FrameNote"

  - title: "Agenda"
    body:
      text:
        - First topic
        - Second topic
        - Third topic
```

### Tables

```yaml
- title: Feature Comparison
  body:
    table: |
      | Feature | Status |
      |:--------|:------:|
      | Tables  | ✅     |
      | Code    | ✅     |
      | Math    | ✅     |
    tableStyle:
      colWidths: [300, 100]
      rowHeight: 50
```

### Code Blocks

```yaml
- title: Code Example
  body:
    code:
      language: python
      content: |
        def hello():
            print("Hello, World!")
      style:
        theme: dark  # dark, light, or match
```

### Math Equations

```yaml
# Inline math in text
- title: Physics
  body:
    text:
      - "Einstein's equation: $E = mc^2$"

# Block math
- title: Quadratic Formula
  body:
    math:
      - "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"
    mathStyle:
      fontSize: 48
      align: center
```

### Flowcharts

```yaml
- title: Process Flow
  body:
    flowchart: |
      direction: LR
      A[Start] --> B(Process)
      B --> C{Decision}
      C -->|Yes| D[End]
      C -->|No| B
```

**Node shapes:**
- `[text]` - Rectangle
- `(text)` - Rounded rectangle
- `{text}` - Diamond
- `((text))` - Circle

**Arrows:**
- `-->` - Arrow
- `-->|label|` - Labeled arrow
- `-.->` - Dashed arrow
- `---` - Line (no arrow)

**Directions:** `LR`, `RL`, `TB`, `BT`

### Sequence Diagrams

```yaml
- title: API Flow
  body:
    sequence: |
      Client ->> Server: Request
      Server ->> DB: Query
      DB -->> Server: Result
      Server -->> Client: Response
```

**Arrow types:**
- `->>` - Async message
- `-->>` - Reply (dashed)
- `->` - Sync message
- `-x` - Failed/crossed

### Video Embeds

```yaml
- title: Demo Video
  body:
    video:
      url: "https://www.youtube.com/watch?v=VIDEO_ID"
      width: "80%"    # 80% of slide width
      height: "50%"   # 50% of slide height
```

**Supported platforms:**
- YouTube (thumbnail + click to open)
- Vimeo (thumbnail + click to open)
- Local video files (MP4, WebM) - inline playback

**Options:**
- `url` - Video URL or local file path
- `width` / `height` - Video size (px or %, default: 960x540)
- `x` / `y` - Position (px or %, default: center)
- `autoplay` - Auto-play (local videos only)
- `controls` - Show controls (local videos only)

**Note:** YouTube/Vimeo videos display as clickable thumbnails that open in a new tab. Local MP4/WebM files play inline.

### Percentage Size Specification

Size and position values support both `px` (number) and `%` (string) formats:

```yaml
# Video - relative to slide
video:
  width: "80%"
  height: "50%"

# Figure - relative to slide
figureStyle:
  width: "40%"
  height: "35%"
  x: "55%"
  y: "20%"

# Shapes - relative to slide
shapes:
  - type: rect
    x: "10%"
    y: "20%"
    width: "30%"
    height: "40%"

# Table columns - relative to table area
tableStyle:
  colWidths: ["30%", "40%", "30%"]
```

### Mind Map

```yaml
- template: mindmap
  title: Project Overview
  mindmap:
    center: "Main Topic"
    layout: radial  # radial, tree, tree-down
    branches:
      - topic: "Branch 1"
        items:
          - "Item 1"
          - "Item 2"
      - topic: "Branch 2"
        items:
          - "Item A"
          - "Item B"
      - topic: "Branch 3"
        items:
          - "Sub item"
```

**Layout options:**
- `radial` - Circular layout (default)
- `tree` - Left to right tree
- `tree-down` - Top to bottom tree

### Shapes

```yaml
- title: Diagram
  body:
    shapes:
      - type: rect
        x: 200
        y: 300
        width: 150
        height: 80
        fill: "#3b82f6"
        label: "Box"
      - type: arrow
        x: 370
        y: 340
        x2: 500
        y2: 340
```

**Shape types:** rect, circle, ellipse, line, arrow, diamond, triangle, polygon, polyline, path, text

## Themes

| Theme | Background | Accent |
|-------|------------|--------|
| default | White | Indigo |
| corporate | White | Blue |
| minimal | Gray | Slate |
| dark | Dark | Cyan |
| nature | Green tint | Green |
| sunset | Orange tint | Orange |
| ocean | Blue tint | Sky |
| lavender | Purple tint | Purple |
| rose | Pink tint | Rose |
| midnight | Navy | Violet |

## Fonts

### Preset Fonts

| Preset | Heading | Body | Description |
|--------|---------|------|-------------|
| sans | Noto Sans JP | Noto Sans JP | Standard gothic |
| serif | Noto Serif JP | Noto Serif JP | Formal mincho |
| rounded | M PLUS Rounded 1c | M PLUS 1p | Casual rounded |
| business | BIZ UDGothic | BIZ UDGothic | Business docs |
| modern | Montserrat | Noto Sans JP | Modern style |
| elegant | Playfair Display | Shippori Mincho | Elegant style |
| handwritten | Klee One | Klee One | Handwritten style |

### Usage

```yaml
# Preset (simple)
meta:
  font: modern

# Custom fonts
meta:
  font:
    heading: "Montserrat"
    body: "Noto Sans JP"
    code: "Fira Code"
```

## Keyboard Shortcuts

### Editor
| Key | Action |
|-----|--------|
| `←` `→` | Navigate slides |
| `Ctrl+S` | Save project |
| `Ctrl+\`` | Toggle VIM mode |

### VIM Mode
When VIM mode is enabled, standard VIM keybindings are available:
- `i` - Insert mode
- `Esc` - Normal mode
- `v` - Visual mode
- `h` `j` `k` `l` - Navigation
- `:w` - Save (triggers Ctrl+S)
- `:q` - Exit VIM mode
- `>>` / `<<` - Indent / Outdent line
- `zz` / `zt` / `zb` - Scroll cursor to center / top / bottom
- `zo` / `zc` / `za` - Open / Close / Toggle fold
- `zR` / `zM` - Open all / Close all folds

### Slideshow
| Key | Action |
|-----|--------|
| `←` `→` | Navigate slides |
| `Space` | Next slide |
| `F` | Toggle fullscreen |
| `L` | Toggle laser pointer |
| `Esc` | Exit slideshow |
| Click left 1/3 | Previous slide |
| Click right 2/3 | Next slide |

## Browser Support

- Chrome 90+
- Firefox 90+
- Edge 90+
- Safari 15+

## Dependencies (via CDN)

- Monaco Editor - Code editing
- monaco-vim - VIM keybindings
- js-yaml - YAML parsing
- jsPDF - PDF export
- PptxGenJS - PowerPoint export
- JSZip - Project files
- KaTeX - Math rendering

## License

MIT License

## Changelog

### v0.5.1 (Current)
- VIM mode improvements
- Added VIM folding commands: zo, zc, za, zO, zC, zR, zM, zj, zk
- Added VIM scroll commands: zz, zt, zb, z., z-, z<Enter>
- Added VIM indent commands: >>, <<
- Fixed Shift key handling for uppercase VIM commands
- Templates sorted alphabetically

### v0.5
- Fixed font selector dropdown not working
- Improved font selection UI/PDL synchronization
- Added fullscreen presentation mode
- Click navigation in slideshow (left 1/3 = prev, right 2/3 = next)
- Press F key for fullscreen toggle
- Laser pointer for presentations (L key or button)
- Drag & drop slide reordering in outline
- Video embedding (YouTube, Vimeo, local files)
- Percentage size specification for video, figure, shapes, table columns
- 13 new templates: image, steps, cards, twocolumn, threecolumn, blank, bigtext, mindmap, video, table, code, flowchart
- VIM mode for editor (Ctrl+` or button to toggle)

### v0.4
- Table column alignment (left/center/right)
- Auto column width calculation
- Custom tableStyle (colWidths, rowHeight)
- Code blocks with syntax highlighting
- Code themes (dark/light/match)
- Math equations (KaTeX) - inline & block
- Multiple math formulas support
- SVG shapes drawing
- Mermaid-style flowcharts
- Sequence diagrams
- Flowchart/Sequence sizing options
- Font selection (7 presets + custom Google Fonts)

### v0.3
- 8 slide templates
- 10 preset themes
- PDF/PPTX/HTML export
- Monaco Editor integration
- Image management
- Header/Footer system

### v0.2
- Basic PDL specification
- Theme system
- Slide navigation

### v0.1
- Initial release
- YAML-based slides
