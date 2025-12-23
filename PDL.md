# PDL

## Presentation Description Language

### Detailed Specification v0.2 (FrameNote)

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
  theme: string
```

### 5.2 Constraints

* `meta` is **excluded from structural validation**
* It may be used as **shared metadata** (headers, footers, etc.)
  across CLI / Browser / IDE implementations
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
  body: Body
```

### 7.2 Required Keys

* `title`
* `body`

---

## 8. body Definition (Body)

`body` represents the **primary content of a slide**.

---

### 8.1 Basic Form (text)

```yaml
body:
  text: string | string[]
```

#### Semantics

* `string` : a single paragraph
* `string[]` : a logical list (bullet points)

---

### 8.2 With Figure (figure)

```yaml
body:
  figure:
    src: string
    caption: string
  text: string | string[]
```

#### Constraints

* If `figure` is specified, `text` is mandatory
* At most **one figure per slide** is allowed

---

### 8.3 Emphasis / Auxiliary Information (note)

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

| Prefix | Type               |
| ------ | ------------------ |
| PDL-E  | Error (fatal)      |
| PDL-W  | Warning (nonfatal) |

---

## 12. where Field Specification

The `where` field must be **interpretable by both humans and tools**.

Examples:

* `slides[2].title`
* `slides[0].body.figure`

---

## 13. Layout Semantics

PDL does **not directly specify layout**, but the following can be derived internally:

* Estimated line count
* Figure-to-text ratio
* Information density

These are used for **warning generation and renderer decisions**.

---

## 14. Rendering Responsibility (Non-Normative)

PDL does not define:

* Fonts
* Colors
* Exact coordinates
* Animations

These are the responsibility of the **Renderer**.

---

## 15. Relationship with CLI / Browser / IDE

| Environment | Responsibility                  |
| ----------- | ------------------------------- |
| CLI         | Final generation / CI           |
| Browser     | Authoring / validation          |
| IDE         | Persistent linting / completion |

All must use the **same PDL core**.

---

## 16. Future Extensions (Reserved)

The following are reserved for future versions:

* Multiple figures per slide
* Section structures
* Conditional slides
* Metadata extensions

---

## 17. Versioning

* PDL v0.x: Experimental
* PDL v1.0: Backward compatibility guaranteed

FrameNote v0.2 conforms to **PDL v0.2**.

---

## 18. Summary (Normative Statement)

> PDL treats presentations
> not as something to be “drawn”,
> but as documents that can be
> **designed, validated, and reasoned about**.

---

## Appendix A: Minimal Complete Example

```yaml
meta:
  project: Example

slides:
  - title: Purpose
    body:
      text:
        - Clarify scope
        - Align assumptions
```

