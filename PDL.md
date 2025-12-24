# PDL

## Presentation Description Language

### Detailed Specification v0.4.1 (FrameNote)

---

## 1. Overview

PDL (Presentation Description Language) is a
**declarative language for describing presentations as structured documents**.

PDL is designed to achieve the following goals:

* To explicitly express slide structure, constraints, and semantics
* To enable mechanical and deterministic layout decisions
* To guarantee identical validation results across editing environments
  (CLI / Browser / IDE)

PDL is **not a rendering language**.
PDL is a language for describing **structure, meaning, and constraints**.

---

## 2. Design Principles

### 2.1 Structure First

PDL does not deal with pixels or coordinates.
All information is expressed purely as **semantic structure**.

---

### 2.2 Deterministic Validation

Given the same input,
all implementations **must produce identical errors, warnings, and normalization results**.

---

### 2.3 Environment Neutral

PDL itself is environment-independent.

* CLI
* Browser
* IDE
* CI
* AI systems

All environments must conform to the same specification.

---

## 3. Document Format

A PDL document is represented in one of the following formats:

* YAML (recommended)
* JSON (fully compatible)

The character encoding must be UTF-8.

---

## 4. Top-Level Structure

```yaml
meta: MetaObject
slides: SlideArray
```

### Required Keys

* `slides`

### Optional Keys

* `meta`

---

## 5. meta Object (MetaObject)

### 5.1 Definition

```yaml
meta:
  project: string
  author: string
  date: string
  version: string
  theme: ThemeName
  font: FontPreset | FontObject
  header: HeaderObject
  footer: FooterObject
```

### 5.2 theme (ThemeName)

Available values:

| Theme | Description |
|-------|-------------|
| `default` | White background, indigo accent |
| `corporate` | White background, blue accent |
| `minimal` | Gray background, slate accent |
| `dark` | Dark background, cyan accent |
| `nature` | Green-tinted background, green accent |
| `sunset` | Orange-tinted background, orange accent |
| `ocean` | Blue-tinted background, sky accent |
| `lavender` | Purple-tinted background, purple accent |
| `rose` | Pink-tinted background, rose accent |
| `midnight` | Navy background, violet accent |

### 5.3 font (FontPreset | FontObject)

#### Preset values (FontPreset)

| Preset | Heading | Body | Code |
|--------|---------|------|------|
| `sans` | Noto Sans JP | Noto Sans JP | Fira Code |
| `serif` | Noto Serif JP | Noto Serif JP | Source Code Pro |
| `rounded` | M PLUS Rounded 1c | M PLUS 1p | Fira Code |
| `business` | BIZ UDGothic | BIZ UDGothic | Roboto Mono |
| `modern` | Montserrat | Noto Sans JP | JetBrains Mono |
| `elegant` | Playfair Display | Shippori Mincho | Source Code Pro |
| `handwritten` | Klee One | Klee One | Fira Code |

#### Custom font object (FontObject)

```yaml
font:
  heading: string  # Google Fonts font name
  body: string     # Google Fonts font name
  code: string     # Monospace font name
```

#### Available Google Fonts

**Japanese:**
- Noto Sans JP, Noto Serif JP
- M PLUS 1p, M PLUS Rounded 1c
- Zen Maru Gothic, BIZ UDGothic
- Shippori Mincho, Klee One

**Latin:**
- Inter, Roboto, Montserrat
- Open Sans, Lato, Playfair Display

**Code:**
- Fira Code, Source Code Pro
- JetBrains Mono, Roboto Mono

### 5.4 header (HeaderObject)

```yaml
header:
  show: boolean
  text: string
  format:
    color: string
    size: number
    background: string
```

### 5.4 footer (FooterObject)

```yaml
footer:
  show: boolean
  left: string
  center: string
  right: string
  format:
    color: string
    size: number
    background: string
```

### 5.5 Placeholders

The following placeholders can be used in header/footer text:

| Placeholder | Description |
|-------------|-------------|
| `{project}` | Project name |
| `{author}` | Author name |
| `{date}` | Date |
| `{page}` | Current page number |
| `{total}` | Total page count |

### 5.6 Constraints

* `meta` is **excluded from structural validation**
* It may be used as **shared metadata** across implementations
* It does **not affect the semantic interpretation** of slide content

---

## 6. slides Array (SlideArray)

### 6.1 Definition

```yaml
slides:
  - Slide
  - Slide
  - ...
```

### 6.2 Constraints

* An empty array is prohibited (warning or error)
* Order is semantically significant
* Each element must conform to the `Slide` type

---

## 7. Slide Definition

### 7.1 Basic Structure

```yaml
- title: string
  subtitle: string
  template: TemplateName
  body: Body
  format: FormatObject
  notes: string
```

### 7.2 Required Keys

* `title`

### 7.3 Optional Keys

* `subtitle`
* `template`
* `body`
* `format`
* `notes`

### 7.4 template (TemplateName)

| Template | Description | Required Keys |
|----------|-------------|---------------|
| `title` | Title slide | title, subtitle, author, date |
| `section` | Section divider | title, subtitle |
| `quote` | Quotation | quote, author |
| `qa` | Q&A slide | title, contact |
| `thanks` | Closing slide | title, message, contact |
| `agenda` | Agenda/TOC | title, items |
| `comparison` | Two-column comparison | title, left, right |
| `timeline` | Timeline events | title, events |

### 7.5 format (FormatObject)

```yaml
format:
  title:
    size: number
    color: string
    weight: string
  subtitle:
    size: number
    color: string
  text:
    size: number
    color: string
  background: string
```

---

## 8. body Definition (Body)

`body` represents the **primary content of a slide**.

---

### 8.1 text (TextContent)

```yaml
body:
  text: string | string[]
```

#### Semantics

* `string` : a single paragraph
* `string[]` : a logical list (bullet points)

#### Inline Math

Text may contain inline math expressions using `$...$` syntax:

```yaml
text:
  - "Einstein's equation: $E = mc^2$"
  - "Area of circle: $S = \\pi r^2$"
```

---

### 8.2 figure (FigureContent)

```yaml
body:
  figure: string
  caption: string
  style: figure_caption | figure_bullets
  text: string[]
```

#### Constraints

* `figure` specifies image filename or URL
* `style` determines layout mode
* At most **one figure per slide** is allowed

---

### 8.3 table (TableContent)

```yaml
body:
  table: string
  tableStyle: TableStyleObject
```

#### Table Format

Markdown table syntax:

```yaml
table: |
  | Header 1 | Header 2 | Header 3 |
  |:---------|:--------:|----------:|
  | Left     | Center   | Right     |
```

#### Column Alignment

| Syntax | Alignment |
|--------|-----------|
| `:---` | Left |
| `:---:` | Center |
| `---:` | Right |
| `---` | Left (default) |

#### tableStyle (TableStyleObject)

```yaml
tableStyle:
  colWidths: number[]      # Column widths in pixels
  rowHeight: number        # Row height in pixels
  headerBg: string         # Header background color
  headerColor: string      # Header text color
  striped: boolean         # Alternating row colors
  border: boolean          # Show borders
  fontSize: number         # Font size
  x: number                # X position
  y: number                # Y position
```

---

### 8.4 code (CodeContent)

```yaml
body:
  code:
    language: LanguageName
    content: string
    lineNumbers: boolean
    fontSize: number
    style:
      theme: CodeTheme
      background: string
```

#### language (LanguageName)

Supported values:

* `javascript`
* `python`
* `java`
* `rust`
* `go`
* `yaml`
* `sql`
* `html`
* `css`
* `bash`
* `text`

#### style.theme (CodeTheme)

| Value | Description |
|-------|-------------|
| `dark` | Dark background (default) |
| `light` | Light background |
| `match` | Colors derived from slide theme |

---

### 8.5 math (MathContent)

```yaml
body:
  math: string | string[]
  mathStyle: MathStyleObject
```

#### Semantics

* `string` : single equation
* `string[]` : multiple equations

#### mathStyle (MathStyleObject)

```yaml
mathStyle:
  fontSize: number         # Font size (default: 36)
  align: left | center | right
  lineSpacing: number      # Line spacing multiplier (default: 1.2)
```

#### LaTeX Syntax

Full KaTeX LaTeX syntax is supported. Examples:

| Syntax | Description |
|--------|-------------|
| `x^2` | Superscript |
| `x_i` | Subscript |
| `\frac{a}{b}` | Fraction |
| `\sqrt{x}` | Square root |
| `\sum_{i=1}^{n}` | Summation |
| `\int_{a}^{b}` | Integral |
| `\alpha, \beta, \gamma` | Greek letters |
| `\begin{pmatrix}...\end{pmatrix}` | Matrix |

---

### 8.6 shapes (ShapesContent)

```yaml
body:
  shapes:
    - ShapeObject
    - ShapeObject
    - ...
```

#### ShapeObject

```yaml
- type: ShapeType
  x: number
  y: number
  width: number
  height: number
  r: number
  rx: number
  ry: number
  x2: number
  y2: number
  size: number
  points: string
  d: string
  fill: string
  stroke: string
  strokeWidth: number
  opacity: number
  label: string
  labelColor: string
  labelSize: number
```

#### type (ShapeType)

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
| `group` | children, transform | Group |

---

### 8.7 flowchart (FlowchartContent)

```yaml
body:
  flowchart: string | FlowchartObject
```

#### String Format

```yaml
flowchart: |
  direction: LR
  A[Start] --> B(Process)
  B --> C{Decision}
  C -->|Yes| D[End]
  C -->|No| B
```

#### Object Format

```yaml
flowchart:
  content: string
  style:
    nodeWidth: number
    nodeHeight: number
    fontSize: number
    gapX: number
    gapY: number
    x: number
    y: number
```

#### Node Shapes

| Syntax | Shape |
|--------|-------|
| `[text]` | Rectangle |
| `(text)` | Rounded rectangle |
| `{text}` | Diamond |
| `((text))` | Circle |
| `[[text]]` | Stadium |

#### Arrow Types

| Syntax | Description |
|--------|-------------|
| `-->` | Arrow |
| `-->｜label｜` | Labeled arrow |
| `-.->` | Dashed arrow |
| `===>` | Thick arrow |
| `---` | Line (no arrow) |

#### Direction

| Value | Description |
|-------|-------------|
| `LR` | Left to Right (default) |
| `RL` | Right to Left |
| `TB` | Top to Bottom |
| `BT` | Bottom to Top |

---

### 8.8 sequence (SequenceContent)

```yaml
body:
  sequence: string | SequenceObject
```

#### String Format

```yaml
sequence: |
  Client ->> Server: Request
  Server ->> DB: Query
  DB -->> Server: Result
  Server -->> Client: Response
```

#### Object Format

```yaml
sequence:
  content: string
  style:
    participantWidth: number
    participantHeight: number
    messageGap: number
    fontSize: number
    marginX: number
    y: number
```

#### Participant Declaration

```yaml
sequence: |
  participant Alice
  participant Bob
  Alice ->> Bob: Hello
```

#### Arrow Types

| Syntax | Description |
|--------|-------------|
| `->>` | Async message |
| `-->>` | Reply (dashed) |
| `->` | Sync message |
| `-->` | Dashed line |
| `-x` | Failed/crossed |

---

### 8.9 diagram (DiagramContent)

```yaml
body:
  diagram:
    type: box-arrow
    boxes:
      - string
      - string
      - ...
```

Simple box-arrow flow diagram.

---

### 8.10 note (NoteContent)

```yaml
body:
  text: string
  note: string
```

#### Semantics

* `note` is auxiliary information for the presenter
* Renderers **may choose** whether or not to output it

---

## 9. Normalization

Normalization is the process of
**absorbing representational variations and unifying internal representation**.

### 9.1 Example

```yaml
text: "A"
```

⬇ After normalization

```yaml
text:
  - "A"
```

---

## 10. Validation

Validation is performed in **three stages**.

---

### 10.1 Structural Validation (Schema)

* Presence of required keys
* Type correctness

#### Example Error

```
PDL-ESCH001 slides must be an array
```

---

### 10.2 Semantic Validation

* Required conditions for `figure`
* Empty titles
* Invalid combinations

#### Example Error

```
PDL-ESEM002 figure requires text
```

---

### 10.3 Format / Constraint Validation

* Excessive line count
* Exceeding recommended maximum items
* Reduced readability

#### Example Warning

```
PDL-WFMT001 too many bullet points
```

---

## 11. Issue Model

### 11.1 Issue Definition

```ts
type Issue = {
  code: string
  where: string
  message: string
}
```

### 11.2 Classification

| Prefix | Type |
|--------|------|
| PDL-E | Error (fatal) |
| PDL-W | Warning (nonfatal) |

---

## 12. where Field Specification

The `where` field must be **interpretable by both humans and tools**.

Examples:

* `slides[2].title`
* `slides[0].body.figure`
* `slides[1].body.flowchart`

---

## 13. Layout Semantics

PDL does **not directly specify layout**, but the following can be derived internally:

* Estimated line count
* Figure-to-text ratio
* Information density
* Diagram complexity

These are used for **warning generation and renderer decisions**.

---

## 14. Rendering Responsibility (Non-Normative)

PDL does not define:

* Fonts
* Colors (except as hints)
* Exact coordinates (except for shapes)
* Animations

These are the responsibility of the **Renderer**.

---

## 15. Relationship with CLI / Browser / IDE

| Environment | Responsibility |
|-------------|----------------|
| CLI | Final generation / CI |
| Browser | Authoring / validation |
| IDE | Persistent linting / completion |

All must use the **same PDL core**.

---

## 16. Future Extensions (Reserved)

The following are reserved for future versions:

* Multiple figures per slide
* Section structures
* Conditional slides
* Metadata extensions
* Custom themes
* Animation definitions
* Subgraph support in flowcharts

---

## 17. Versioning

* PDL v0.x: Experimental
* PDL v1.0: Backward compatibility guaranteed

FrameNote v0.4.1 conforms to **PDL v0.4.1**.

---

## 18. Summary (Normative Statement)

> PDL treats presentations
> not as something to be "drawn",
> but as documents that can be
> **designed, validated, and reasoned about**.

---

## Appendix A: Minimal Complete Example

```yaml
meta:
  project: Example
  theme: default

slides:
  - title: Purpose
    body:
      text:
        - Clarify scope
        - Align assumptions
```

---

## Appendix B: Full Feature Example

```yaml
meta:
  project: PDL Demo
  author: FrameNote Team
  date: "2025"
  theme: default
  footer:
    show: true
    left: "{author}"
    right: "{page} / {total}"

slides:
  # Title slide
  - template: title
    title: "PDL v0.4.1 Demo"
    subtitle: "Presentation Description Language"
    author: "FrameNote"
    date: "2025"

  # Table example
  - title: "Table Example"
    body:
      table: |
        | Feature | Status |
        |:--------|:------:|
        | Tables  | ✅     |
        | Code    | ✅     |
        | Math    | ✅     |
      tableStyle:
        colWidths: [300, 150]

  # Code example
  - title: "Code Example"
    body:
      code:
        language: python
        content: |
          def hello(name):
              return f"Hello, {name}!"
        style:
          theme: dark

  # Math example
  - title: "Math Equations"
    body:
      math:
        - "E = mc^2"
        - "F = ma"
      mathStyle:
        fontSize: 48
        align: center

  # Flowchart example
  - title: "Flowchart"
    body:
      flowchart: |
        direction: LR
        A[Start] --> B(Process)
        B --> C{Decision}
        C -->|Yes| D[End]
        C -->|No| B

  # Sequence diagram example
  - title: "Sequence Diagram"
    body:
      sequence: |
        Client ->> Server: Request
        Server -->> Client: Response
```

---

## Appendix C: Changelog

### v0.4.1

* Fixed font selector UI synchronization

### v0.4

* Added `table` with Markdown format and alignment
* Added `tableStyle` for table customization
* Added `code` with syntax highlighting
* Added code themes (dark/light/match)
* Added `math` with KaTeX support
* Added inline math in text (`$...$`)
* Added `mathStyle` for math customization
* Added `shapes` for SVG primitives
* Added `flowchart` with Mermaid-style syntax
* Added `sequence` for sequence diagrams
* Added flowchart/sequence sizing options
* Added 8 slide templates
* Added 10 preset themes
* Added 7 font presets with Google Fonts
* Added custom font configuration
* Added header/footer with placeholders

### v0.3

* Added FormatObject for per-slide styling
* Added header/footer system
* Added image management

### v0.2

* Initial PDL specification
* Basic slide structure
* Theme system
