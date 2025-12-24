# FrameNote Tutorial

A step-by-step guide for beginners to create presentations with FrameNote.

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Your First Presentation](#2-your-first-presentation)
3. [Understanding PDL Structure](#3-understanding-pdl-structure)
4. [Using Templates](#4-using-templates)
5. [Applying Themes](#5-applying-themes)
6. [Adding Images](#6-adding-images)
7. [Creating Diagrams](#7-creating-diagrams)
8. [Customizing with Format](#8-customizing-with-format)
9. [Header and Footer](#9-header-and-footer)
10. [Exporting Your Presentation](#10-exporting-your-presentation)
11. [Tips and Tricks](#11-tips-and-tricks)

---

## 1. Getting Started

### Opening FrameNote

1. Download `framenote-v0.3.html`
2. Double-click to open in your browser
3. You'll see the editor on the left and preview on the right

### Interface Overview

```
┌─────────────────────────────────────────────────────────┐
│  🅵 FrameNote v0.3    [Theme ▼] [Open][Save][PDF][PPTX] │
├─────────┬───────────────────────┬───────────────────────┤
│ Outline │  PDL Editor           │  Preview              │
│         │                       │                       │
│ □ Slide1│  meta:                │  ┌─────────────────┐  │
│ □ Slide2│    project: "..."     │  │                 │  │
│ □ Slide3│  slides:              │  │   Slide View    │  │
│         │    - title: "..."     │  │                 │  │
│         │                       │  └─────────────────┘  │
├─────────┴───────────────────────┼───────────────────────┤
│  [Editor] [Images] [Validation] │     ◀  1/3  ▶        │
└─────────────────────────────────┴───────────────────────┘
```

---

## 2. Your First Presentation

Let's create a simple 3-slide presentation.

### Step 1: Clear the editor

Delete the sample content and start fresh.

### Step 2: Write the meta section

```yaml
meta:
  project: "My First Presentation"
  author: "Your Name"
  date: "2025"
  theme: default
```

### Step 3: Add the slides section

```yaml
slides:
```

### Step 4: Add a title slide

```yaml
slides:
  - template: title
    title: "Welcome to FrameNote"
    subtitle: "Creating presentations with text"
    author: "Your Name"
    date: "2025"
```

### Step 5: Add a content slide

```yaml
  - title: "What is FrameNote?"
    body:
      text:
        - "A text-first presentation tool"
        - "Write YAML, get beautiful slides"
        - "No clicking, no dragging"
```

### Step 6: Add a closing slide

```yaml
  - template: thanks
    title: "Thank You!"
    message: "Questions?"
    contact: "your.email@example.com"
```

### Complete Example

```yaml
meta:
  project: "My First Presentation"
  author: "Your Name"
  date: "2025"
  theme: default

slides:
  - template: title
    title: "Welcome to FrameNote"
    subtitle: "Creating presentations with text"
    author: "Your Name"
    date: "2025"

  - title: "What is FrameNote?"
    body:
      text:
        - "A text-first presentation tool"
        - "Write YAML, get beautiful slides"
        - "No clicking, no dragging"

  - template: thanks
    title: "Thank You!"
    message: "Questions?"
    contact: "your.email@example.com"
```

---

## 3. Understanding PDL Structure

### Basic Structure

Every PDL file has two main sections:

```yaml
meta:      # Presentation settings
  ...

slides:    # Array of slides
  - ...    # First slide
  - ...    # Second slide
```

### Indentation Rules

PDL uses YAML format. Indentation matters!

```yaml
# Correct ✓
meta:
  project: "Name"    # 2 spaces indent

# Wrong ✗
meta:
project: "Name"      # No indent
```

### Slide Types

**Standard Slide:**
```yaml
- title: "Slide Title"
  body:
    text:
      - "Point 1"
      - "Point 2"
```

**Template Slide:**
```yaml
- template: quote
  quote: "Text here"
  author: "Author"
```

---

## 4. Using Templates

### Title Template

Perfect for opening slides.

```yaml
- template: title
  title: "Main Title"
  subtitle: "Subtitle"
  author: "Author Name"
  date: "2025"
```

### Section Template

Use to divide your presentation into parts.

```yaml
- template: section
  title: "Part 1"
  subtitle: "Introduction"
```

### Quote Template

Display memorable quotes.

```yaml
- template: quote
  quote: "The only way to do great work is to love what you do."
  author: "Steve Jobs"
  source: "Stanford Commencement Speech, 2005"
```

### Agenda Template

Show your presentation outline.

```yaml
- template: agenda
  title: "Today's Agenda"
  items:
    - "Introduction"
    - "Main Topic"
    - "Demo"
    - "Q&A"
```

### Comparison Template

Compare two things side by side.

```yaml
- template: comparison
  title: "Old vs New"
  left:
    label: "Before"
    items:
      - "Manual process"
      - "Time consuming"
      - "Error prone"
  right:
    label: "After"
    items:
      - "Automated"
      - "Fast"
      - "Reliable"
```

### Timeline Template

Show chronological events.

```yaml
- template: timeline
  title: "Project Timeline"
  events:
    - date: "Q1"
      title: "Planning"
    - date: "Q2"
      title: "Development"
    - date: "Q3"
      title: "Testing"
    - date: "Q4"
      title: "Launch"
```

### Q&A Template

End with questions.

```yaml
- template: qa
  title: "Questions?"
  contact: "email@example.com"
```

### Thanks Template

Close your presentation.

```yaml
- template: thanks
  title: "Thank You!"
  message: "For more information"
  contact: "https://example.com"
```

---

## 5. Applying Themes

### Using the UI Selector

Click the Theme dropdown in the header and select a theme.

### Using meta.theme

```yaml
meta:
  theme: dark    # Options: default, corporate, minimal, dark,
                 #          nature, sunset, ocean, lavender,
                 #          rose, midnight
```

### Theme Showcase

| Theme | Best For |
|-------|----------|
| `default` | General purpose |
| `corporate` | Business presentations |
| `minimal` | Clean, text-focused |
| `dark` | Tech talks, demos |
| `nature` | Environmental topics |
| `sunset` | Warm, friendly tone |
| `ocean` | Professional, calm |
| `lavender` | Creative, modern |
| `rose` | Marketing, lifestyle |
| `midnight` | Premium, dramatic |

---

## 6. Adding Images

### Step 1: Upload Images

1. Click the "Images" tab below the editor
2. Drag and drop image files, or click to select
3. Images are stored in your project

### Step 2: Reference in PDL

**Figure with Caption:**
```yaml
- title: "Our Product"
  body:
    style: figure_caption
    figure: product-photo.png
    caption: "The new design"
```

**Image in Split Layout:**
```yaml
- title: "Features"
  body:
    style: split
    direction: horizontal
    ratio: "1:1"
    left:
      figure: screenshot.png
    right:
      text:
        - "Feature 1"
        - "Feature 2"
```

---

## 7. Creating Diagrams

### Box-Arrow Diagram

```yaml
- title: "Process Flow"
  body:
    diagram:
      type: box-arrow
      direction: horizontal
      boxes:
        - "Input"
        - "Process"
        - "Output"
```

### Vertical Diagram

```yaml
- title: "Hierarchy"
  body:
    diagram:
      type: box-arrow
      direction: vertical
      boxes:
        - "CEO"
        - "Manager"
        - "Team"
```

---

## 8. Customizing with Format

### Global Format

Apply to all slides:

```yaml
meta:
  format:
    background:
      color: "#f0f9ff"
    accent:
      color: "#0284c7"
    title:
      color: "#0c4a6e"
      size: 52
      weight: "700"
    text:
      color: "#334155"
      size: 28
    bullet:
      color: "#06b6d4"
```

### Per-Slide Override

Override for specific slides:

```yaml
- title: "Alert!"
  format:
    background:
      color: "#fef2f2"
    title:
      color: "#dc2626"
  body:
    text:
      - "This is important"
```

### Format Priority

1. Slide format (highest)
2. Meta format
3. Theme colors
4. Default values (lowest)

---

## 9. Header and Footer

### Basic Setup

```yaml
meta:
  header:
    show: true
    text: "{project}"
  footer:
    show: true
    left: "{author}"
    center: "{date}"
    right: "{page} / {total}"
```

### Available Placeholders

| Placeholder | Output |
|-------------|--------|
| `{project}` | Project name from meta |
| `{author}` | Author name from meta |
| `{date}` | Date from meta |
| `{page}` | Current slide number |
| `{total}` | Total number of slides |

### Styling Header/Footer

```yaml
meta:
  header:
    show: true
    text: "{project}"
    format:
      color: "#64748b"
      size: 20
      background: "#f1f5f9"
  footer:
    show: true
    left: "{author}"
    right: "{page} / {total}"
    format:
      color: "#94a3b8"
      size: 18
```

---

## 10. Exporting Your Presentation

### PDF Export

1. Click the "PDF" button
2. Wait for generation
3. File downloads automatically

Best for: Printing, email attachments

### PPTX Export

1. Click the "PPTX" button
2. Wait for generation
3. File downloads automatically

Best for: Editing in PowerPoint, sharing with colleagues

### HTML Export

1. Click the "HTML" button
2. Wait for generation
3. File downloads automatically

Best for: Web hosting, offline viewing

### Saving Your Project

1. Click "Save" button
2. Downloads as `.fnote` file
3. Contains all content and images

---

## 11. Tips and Tricks

### Using Code Completion

Press `Ctrl+Space` to open suggestions:

- After `- ` for slide snippets
- In meta section for settings
- Anywhere for keywords

### Quick Slide Navigation

- Click slides in the Outline panel
- Use `◀` `▶` buttons below preview

### Presentation Mode

- Click "Present" or press `F11`
- Use arrow keys to navigate
- Press `Esc` to exit

### YAML Tips

**Multiline Text:**
```yaml
- title: "Long Title"
  body:
    text:
      - "This is a very long bullet point that
         continues on the next line"
```

**Special Characters:**
```yaml
- title: "Using Quotes"
  body:
    text:
      - "Use double quotes for: colons, special chars"
      - 'Or single quotes work too'
```

### Common Mistakes

❌ **Wrong indentation:**
```yaml
meta:
project: "Name"  # Should be indented!
```

✓ **Correct:**
```yaml
meta:
  project: "Name"
```

❌ **Missing dash for slides:**
```yaml
slides:
  title: "Slide"  # Missing dash!
```

✓ **Correct:**
```yaml
slides:
  - title: "Slide"
```

❌ **Wrong quotes:**
```yaml
title: Project "Name"  # Needs outer quotes!
```

✓ **Correct:**
```yaml
title: "Project \"Name\""
# or
title: 'Project "Name"'
```

---

## What's Next?

- Try different templates
- Experiment with themes
- Create your own color schemes with format
- Share your presentations!

Happy presenting! 🎉
