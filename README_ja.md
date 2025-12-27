# FrameNote v0.4

**テキストファーストのスライド作成ツール**

FrameNoteは、YAML形式のPDL（Presentation Description Language）を使用した宣言的なスライドプレゼンテーションツールです。ビジュアルデザインではなく、コンテンツ構造に集中できます。

## 特徴

### コア機能
- **PDL（YAMLベース）** - 宣言的なプレゼンテーション作成
- **単一HTMLファイル** - インストール不要、モダンブラウザで動作
- **Monaco Editor** - シンタックスハイライト、コード補完、スニペット
- **リアルタイムプレビュー** - 即座に視覚的フィードバック
- **10種類のテーマ** - default, corporate, minimal, dark, nature, sunset, ocean, lavender, rose, midnight
- **7種類のフォントプリセット** - sans, serif, rounded, business, modern, elegant, handwritten（Google Fonts）

### テンプレート（21種類）
- `agenda` - 目次・アジェンダ
- `bigtext` - 大きなインパクトテキスト
- `blank` - 空白スライド（カスタムコンテンツ用）
- `cards` - カードグリッドレイアウト
- `code` - コードブロックスライド
- `comparison` - 比較（2列）
- `flowchart` - フローチャートスライド
- `image` - フルスクリーン画像（キャプション付き）
- `mindmap` - マインドマップ図
- `qa` - Q&Aスライド
- `quote` - 引用（著者付き）
- `section` - セクション区切り
- `steps` - ステップ/プロセスフロー（1→2→3）
- `table` - テーブルスライド
- `thanks` - 終了スライド
- `threecolumn` - 3カラムレイアウト
- `timeline` - タイムライン
- `title` - タイトルスライド（サブタイトル、著者、日付）
- `twocolumn` - 2カラムレイアウト
- `video` - 動画埋め込みスライド

### コンテンツ要素
- **テキスト** - 段落、箇条書き、インライン数式（`$E=mc^2$`）
- **テーブル** - Markdown形式、列アライメント対応
- **コードブロック** - 10以上の言語のシンタックスハイライト
- **数式** - KaTeX LaTeXレンダリング（インライン＆ブロック）
- **図形** - SVGプリミティブ（矩形、円、矢印、ひし形など）
- **フローチャート** - Mermaid風ダイアグラム
- **シーケンス図** - UMLシーケンス図
- **画像** - ドラッグ＆ドロップアップロード

### エクスポート
- **PDF** - 印刷用ドキュメント
- **PPTX** - PowerPoint形式
- **HTML** - 自己完結型プレゼンテーション
- **.fnote** - プロジェクトファイル（保存/読み込み）

## クイックスタート

1. `framenote.html` をダウンロード
2. モダンブラウザで開く（Chrome, Firefox, Edge, Safari）
3. エディタでPDLを書き始める

## PDL構文

### 基本構造

```yaml
meta:
  project: プレゼンテーション
  author: 作者名
  theme: default

slides:
  - template: title
    title: "ようこそ"
    subtitle: "FrameNoteの紹介"

  - title: "目次"
    body:
      text:
        - 第1章
        - 第2章
        - 第3章
```

### テーブル

```yaml
- title: 機能比較
  body:
    table: |
      | 機能 | 状態 |
      |:-----|:----:|
      | テーブル | ✅ |
      | コード | ✅ |
      | 数式 | ✅ |
    tableStyle:
      colWidths: [300, 100]
      rowHeight: 50
```

**アライメント記法：**
- `|:---|` - 左揃え
- `|:--:|` - 中央揃え
- `|---:|` - 右揃え

### コードブロック

```yaml
- title: コード例
  body:
    code:
      language: python
      content: |
        def hello():
            print("Hello, World!")
      style:
        theme: dark  # dark, light, match
```

**対応言語：** javascript, python, java, rust, go, yaml, sql, html, css, bash

**テーマ：**
- `dark` - ダーク背景
- `light` - ライト背景
- `match` - スライドテーマに合わせた配色

### 数式

```yaml
# インライン数式（テキスト内）
- title: 物理学
  body:
    text:
      - "アインシュタインの式: $E = mc^2$"

# ブロック数式
- title: 二次方程式の解
  body:
    math:
      - "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"
    mathStyle:
      fontSize: 48
      align: center
```

**注意：** YAMLのダブルクォート内ではバックスラッシュを2つ（`\\`）使用

### フローチャート

```yaml
- title: プロセスフロー
  body:
    flowchart: |
      direction: LR
      A[開始] --> B(処理)
      B --> C{判断}
      C -->|Yes| D[終了]
      C -->|No| B
```

**ノード形状：**
- `[テキスト]` - 矩形
- `(テキスト)` - 角丸矩形
- `{テキスト}` - ひし形
- `((テキスト))` - 円

**矢印：**
- `-->` - 矢印
- `-->|ラベル|` - ラベル付き矢印
- `-.->` - 点線矢印
- `---` - 線（矢印なし）

**方向：** `LR`（左→右）, `RL`（右→左）, `TB`（上→下）, `BT`（下→上）

**サイズ変更：**
```yaml
flowchart:
  content: |
    A[開始] --> B[終了]
  style:
    nodeWidth: 180
    nodeHeight: 80
    fontSize: 20
    gapX: 100
    gapY: 100
```

### シーケンス図

```yaml
- title: API通信
  body:
    sequence: |
      Client ->> Server: リクエスト
      Server ->> DB: クエリ
      DB -->> Server: 結果
      Server -->> Client: レスポンス
```

**矢印タイプ：**
- `->>` - 非同期メッセージ
- `-->>` - 応答（点線）
- `->` - 同期メッセージ
- `-x` - 失敗/中断

**サイズ変更：**
```yaml
sequence:
  content: |
    A ->> B: メッセージ
  style:
    participantWidth: 150
    participantHeight: 60
    messageGap: 80
    fontSize: 20
```

### 動画埋め込み

```yaml
- title: デモ動画
  body:
    video:
      url: "https://www.youtube.com/watch?v=VIDEO_ID"
      width: "80%"    # スライド幅の80%
      height: "50%"   # スライド高さの50%
```

**対応プラットフォーム：**
- YouTube（サムネイル表示 + クリックで開く）
- Vimeo（サムネイル表示 + クリックで開く）
- ローカル動画ファイル（MP4, WebM）- インライン再生

**オプション：**
- `url` - 動画URLまたはローカルファイルパス
- `width` / `height` - 動画サイズ（pxまたは%、デフォルト: 960x540）
- `x` / `y` - 位置（pxまたは%、デフォルト: 中央）
- `autoplay` - 自動再生（ローカル動画のみ）
- `controls` - コントロール表示（ローカル動画のみ）

**注意:** YouTube/Vimeo動画はクリック可能なサムネイルとして表示され、新しいタブで開きます。ローカルMP4/WebMファイルはインラインで再生されます。

### %指定（パーセント指定）

サイズと位置には `px`（数値）と `%`（文字列）の両方が使用可能です：

```yaml
# 動画 - スライドに対する相対値
video:
  width: "80%"
  height: "50%"

# 画像 - スライドに対する相対値
figureStyle:
  width: "40%"
  height: "35%"
  x: "55%"
  y: "20%"

# 図形 - スライドに対する相対値
shapes:
  - type: rect
    x: "10%"
    y: "20%"
    width: "30%"
    height: "40%"

# テーブル列幅 - テーブル領域に対する相対値
tableStyle:
  colWidths: ["30%", "40%", "30%"]
```

### マインドマップ

```yaml
- template: mindmap
  title: プロジェクト概要
  mindmap:
    center: "メインテーマ"
    layout: radial  # radial, tree, tree-down
    branches:
      - topic: "ブランチ1"
        items:
          - "アイテム1"
          - "アイテム2"
      - topic: "ブランチ2"
        items:
          - "アイテムA"
          - "アイテムB"
      - topic: "ブランチ3"
        items:
          - "サブアイテム"
```

**レイアウトオプション：**
- `radial` - 放射状レイアウト（デフォルト）
- `tree` - 左から右への樹形図
- `tree-down` - 上から下への樹形図

### 図形描画

```yaml
- title: ダイアグラム
  body:
    shapes:
      - type: rect
        x: 200
        y: 300
        width: 150
        height: 80
        fill: "#3b82f6"
        label: "ボックス"
      - type: arrow
        x: 370
        y: 340
        x2: 500
        y2: 340
```

**図形タイプ：** rect, circle, ellipse, line, arrow, diamond, triangle, polygon, polyline, path, text

## テーマ一覧

| テーマ | 背景 | アクセント |
|--------|------|------------|
| default | 白 | インディゴ |
| corporate | 白 | 青 |
| minimal | グレー | スレート |
| dark | ダーク | シアン |
| nature | 緑系 | 緑 |
| sunset | オレンジ系 | オレンジ |
| ocean | 青系 | スカイ |
| lavender | 紫系 | パープル |
| rose | ピンク系 | ローズ |
| midnight | ネイビー | バイオレット |

## フォント

### フォントプリセット

| プリセット | 見出し | 本文 | 説明 |
|-----------|--------|------|------|
| sans | Noto Sans JP | Noto Sans JP | 標準ゴシック |
| serif | Noto Serif JP | Noto Serif JP | 明朝体 |
| rounded | M PLUS Rounded 1c | M PLUS 1p | 丸ゴシック |
| business | BIZ UDGothic | BIZ UDGothic | ビジネス文書向け |
| modern | Montserrat | Noto Sans JP | モダンスタイル |
| elegant | Playfair Display | Shippori Mincho | エレガント |
| handwritten | Klee One | Klee One | 手書き風 |

### 使い方

```yaml
# プリセット（簡易）
meta:
  font: modern

# カスタムフォント
meta:
  font:
    heading: "Montserrat"
    body: "Noto Sans JP"
    code: "Fira Code"
```

## キーボードショートカット

### エディタ
| キー | アクション |
|------|------------|
| `←` `→` | スライド移動 |
| `Ctrl+S` | プロジェクト保存 |

### スライドショー
| キー | アクション |
|------|------------|
| `←` `→` | スライド移動 |
| `Space` | 次のスライド |
| `F` | フルスクリーン切替 |
| `L` | レーザーポインター切替 |
| `Esc` | スライドショー終了 |
| 左1/3クリック | 前のスライド |
| 右2/3クリック | 次のスライド |

## コード補完

エディタで入力：
- `Ctrl+Space` - 候補を表示
- テンプレートスニペット: `📑 title`, `📑 section`, `📊 flowchart` など
- キーワードは `:` で自動補完

## 対応ブラウザ

- Chrome 90+
- Firefox 90+
- Edge 90+
- Safari 15+

## 依存ライブラリ（CDN経由）

- Monaco Editor - コード編集
- js-yaml - YAMLパース
- jsPDF - PDF出力
- PptxGenJS - PowerPoint出力
- JSZip - プロジェクトファイル
- KaTeX - 数式レンダリング

## ライセンス

MIT License

## 更新履歴

### v0.5（現在）
- フォント選択ドロップダウンの不具合を修正
- フォント選択のUI/PDL同期を改善
- フルスクリーンプレゼンテーションモードを追加
- スライドショー時のクリックナビゲーション（左1/3=前、右2/3=次）
- Fキーでフルスクリーン切替
- レーザーポインター機能（Lキーまたはボタン）
- アウトラインでスライドをドラッグ＆ドロップで並べ替え
- 動画埋め込み（YouTube、Vimeo、ローカルファイル）
- 動画、画像、図形、テーブル列幅の%指定対応
- 13種類の新テンプレート: image, steps, cards, twocolumn, threecolumn, blank, bigtext, mindmap, video, table, code, flowchart

### v0.4
- テーブル列アライメント（左/中央/右）
- 自動列幅計算
- tableStyle（colWidths, rowHeight）
- コードブロックとシンタックスハイライト
- コードテーマ（dark/light/match）
- 数式（KaTeX）- インライン＆ブロック
- 複数数式サポート
- SVG図形描画
- Mermaid風フローチャート
- シーケンス図
- フローチャート/シーケンス図サイズ変更
- フォント選択（7プリセット＋カスタムGoogle Fonts）

### v0.3
- 8種類のスライドテンプレート
- 10種類のプリセットテーマ
- PDF/PPTX/HTMLエクスポート
- Monaco Editor統合
- 画像管理
- ヘッダー/フッターシステム

### v0.2
- 基本PDL仕様
- テーマシステム
- スライドナビゲーション

### v0.1
- 初回リリース
- YAMLベースのスライド
