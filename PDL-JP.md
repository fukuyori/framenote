# PDL

## Presentation Description Language

### Detailed Specification v0.2 (FrameNote)

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
  theme: string
```

### 5.2 制約

* `meta` は **構造検証対象外**
* CLI / Browser / IDE において **共通情報（ヘッダ・フッタ等）**として利用可能
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
  body: Body
```

### 7.2 必須キー

* `title`
* `body`

---

## 8. body 定義（Body）

`body` は **スライドの主要内容**を表す。

### 8.1 基本形（text）

```yaml
body:
  text: string | string[]
```

#### 意味

* `string` : 単一段落
* `string[]` : 箇条書き（論理的リスト）

---

### 8.2 図表付き（figure）

```yaml
body:
  figure:
    src: string
    caption: string
  text: string | string[]
```

#### 制約

* `figure` を指定した場合、`text` は必須
* `figure` は 1 スライドにつき最大 1

---

### 8.3 強調・補助情報（note）

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

| Prefix | 種別           |
| ------ | ------------ |
| PDL-E  | Error（致命）    |
| PDL-W  | Warning（非致命） |

---

## 12. where フィールド仕様

`where` は **人間とツールの両方が解釈可能**でなければならない。

例：

* `slides[2].title`
* `slides[0].body.figure`

---

## 13. レイアウト判断（Layout Semantics）

PDL は **レイアウトを直接指定しない**が、
以下の情報を内部的に計算可能である。

* 行数推定
* 図表比率
* 情報密度

これらは **警告生成・レンダラー判断**に利用される。

---

## 14. レンダリング責務（Non-Normative）

PDL は以下を規定しない。

* フォント
* 色
* 正確な座標
* アニメーション

それらは **Renderer の責務**である。

---

## 15. CLI / Browser / IDE との関係

| 環境      | 役割           |
| ------- | ------------ |
| CLI     | 最終生成・CI      |
| Browser | 設計・検証        |
| IDE     | 常駐 lint / 補完 |

すべて **同一 PDL core** を使用しなければならない。

---

## 16. 将来拡張（Reserved）

以下は将来予約とする。

* 複数 figure
* セクション構造
* 条件付きスライド
* メタデータ拡張

---

## 17. バージョニング

* PDL v0.x：実験的
* PDL v1.0：後方互換保証

FrameNote v0.2 は **PDL v0.2** に準拠する。

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

slides:
  - title: Purpose
    body:
      text:
        - Clarify scope
        - Align assumptions
```

