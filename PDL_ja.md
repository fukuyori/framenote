# PDL

## Presentation Description Language

### 詳細仕様 v0.5 (FrameNote)

---

## 1. 概要（Overview）

PDL（Presentation Description Language）は、
**プレゼンテーションを「構造化文書」として記述するための宣言的言語**である。

PDL は以下を目的とする。

* スライドの構造・制約・意味を明示的に表現する
* レイアウト判断を機械的・決定的に行う
* 編集環境（CLI / Browser / IDE）間で同一の検証結果を保証する

PDL は **描画言語ではない**。
PDL は **構造・意味・制約を記述する言語**である。

---

## 2. 基本設計思想（Design Principles）

### 2.1 Structure First

PDL はピクセルや座標を扱わない。
すべては **意味的構造**として表現される。

### 2.2 Deterministic Validation

同一入力に対し、
すべての実装は **同一のエラー・警告・正規化結果**を返さなければならない。

### 2.3 Environment Neutral

PDL 自体は環境に依存しない。

* CLI
* Browser
* IDE
* CI
* AI

すべて同一仕様に従う。

---

## 3. 文書形式（Document Format）

PDL 文書は以下の形式で表現される。

* YAML（推奨）
* JSON（完全互換）

文字コードは UTF-8。

---

## 4. ルート構造（Top-Level Structure）

```yaml
meta: MetaObject
slides: SlideArray
```

### 必須キー

* `slides`

### 任意キー

* `meta`

---

## 5. meta オブジェクト（MetaObject）

### 5.1 定義

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

### 5.2 theme（ThemeName）

利用可能な値：

| テーマ | 説明 |
|--------|------|
| `default` | 白背景、インディゴアクセント |
| `corporate` | 白背景、青アクセント |
| `minimal` | グレー背景、スレートアクセント |
| `dark` | ダーク背景、シアンアクセント |
| `nature` | 緑系背景、緑アクセント |
| `sunset` | オレンジ系背景、オレンジアクセント |
| `ocean` | 青系背景、スカイアクセント |
| `lavender` | 紫系背景、パープルアクセント |
| `rose` | ピンク系背景、ローズアクセント |
| `midnight` | ネイビー背景、バイオレットアクセント |

### 5.3 font（FontPreset | FontObject）

#### プリセット値（FontPreset）

| プリセット | 見出し | 本文 | コード |
|-----------|--------|------|--------|
| `sans` | Noto Sans JP | Noto Sans JP | Fira Code |
| `serif` | Noto Serif JP | Noto Serif JP | Source Code Pro |
| `rounded` | M PLUS Rounded 1c | M PLUS 1p | Fira Code |
| `business` | BIZ UDGothic | BIZ UDGothic | Roboto Mono |
| `modern` | Montserrat | Noto Sans JP | JetBrains Mono |
| `elegant` | Playfair Display | Shippori Mincho | Source Code Pro |
| `handwritten` | Klee One | Klee One | Fira Code |

#### カスタムフォントオブジェクト（FontObject）

```yaml
font:
  heading: string  # Google Fontsフォント名
  body: string     # Google Fontsフォント名
  code: string     # 等幅フォント名
```

#### 利用可能なGoogle Fonts

**日本語：**
- Noto Sans JP, Noto Serif JP
- M PLUS 1p, M PLUS Rounded 1c
- Zen Maru Gothic, BIZ UDGothic
- Shippori Mincho, Klee One

**欧文：**
- Inter, Roboto, Montserrat
- Open Sans, Lato, Playfair Display

**コード：**
- Fira Code, Source Code Pro
- JetBrains Mono, Roboto Mono

### 5.4 header（HeaderObject）

```yaml
header:
  show: boolean
  text: string
  format:
    color: string
    size: number
    background: string
```

### 5.4 footer（FooterObject）

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

### 5.5 プレースホルダ

ヘッダー/フッターテキストで使用可能なプレースホルダ：

| プレースホルダ | 説明 |
|---------------|------|
| `{project}` | プロジェクト名 |
| `{author}` | 著者名 |
| `{date}` | 日付 |
| `{page}` | 現在のページ番号 |
| `{total}` | 総ページ数 |

### 5.6 制約

* `meta` は **構造検証対象外**
* 実装間で **共通情報**として利用可能
* スライド内容の意味解釈には影響しない

---

## 6. slides 配列（SlideArray）

### 6.1 定義

```yaml
slides:
  - Slide
  - Slide
  - ...
```

### 6.2 制約

* 空配列は禁止（警告またはエラー）
* 順序は意味を持つ
* 各要素は `Slide` 型でなければならない

---

## 7. Slide 定義

### 7.1 基本構造

```yaml
- title: string
  subtitle: string
  template: TemplateName
  body: Body
  format: FormatObject
  notes: string
```

### 7.2 必須キー

* `title`

### 7.3 任意キー

* `subtitle`
* `template`
* `body`
* `format`
* `notes`

### 7.4 template（TemplateName）

| テンプレート | 説明 | 必須キー |
|-------------|------|----------|
| `title` | タイトルスライド | title, subtitle, author, date |
| `section` | セクション区切り | title, subtitle |
| `quote` | 引用 | quote, author |
| `qa` | Q&Aスライド | title, contact |
| `thanks` | 終了スライド | title, message, contact |
| `agenda` | 目次 | title, items |
| `comparison` | 2列比較 | title, left, right |
| `timeline` | タイムライン | title, events |

### 7.5 format（FormatObject）

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

## 8. body 定義（Body）

`body` は **スライドの主要内容**を表す。

---

### 8.1 text（TextContent）

```yaml
body:
  text: string | string[]
```

#### 意味

* `string` : 単一段落
* `string[]` : 箇条書き（論理的リスト）

#### インライン数式

テキスト内に `$...$` 構文でインライン数式を埋め込み可能：

```yaml
text:
  - "アインシュタインの式: $E = mc^2$"
  - "円の面積: $S = \\pi r^2$"
```

---

### 8.2 figure（FigureContent）

```yaml
body:
  figure: string
  caption: string
  style: figure_caption | figure_bullets
  text: string[]
```

#### 制約

* `figure` は画像ファイル名またはURLを指定
* `style` はレイアウトモードを決定
* `figure` は 1 スライドにつき最大 1

---

### 8.3 table（TableContent）

```yaml
body:
  table: string
  tableStyle: TableStyleObject
```

#### テーブル形式

Markdownテーブル構文：

```yaml
table: |
  | ヘッダー1 | ヘッダー2 | ヘッダー3 |
  |:---------|:--------:|---------:|
  | 左揃え   | 中央揃え | 右揃え   |
```

#### 列アライメント

| 構文 | アライメント |
|------|-------------|
| `:---` | 左揃え |
| `:---:` | 中央揃え |
| `---:` | 右揃え |
| `---` | 左揃え（デフォルト） |

#### tableStyle（TableStyleObject）

```yaml
tableStyle:
  colWidths: number[]      # 列幅（ピクセル）
  rowHeight: number        # 行高さ（ピクセル）
  headerBg: string         # ヘッダー背景色
  headerColor: string      # ヘッダー文字色
  striped: boolean         # 縞模様
  border: boolean          # 罫線表示
  fontSize: number         # フォントサイズ
  x: number                # X位置
  y: number                # Y位置
```

---

### 8.4 code（CodeContent）

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

#### language（LanguageName）

対応言語：

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

#### style.theme（CodeTheme）

| 値 | 説明 |
|----|------|
| `dark` | ダーク背景（デフォルト） |
| `light` | ライト背景 |
| `match` | スライドテーマに合わせた配色 |

---

### 8.5 math（MathContent）

```yaml
body:
  math: string | string[]
  mathStyle: MathStyleObject
```

#### 意味

* `string` : 単一の数式
* `string[]` : 複数の数式

#### mathStyle（MathStyleObject）

```yaml
mathStyle:
  fontSize: number         # フォントサイズ（デフォルト: 36）
  align: left | center | right
  lineSpacing: number      # 行間倍率（デフォルト: 1.2）
```

#### LaTeX構文

KaTeX LaTeX構文を完全サポート：

| 構文 | 説明 |
|------|------|
| `x^2` | 上付き文字 |
| `x_i` | 下付き文字 |
| `\frac{a}{b}` | 分数 |
| `\sqrt{x}` | 平方根 |
| `\sum_{i=1}^{n}` | 総和 |
| `\int_{a}^{b}` | 積分 |
| `\alpha, \beta, \gamma` | ギリシャ文字 |
| `\begin{pmatrix}...\end{pmatrix}` | 行列 |

---

### 8.6 shapes（ShapesContent）

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

#### type（ShapeType）

| タイプ | 必須プロパティ | 説明 |
|--------|---------------|------|
| `rect` | x, y, width, height | 矩形 |
| `circle` | x, y, r | 円 |
| `ellipse` | x, y, rx, ry | 楕円 |
| `line` | x, y, x2, y2 | 線 |
| `arrow` | x, y, x2, y2 | 矢印 |
| `diamond` | x, y, size | ひし形 |
| `triangle` | x, y, width, height | 三角形 |
| `polygon` | points | 多角形 |
| `polyline` | points | 折れ線 |
| `path` | d | SVGパス |
| `text` | x, y, label | テキスト |
| `group` | children, transform | グループ |

---

### 8.7 flowchart（FlowchartContent）

```yaml
body:
  flowchart: string | FlowchartObject
```

#### 文字列形式

```yaml
flowchart: |
  direction: LR
  A[開始] --> B(処理)
  B --> C{判断}
  C -->|Yes| D[終了]
  C -->|No| B
```

#### オブジェクト形式

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

#### ノード形状

| 構文 | 形状 |
|------|------|
| `[テキスト]` | 矩形 |
| `(テキスト)` | 角丸矩形 |
| `{テキスト}` | ひし形 |
| `((テキスト))` | 円 |
| `[[テキスト]]` | スタジアム |

#### 矢印タイプ

| 構文 | 説明 |
|------|------|
| `-->` | 矢印 |
| `-->｜ラベル｜` | ラベル付き矢印 |
| `-.->` | 点線矢印 |
| `===>` | 太線矢印 |
| `---` | 線（矢印なし） |

#### direction（方向）

| 値 | 説明 |
|----|------|
| `LR` | 左から右（デフォルト） |
| `RL` | 右から左 |
| `TB` | 上から下 |
| `BT` | 下から上 |

---

### 8.8 sequence（SequenceContent）

```yaml
body:
  sequence: string | SequenceObject
```

#### 文字列形式

```yaml
sequence: |
  Client ->> Server: リクエスト
  Server ->> DB: クエリ
  DB -->> Server: 結果
  Server -->> Client: レスポンス
```

#### オブジェクト形式

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

#### 参加者宣言

```yaml
sequence: |
  participant Alice
  participant Bob
  Alice ->> Bob: こんにちは
```

#### 矢印タイプ

| 構文 | 説明 |
|------|------|
| `->>` | 非同期メッセージ |
| `-->>` | 応答（点線） |
| `->` | 同期メッセージ |
| `-->` | 点線 |
| `-x` | 失敗/中断 |

---

### 8.9 diagram（DiagramContent）

```yaml
body:
  diagram:
    type: box-arrow
    boxes:
      - string
      - string
      - ...
```

シンプルなボックス矢印フロー図。

---

### 8.10 note（NoteContent）

```yaml
body:
  text: string
  note: string
```

#### 意味

* `note` は発表者向け補助情報
* レンダラーは出力してもよい／しなくてもよい

---

## 9. 正規化（Normalization）

正規化とは、
**表記の揺れを吸収し、内部表現を統一する処理**である。

### 9.1 例

```yaml
text: "A"
```

⬇ 正規化後

```yaml
text:
  - "A"
```

---

## 10. 検証（Validation）

検証は **3段階**で行われる。

---

### 10.1 構造検証（Schema）

* 必須キーの存在
* 型の正当性

#### 例エラー

```
PDL-ESCH001 slides must be an array
```

---

### 10.2 意味検証（Semantic）

* figure の必須条件
* 空タイトル
* 不正な組み合わせ

#### 例エラー

```
PDL-ESEM002 figure requires text
```

---

### 10.3 形式・制約検証（Format）

* 行数オーバー
* 推奨最大項目数超過
* 可読性低下

#### 例警告

```
PDL-WFMT001 too many bullet points
```

---

## 11. エラー／警告モデル（Issue Model）

### 11.1 Issue 定義

```ts
type Issue = {
  code: string
  where: string
  message: string
}
```

### 11.2 分類

| Prefix | 種別 |
|--------|------|
| PDL-E | Error（致命） |
| PDL-W | Warning（非致命） |

---

## 12. where フィールド仕様

`where` は **人間とツールの両方が解釈可能**でなければならない。

例：

* `slides[2].title`
* `slides[0].body.figure`
* `slides[1].body.flowchart`

---

## 13. レイアウト判断（Layout Semantics）

PDL は **レイアウトを直接指定しない**が、
以下の情報を内部的に計算可能である。

* 行数推定
* 図表比率
* 情報密度
* ダイアグラム複雑度

これらは **警告生成・レンダラー判断**に利用される。

---

## 14. レンダリング責務（Non-Normative）

PDL は以下を規定しない。

* フォント
* 色（ヒントとしてのみ）
* 正確な座標（shapes除く）
* アニメーション

それらは **Renderer の責務**である。

---

## 15. CLI / Browser / IDE との関係

| 環境 | 役割 |
|------|------|
| CLI | 最終生成・CI |
| Browser | 設計・検証 |
| IDE | 常駐 lint / 補完 |

すべて **同一 PDL core** を使用しなければならない。

---

## 16. 将来拡張（Reserved）

以下は将来予約とする。

* 複数 figure
* セクション構造
* 条件付きスライド
* メタデータ拡張
* カスタムテーマ
* アニメーション定義
* フローチャートのサブグラフ

---

## 17. バージョニング

* PDL v0.x：実験的
* PDL v1.0：後方互換保証

FrameNote v0.5 は **PDL v0.5** に準拠する。

---

## 18. まとめ（Normative Statement）

> PDL はプレゼンテーションを
> 「描くもの」ではなく
> 「設計し、検証できる文書」として扱うための言語である。

---

## 付録A：最小完全例

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

## 付録B：全機能サンプル

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
  # タイトルスライド
  - template: title
    title: "PDL v0.5 デモ"
    subtitle: "Presentation Description Language"
    author: "FrameNote"
    date: "2025"

  # テーブル例
  - title: "テーブル例"
    body:
      table: |
        | 機能 | 状態 |
        |:-----|:----:|
        | テーブル | ✅ |
        | コード | ✅ |
        | 数式 | ✅ |
      tableStyle:
        colWidths: [300, 150]

  # コード例
  - title: "コード例"
    body:
      code:
        language: python
        content: |
          def hello(name):
              return f"Hello, {name}!"
        style:
          theme: dark

  # 数式例
  - title: "数式"
    body:
      math:
        - "E = mc^2"
        - "F = ma"
      mathStyle:
        fontSize: 48
        align: center

  # フローチャート例
  - title: "フローチャート"
    body:
      flowchart: |
        direction: LR
        A[開始] --> B(処理)
        B --> C{判断}
        C -->|Yes| D[終了]
        C -->|No| B

  # シーケンス図例
  - title: "シーケンス図"
    body:
      sequence: |
        Client ->> Server: リクエスト
        Server -->> Client: レスポンス
```

---

## 付録C：更新履歴

### v0.5

* フォント選択UIの同期を修正
* フルスクリーンプレゼンテーションモードを追加
* スライドショー時のクリックナビゲーションを追加
* レーザーポインター機能を追加
* スライドのドラッグ＆ドロップ並べ替えを追加
* 動画埋め込み機能を追加（YouTube、Vimeo、ローカル）
* %指定対応を追加（動画、画像、図形、テーブル列幅）
* 13種類の新テンプレートを追加: image, steps, cards, twocolumn, threecolumn, blank, bigtext, mindmap, video, table, code, flowchart

### v0.4

* Markdown形式の `table` とアライメント追加
* テーブルカスタマイズ用 `tableStyle` 追加
* シンタックスハイライト付き `code` 追加
* コードテーマ（dark/light/match）追加
* KaTeXサポートの `math` 追加
* テキスト内インライン数式（`$...$`）追加
* 数式カスタマイズ用 `mathStyle` 追加
* SVGプリミティブ用 `shapes` 追加
* Mermaid風構文の `flowchart` 追加
* シーケンス図 `sequence` 追加
* フローチャート/シーケンス図サイズ変更オプション追加
* 8種類のスライドテンプレート追加
* 10種類のプリセットテーマ追加
* 7種類のフォントプリセット（Google Fonts）追加
* カスタムフォント設定追加
* プレースホルダ付きヘッダー/フッター追加

### v0.3

* スライド毎スタイリング用 FormatObject 追加
* ヘッダー/フッターシステム追加
* 画像管理追加

### v0.2

* 初期PDL仕様
* 基本スライド構造
* テーマシステム
