# FrameNote v0.2.1

**FrameNote** は軽量なテキストファーストのスライド作成ツールです。  
PDL（Presentation Description Language）で構造化されたノートを書くと、即座にプレゼンテーションスライドになります。

WYSIWYGもドラッグ＆ドロップも不要 — 構造と意図だけで作成。

---

## ✨ v0.2.1 の新機能

- **ヘッダー＆フッター** - プロジェクト名、作成者、日付、ページ番号を表示
- **FormatObject** - フォント、サイズ、色をカスタマイズ
- **スライド個別Format** - グローバル設定を個別スライドで上書き
- **プレースホルダー** - `{project}`, `{author}`, `{date}`, `{page}`, `{total}`

---

## 🚀 はじめに

### 要件

- モダンブラウザ（Chrome、Edge、Firefox、Safari）
- ビルドツール不要
- インストール不要

### 実行

`framenote-v0.2.html` をブラウザで開くだけ。

---

## 📖 機能

### PDL（Presentation Description Language）

YAML形式でスライドを記述：

```yaml
meta:
  project: マイプレゼンテーション
  author: 作成者名
  date: "2025-01-01"

slides:
  - title: 最初のスライド
    body:
      text:
        - ポイント1
        - ポイント2
```

### ボディスタイル

| スタイル | 説明 | 用途 |
|----------|------|------|
| `text` | テキストのみ（デフォルト） | シンプルなコンテンツ |
| `figure_caption` | 図＋キャプション＋テキスト | 説明付き画像 |
| `figure_bullets` | 図＋箇条書き | リスト付き画像 |
| `split` | 左右または上下分割 | 比較、2カラム |

### ヘッダー＆フッター

```yaml
meta:
  header:
    show: true
    logo: "logo.png"        # オプション
    text: "{project}"
  
  footer:
    show: true
    left: "{author}"
    center: "{date}"
    right: "{page} / {total}"
```

#### プレースホルダー

| プレースホルダー | 説明 |
|-----------------|------|
| `{project}` | metaのプロジェクト名 |
| `{author}` | metaの作成者 |
| `{date}` | metaの日付 |
| `{version}` | metaのバージョン |
| `{page}` | 現在のページ番号 |
| `{total}` | 総ページ数 |

### 書式カスタマイズ

#### グローバルFormat（全スライド）

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

#### スライド個別Format（上書き）

```yaml
slides:
  - title: 重要なスライド
    format:
      title:
        color: "#dc2626"
        size: 56
      bullet:
        color: "#dc2626"
    body:
      text:
        - このスライドは赤いスタイル
```

#### Format優先順位

```
デフォルト < meta.format（グローバル） < slide.format（個別）
```

### ダイアグラム

```yaml
body:
  text:
    - プロセス概要
  diagram:
    boxes:
      - ステップ1
      - ステップ2
      - ステップ3
```

### 分割レイアウト

```yaml
body:
  style: split
  split:
    direction: horizontal   # または vertical
    ratio: 0.5              # 0.1 - 0.9
    a:
      text:
        - 左側コンテンツ
    b:
      figure: image.png
```

### 発表者ノート

```yaml
slides:
  - title: スライドタイトル
    body:
      text:
        - コンテンツ
    notes: "発表者用メモ（プレビューに表示、プレゼンでは非表示）"
```

---

## 🖼️ 画像管理

1. **Images** タブをクリック
2. 画像をドラッグ＆ドロップ、またはクリックしてアップロード
3. サムネイルをクリックしてファイル名をコピー
4. PDLでファイル名を使用：`figure: image.png`

---

## 💾 プロジェクトファイル（.fnote）

PDLと画像を含む完全なプロジェクトを保存・読み込み。

### 保存
- **Save** ボタンをクリック
- `{プロジェクト名}.fnote`（ZIP形式）がダウンロードされる

### 開く
- **Open** ボタンをクリック
- `.fnote` ファイルを選択
- PDLと画像が復元される

### ファイル構造

```
project.fnote (ZIP)
├── manifest.json
├── presentation.pdl.yaml
└── images/
    ├── image1.png
    └── image2.jpg
```

---

## ⌨️ エディタ機能

**Monaco Editor**（VS Codeのコア）を搭載：

- PDLのシンタックスハイライト
- リアルタイム検証
- コード補完
- スニペット（Tabで展開）

### スニペット

| トリガー | 説明 |
|---------|------|
| `slide` | 基本スライド |
| `slide-figure` | 図付きスライド |
| `slide-split` | 分割レイアウトスライド |
| `slide-format` | カスタムformat付きスライド |
| `diagram` | ボックス矢印ダイアグラム |
| `header-footer` | ヘッダー/フッター設定 |
| `format` | 基本format設定 |
| `format-full` | 全format設定 |

---

## ✅ 検証

リアルタイムPDL検証とエラーコード：

| コード | 種別 | 説明 |
|--------|------|------|
| `PDL-E*` | エラー | 構造的な問題 |
| `PDL-W*` | 警告 | スタイルの推奨事項 |

---

## 🎬 プレゼンテーションモード

1. **Present** ボタンをクリック
2. 矢印キーまたはボタンで移動
3. `Escape` キーで終了

---

## 📁 プロジェクト構造

```
/
├── framenote-v0.2.html   # アプリケーション（単一ファイル）
├── README.md             # 英語版ドキュメント
├── README-JP.md          # 日本語版ドキュメント
├── ROADMAP.md            # 開発ロードマップ
└── sample-all-patterns.pdl.yaml  # 全PDLパターン
```

---

## 🗺️ ロードマップ

| バージョン | 機能 |
|------------|------|
| v0.2.1 | ヘッダー/フッター、FormatObject、スライド個別format |
| v0.3 | PDF出力、PPTX出力、テーマ |
| v0.4 | 高度なダイアグラム（縦方向、分岐） |
| v0.5 | クラウドストレージ、共有 |
| v1.0 | 安定版、CLI、プラグイン |

---

## 📜 ライセンス

MIT License

---

## 🔗 リンク

- [GitHubリポジトリ](https://github.com/fukuyori/framenote)
- [PDL仕様書](./pdl.md)

---

**バージョン:** 0.2.1  
**状態:** 機能的、実験的  
**フォーカス:** PDL言語設計とオーサリング体験
