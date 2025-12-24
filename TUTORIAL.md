# FrameNote v0.4 Tutorial

This tutorial covers everything from basic usage to advanced features of FrameNote.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Creating Basic Slides](#2-creating-basic-slides)
3. [Using Templates](#3-using-templates)
4. [Tables](#4-tables)
5. [Code Blocks](#5-code-blocks)
6. [Math Equations](#6-math-equations)
7. [Flowcharts](#7-flowcharts)
8. [Sequence Diagrams](#8-sequence-diagrams)
9. [Shape Drawing](#9-shape-drawing)
10. [Themes and Customization](#10-themes-and-customization)
11. [Exporting](#11-exporting)

---

## 1. Introduction

### What is FrameNote?

FrameNote is a slide creation tool using PDL (Presentation Description Language) in YAML format. Instead of a GUI like PowerPoint, you write presentations declaratively in text.

### Getting Started

1. Download `framenote.html`
2. Open in a browser
3. Write PDL in the left editor
4. See real-time preview on the right

---

## 2. Creating Basic Slides

### Minimal Structure

```yaml
slides:
  - title: "My First Slide"
```

### Adding Metadata

```yaml
meta:
  project: Project Name
  author: Author Name
  date: "2025-01-01"
  theme: default

slides:
  - title: "Title"
```

### Adding Body Content

```yaml
slides:
  - title: "Bullet Points"
    body:
      text:
        - First item
        - Second item
        - Third item
```

### Paragraph Text

```yaml
slides:
  - title: "Description"
    body:
      text: "This is paragraph text. You can write longer content here."
```

---

## 3. Using Templates

### title (Title Slide)

```yaml
- template: title
  title: "Presentation Title"
  subtitle: "Subtitle"
  author: "Presenter Name"
  date: "2025"
```

### section (Section Divider)

```yaml
- template: section
  title: "Chapter 1"
  subtitle: "Introduction"
```

### quote (Quotation)

```yaml
- template: quote
  quote: "Simplicity is the ultimate sophistication"
  author: "Leonardo da Vinci"
```

### agenda (Table of Contents)

```yaml
- template: agenda
  title: "Today's Agenda"
  items:
    - Introduction
    - Main Topic
    - Summary
```

### comparison (Side-by-Side)

```yaml
- template: comparison
  title: "Feature Comparison"
  left:
    title: "Plan A"
    items:
      - Feature 1
      - Feature 2
  right:
    title: "Plan B"
    items:
      - Feature 3
      - Feature 4
```

### timeline (Timeline)

```yaml
- template: timeline
  title: "Development Roadmap"
  events:
    - date: "2024 Q1"
      title: "Planning Phase"
    - date: "2024 Q2"
      title: "Development Phase"
```

### qa (Q&A)

```yaml
- template: qa
  title: "Any Questions?"
  contact: "example@email.com"
```

### thanks (Closing)

```yaml
- template: thanks
  title: "Thank You"
  message: "Thank you for your attention"
  contact: "https://example.com"
```

---

## 4. Tables

### Basic Table

```yaml
- title: "Features"
  body:
    table: |
      | Feature | Description |
      |---------|-------------|
      | Tables  | Markdown format |
      | Code    | Highlighting |
```

### Column Alignment

```yaml
table: |
  | Left   | Center | Right |
  |:-------|:------:|------:|
  | Left   | Center | Right |
  | Text   | Text   | 123   |
```

- `:---` Left align
- `:---:` Center align
- `---:` Right align

### Custom Styling

```yaml
tableStyle:
  colWidths: [300, 150]    # Column widths (px)
  rowHeight: 60            # Row height (px)
  headerBg: "#3b82f6"      # Header background
  headerColor: "#ffffff"   # Header text color
  striped: true            # Striped rows
  border: true             # Show borders
  fontSize: 20             # Font size
```

---

## 5. Code Blocks

### Basic Syntax

```yaml
- title: "Python Code"
  body:
    code:
      language: python
      content: |
        def greet(name):
            return f"Hello, {name}!"
        
        print(greet("World"))
```

### Supported Languages

javascript, python, java, rust, go, yaml, sql, html, css, bash

### Theme Settings

```yaml
code:
  language: javascript
  content: |
    console.log("Hello");
  style:
    theme: dark  # dark, light, match
```

- `dark` - Dark background (default)
- `light` - Light background
- `match` - Colors matching slide theme

### Options

```yaml
code:
  language: python
  content: |
    print("Hello")
  lineNumbers: true    # Show line numbers (default: true)
  fontSize: 18         # Font size (default: 20)
```

---

## 6. Math Equations

### Inline Math

Embed math in text using `$...$`:

```yaml
text:
  - "Einstein's equation: $E = mc^2$"
  - "Pythagorean theorem: $a^2 + b^2 = c^2$"
```

### Block Math

```yaml
math: "E = mc^2"
```

### Multiple Equations

```yaml
math:
  - "E = mc^2"
  - "F = ma"
  - "p = mv"
mathStyle:
  fontSize: 42
  align: center
```

### LaTeX Syntax Examples

| Syntax | Output | Description |
|--------|--------|-------------|
| `x^2` | x² | Superscript |
| `x_i` | xᵢ | Subscript |
| `\frac{a}{b}` | a/b | Fraction |
| `\sqrt{x}` | √x | Square root |
| `\sum_{i=1}^{n}` | Σ | Summation |
| `\int_{a}^{b}` | ∫ | Integral |
| `\alpha, \beta, \pi` | α, β, π | Greek letters |
| `\pm` | ± | Plus-minus |
| `\times` | × | Multiplication |
| `\rightarrow` | → | Arrow |

### Complex Examples

```yaml
# Quadratic formula
math: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"

# Matrix
math: |
  A = \begin{pmatrix}
  a & b \\
  c & d
  \end{pmatrix}
```

**Note:** Use double backslashes (`\\`) inside double quotes in YAML. Use pipe (`|`) or single quotes to avoid escaping.

---

## 7. Flowcharts

### Basic Syntax

```yaml
flowchart: |
  direction: LR
  A[Start] --> B(Process)
  B --> C{Decision}
  C -->|Yes| D[End]
  C -->|No| B
```

### Node Shapes

| Syntax | Shape |
|--------|-------|
| `[text]` | Rectangle |
| `(text)` | Rounded rectangle |
| `{text}` | Diamond (decision) |
| `((text))` | Circle |
| `[[text]]` | Stadium |

### Arrow Types

| Syntax | Description |
|--------|-------------|
| `-->` | Arrow |
| `-->｜label｜` | Labeled arrow |
| `-.->` | Dashed arrow |
| `===>` | Thick arrow |
| `---` | Line (no arrow) |

### Direction

```yaml
flowchart: |
  direction: TB    # TB, BT, LR, RL
  A[Top] --> B[Bottom]
```

- `LR` - Left to Right (default)
- `RL` - Right to Left
- `TB` - Top to Bottom
- `BT` - Bottom to Top

### Sizing Options

```yaml
flowchart:
  content: |
    direction: LR
    A[Start] --> B[End]
  style:
    nodeWidth: 180      # Node width
    nodeHeight: 80      # Node height
    fontSize: 22        # Font size
    gapX: 100           # Horizontal gap
    gapY: 100           # Vertical gap
    x: 150              # Start X position
    y: 200              # Start Y position
```

### Complex Example

```yaml
flowchart: |
  direction: TB
  Start[Start] --> Input(Input)
  Input --> Validate{Validate}
  Validate -->|OK| Process[Process]
  Validate -->|NG| Error[Error]
  Error --> Input
  Process --> Save((Save))
  Save --> End[End]
```

---

## 8. Sequence Diagrams

### Basic Syntax

```yaml
sequence: |
  Client ->> Server: HTTP Request
  Server ->> DB: Query
  DB -->> Server: Result
  Server -->> Client: Response
```

### Arrow Types

| Syntax | Description |
|--------|-------------|
| `->>` | Async message |
| `-->>` | Reply (dashed) |
| `->` | Sync message |
| `-->` | Dashed line |
| `-x` | Failed/crossed |

### Explicit Participants

```yaml
sequence: |
  participant User
  participant Frontend
  participant Backend
  User ->> Frontend: Click
  Frontend ->> Backend: API Call
  Backend -->> Frontend: Response
  Frontend -->> User: Display
```

### Sizing Options

```yaml
sequence:
  content: |
    A ->> B: Message
    B -->> A: Reply
  style:
    participantWidth: 150     # Participant box width
    participantHeight: 60     # Participant box height
    messageGap: 80            # Message spacing
    fontSize: 20              # Font size
    marginX: 100              # Horizontal margin
    y: 180                    # Start Y position
```

---

## 9. Shape Drawing

### Basic Syntax

```yaml
shapes:
  - type: rect
    x: 200
    y: 300
    width: 150
    height: 80
    fill: "#3b82f6"
    label: "Box"
```

### Shape Types

| Type | Required Properties | Description |
|------|---------------------|-------------|
| `rect` | x, y, width, height | Rectangle |
| `circle` | x, y, r | Circle |
| `ellipse` | x, y, rx, ry | Ellipse |
| `line` | x, y, x2, y2 | Line |
| `arrow` | x, y, x2, y2 | Arrow |
| `diamond` | x, y, size | Diamond |
| `triangle` | x, y, width, height | Triangle |
| `polygon` | points | Polygon |
| `polyline` | points | Polyline |
| `path` | d | SVG path |
| `text` | x, y, label | Text |

### Common Options

```yaml
shapes:
  - type: rect
    x: 200
    y: 300
    width: 150
    height: 80
    fill: "#3b82f6"        # Fill color
    stroke: "#1e40af"      # Stroke color
    strokeWidth: 2         # Stroke width
    opacity: 0.8           # Opacity (0-1)
    rx: 10                 # Corner radius
    label: "Label"         # Label text
    labelColor: "#ffffff"  # Label color
    labelSize: 20          # Label font size
```

### Combined Example

```yaml
shapes:
  # Input box
  - type: rect
    x: 200
    y: 300
    width: 150
    height: 80
    fill: "#3b82f6"
    rx: 8
    label: "Input"
  
  # Arrow
  - type: arrow
    x: 370
    y: 340
    x2: 470
    y2: 340
    strokeWidth: 3
  
  # Process (circle)
  - type: circle
    x: 550
    y: 340
    r: 60
    fill: "#10b981"
    label: "Process"
  
  # Decision (diamond)
  - type: diamond
    x: 750
    y: 340
    size: 120
    fill: "#f59e0b"
    label: "Decision"
```

---

## 10. Themes and Customization

### Theme Setting

```yaml
meta:
  theme: default
```

### Available Themes

| Theme | Background | Accent | Style |
|-------|------------|--------|-------|
| default | White | Indigo | Standard |
| corporate | White | Blue | Business |
| minimal | Gray | Slate | Simple |
| dark | Dark | Cyan | Dark |
| nature | Green tint | Green | Natural |
| sunset | Orange tint | Orange | Warm |
| ocean | Blue tint | Sky | Fresh |
| lavender | Purple tint | Purple | Calm |
| rose | Pink tint | Rose | Elegant |
| midnight | Navy | Violet | Night |

### Header/Footer

```yaml
meta:
  header:
    show: true
    text: "{project}"
    format:
      color: "#666666"
      size: 28
  footer:
    show: true
    left: "{author}"
    center: ""
    right: "{page} / {total}"
```

**Placeholders:**
- `{project}` - Project name
- `{author}` - Author name
- `{date}` - Date
- `{page}` - Current page
- `{total}` - Total pages

---

## 11. Exporting

### PDF Export

Click "Export" → "PDF"

### PowerPoint (PPTX) Export

Click "Export" → "PPTX"

**Note:** Some features (like KaTeX math rendering) have limitations in PPTX format.

### HTML Export

Click "Export" → "HTML"

Creates a self-contained slideshow HTML file with arrow key navigation.

### Project File (.fnote)

- "Save" button to save project
- "Load" button to open project

The .fnote file is a ZIP archive containing YAML source and images.

---

## Tips

### Code Completion

- `Ctrl+Space` to show suggestions
- `📑` snippets for templates
- Keywords auto-complete with `:`

### Adding Images

Drag and drop images onto the editor area

```yaml
- title: "Slide with Image"
  body:
    figure: "image.png"
    caption: "Image caption"
    style: figure_caption
```

### Slideshow Mode

Click "Play" button for fullscreen presentation

- Arrow keys to navigate
- `Esc` to exit

---

## Troubleshooting

### "No slides" displayed

- Check YAML syntax errors
- Verify proper indentation (2 spaces recommended)
- Ensure `slides:` key exists

### Math not rendering

- Check backslash escaping (use `\\` in double quotes)
- Use single quotes or pipe (`|`) to avoid escaping

### Flowchart not displaying correctly

- Don't include spaces in node IDs
- Add spaces around arrows
- Put `direction:` on the first line

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` `→` | Navigate slides |
| `Ctrl+S` | Save project |
| `Ctrl+Space` | Code completion |
| `F11` | Fullscreen |

---

This concludes the FrameNote v0.4 tutorial. For more details, see the README documentation.
