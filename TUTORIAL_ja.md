# FrameNote v0.4 チュートリアル

このチュートリアルでは、FrameNoteの基本的な使い方から高度な機能まで解説します。

## 目次

1. [はじめに](#1-はじめに)
2. [基本的なスライド作成](#2-基本的なスライド作成)
3. [テンプレートの活用](#3-テンプレートの活用)
4. [テーブル](#4-テーブル)
5. [コードブロック](#5-コードブロック)
6. [数式](#6-数式)
7. [フローチャート](#7-フローチャート)
8. [シーケンス図](#8-シーケンス図)
9. [図形描画](#9-図形描画)
10. [テーマとカスタマイズ](#10-テーマとカスタマイズ)
11. [エクスポート](#11-エクスポート)

---

## 1. はじめに

### FrameNoteとは

FrameNoteは、YAML形式のPDL（Presentation Description Language）を使用してスライドを作成するツールです。PowerPointのようなGUIではなく、テキストベースで宣言的にプレゼンテーションを記述します。

### 起動方法

1. `framenote.html` をダウンロード
2. ブラウザで開く
3. 左側のエディタにPDLを記述
4. 右側にリアルタイムプレビュー

---

## 2. 基本的なスライド作成

### 最小構成

```yaml
slides:
  - title: "はじめてのスライド"
```

### メタデータの追加

```yaml
meta:
  project: プロジェクト名
  author: 作者名
  date: "2025-01-01"
  theme: default

slides:
  - title: "タイトル"
```

### 本文の追加

```yaml
slides:
  - title: "箇条書きの例"
    body:
      text:
        - 最初の項目
        - 2番目の項目
        - 3番目の項目
```

---

## 3. テンプレートの活用

### title（タイトルスライド）

```yaml
- template: title
  title: "プレゼンテーションタイトル"
  subtitle: "サブタイトル"
  author: "発表者名"
  date: "2025"
```

### section（セクション区切り）

```yaml
- template: section
  title: "第1章"
  subtitle: "導入"
```

### quote（引用）

```yaml
- template: quote
  quote: "シンプルさは究極の洗練である"
  author: "レオナルド・ダ・ヴィンチ"
```

### agenda（目次）

```yaml
- template: agenda
  title: "今日の内容"
  items:
    - 導入
    - 本題
    - まとめ
```

### comparison（比較）

```yaml
- template: comparison
  title: "機能比較"
  left:
    title: "プランA"
    items:
      - 機能1
      - 機能2
  right:
    title: "プランB"
    items:
      - 機能3
      - 機能4
```

### timeline（タイムライン）

```yaml
- template: timeline
  title: "開発ロードマップ"
  events:
    - date: "2024 Q1"
      title: "企画フェーズ"
    - date: "2024 Q2"
      title: "開発フェーズ"
```

---

## 4. テーブル

### 基本テーブル

```yaml
- title: "機能一覧"
  body:
    table: |
      | 機能 | 説明 |
      |------|------|
      | テーブル | Markdown形式 |
      | コード | ハイライト |
```

### 列アライメント

```yaml
table: |
  | 左揃え | 中央揃え | 右揃え |
  |:-------|:--------:|-------:|
  | Left   | Center   | Right  |
```

- `:---` 左揃え
- `:---:` 中央揃え
- `---:` 右揃え

### カスタムスタイル

```yaml
tableStyle:
  colWidths: [300, 150]    # 列幅（px）
  rowHeight: 60            # 行高さ（px）
  headerBg: "#3b82f6"      # ヘッダー背景色
  fontSize: 20             # フォントサイズ
```

---

## 5. コードブロック

### 基本構文

```yaml
- title: "Pythonコード"
  body:
    code:
      language: python
      content: |
        def greet(name):
            return f"Hello, {name}!"
```

### 対応言語

javascript, python, java, rust, go, yaml, sql, html, css, bash

### テーマ設定

```yaml
code:
  language: javascript
  content: |
    console.log("Hello");
  style:
    theme: dark  # dark, light, match
```

- `dark` - ダーク背景
- `light` - ライト背景
- `match` - スライドテーマに合わせた配色

---

## 6. 数式

### インライン数式

テキスト内に `$...$` で数式を埋め込み：

```yaml
text:
  - "アインシュタインの式: $E = mc^2$"
```

### ブロック数式

```yaml
math: "E = mc^2"
```

### 複数数式

```yaml
math:
  - "E = mc^2"
  - "F = ma"
mathStyle:
  fontSize: 42
  align: center
```

### LaTeX構文例

| 記法 | 出力 |
|------|------|
| `x^2` | x² |
| `x_i` | xᵢ |
| `\frac{a}{b}` | a/b |
| `\sqrt{x}` | √x |
| `\sum` | Σ |
| `\int` | ∫ |
| `\alpha, \beta, \pi` | α, β, π |

**注意：** ダブルクォート内ではバックスラッシュを2つ（`\\`）使用

---

## 7. フローチャート

### 基本構文

```yaml
flowchart: |
  direction: LR
  A[開始] --> B(処理)
  B --> C{判断}
  C -->|Yes| D[終了]
  C -->|No| B
```

### ノード形状

| 記法 | 形状 |
|------|------|
| `[テキスト]` | 矩形 |
| `(テキスト)` | 角丸矩形 |
| `{テキスト}` | ひし形 |
| `((テキスト))` | 円 |

### 矢印タイプ

| 記法 | 説明 |
|------|------|
| `-->` | 矢印 |
| `-->｜ラベル｜` | ラベル付き |
| `-.->` | 点線 |
| `---` | 線のみ |

### 方向

- `LR` - 左から右
- `RL` - 右から左
- `TB` - 上から下
- `BT` - 下から上

### サイズ変更

```yaml
flowchart:
  content: |
    A[開始] --> B[終了]
  style:
    nodeWidth: 180
    nodeHeight: 80
    fontSize: 22
```

---

## 8. シーケンス図

### 基本構文

```yaml
sequence: |
  Client ->> Server: リクエスト
  Server ->> DB: クエリ
  DB -->> Server: 結果
  Server -->> Client: レスポンス
```

### 矢印タイプ

| 記法 | 説明 |
|------|------|
| `->>` | 非同期メッセージ |
| `-->>` | 応答（点線） |
| `->` | 同期メッセージ |
| `-x` | 失敗 |

### サイズ変更

```yaml
sequence:
  content: |
    A ->> B: メッセージ
  style:
    participantWidth: 150
    messageGap: 80
    fontSize: 20
```

---

## 9. 図形描画

### 基本構文

```yaml
shapes:
  - type: rect
    x: 200
    y: 300
    width: 150
    height: 80
    fill: "#3b82f6"
    label: "ボックス"
```

### 図形タイプ

rect, circle, ellipse, line, arrow, diamond, triangle, polygon, polyline, path, text

### 共通オプション

| オプション | 説明 |
|-----------|------|
| `fill` | 塗りつぶし色 |
| `stroke` | 線の色 |
| `strokeWidth` | 線の太さ |
| `opacity` | 透明度（0-1） |
| `label` | ラベル文字 |

---

## 10. テーマとカスタマイズ

### テーマ設定

```yaml
meta:
  theme: default
```

### 利用可能なテーマ

default, corporate, minimal, dark, nature, sunset, ocean, lavender, rose, midnight

### ヘッダー/フッター

```yaml
meta:
  header:
    show: true
    text: "{project}"
  footer:
    show: true
    left: "{author}"
    right: "{page} / {total}"
```

**プレースホルダ：** `{project}`, `{author}`, `{date}`, `{page}`, `{total}`

---

## 11. エクスポート

### PDF出力

「Export」→「PDF」

### PowerPoint（PPTX）出力

「Export」→「PPTX」

### HTML出力

「Export」→「HTML」

自己完結型のスライドショーHTML

### プロジェクトファイル（.fnote）

「Save」で保存、「Load」で読み込み

---

## Tips

### コード補完

- `Ctrl+Space` で候補を表示
- `📑` 付きスニペットでテンプレートを挿入

### 画像の追加

エディタに画像をドラッグ＆ドロップ

### スライドショー

「Play」ボタンでフルスクリーン表示

---

## トラブルシューティング

### "No slides" と表示される

- YAMLの構文エラーを確認
- インデントが正しいか確認（スペース2つ推奨）

### 数式が表示されない

- バックスラッシュのエスケープを確認

### フローチャートが正しく表示されない

- ノードIDに空白を含めない
- `direction:` は最初の行に
