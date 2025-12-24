# FrameNote v0.3

**PDL（Presentation Description Language）によるテキストファーストのスライド作成ツール**

FrameNoteは、スライドをYAML形式の宣言的ドキュメントとして扱うブラウザベースのプレゼンテーションツールです。ビジュアルデザインではなくコンテンツ構造に集中できます — レイアウトはFrameNoteが自動で処理します。

![FrameNote](https://img.shields.io/badge/version-0.3-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ 特徴

### 🎯 コアコンセプト
- **構造優先** — デザインではなくコンテンツを書く
- **テキストファースト** — コードエディタで完全キーボード操作
- **セットアップ不要** — 単一HTMLファイル、モダンブラウザで即実行

### 📝 PDL（Presentation Description Language）
- YAMLベースの宣言的フォーマット
- 人間が読みやすく、バージョン管理に最適
- コンテンツとプレゼンテーションの分離

### 🎨 テンプレート（8種類）
| テンプレート | 説明 |
|-------------|------|
| `title` | タイトル、サブタイトル、著者、日付を含むオープニングスライド |
| `section` | セクション区切り |
| `quote` | 引用文（著者・出典付き） |
| `qa` | Q&A / 質問スライド |
| `thanks` | エンディング / サンキュースライド |
| `agenda` | アジェンダ / 目次 |
| `comparison` | 左右比較 |
| `timeline` | タイムライン |

### 🎭 テーマ（10種類）
`default` · `corporate` · `minimal` · `dark` · `nature` · `sunset` · `ocean` · `lavender` · `rose` · `midnight`

### 📤 エクスポート形式
- **PDF** — 印刷用ドキュメント
- **PPTX** — Microsoft PowerPoint（ネイティブシェイプ）
- **HTML** — スタンドアロンスライドショー

### ⚡ エディタ機能
- Monaco Editor（VS Codeエンジン）
- PDLシンタックスハイライト
- コンテキスト認識コード補完（Ctrl+Space）
- リアルタイムプレビュー
- YAMLバリデーション＆エラーマーカー

## 🚀 クイックスタート

1. `framenote-v0.3.html` をダウンロード
2. モダンブラウザで開く（Chrome, Firefox, Edge, Safari）
3. 書き始める！

```yaml
meta:
  project: "初めてのプレゼンテーション"
  author: "あなたの名前"
  theme: default

slides:
  - template: title
    title: "Hello FrameNote"
    subtitle: "初めてのプレゼンテーション"
    author: "あなたの名前"
    date: "2025"

  - title: "はじめに"
    body:
      text:
        - "FrameNoteでプレゼンが簡単に"
        - "YAMLを書くだけで美しいスライド"
        - "PDF、PPTX、HTMLにエクスポート"
```

## 📖 ドキュメント

- [チュートリアル（日本語）](TUTORIAL-JP.md)
- [Tutorial (English)](TUTORIAL.md)
- [README English](README.md)

## 🎮 キーボードショートカット

| ショートカット | アクション |
|---------------|-----------|
| `Ctrl+Space` | コード補完を開く |
| `Tab` | 補完を確定 / スニペット展開 |
| `Ctrl+S` | プロジェクト保存（.fnote） |
| `F11` または「Present」クリック | スライドショー開始 |
| `Esc` | スライドショー終了 |
| `←` / `→` | スライド移動 |

## 📁 ファイル形式

### .fnote（プロジェクトファイル）
以下を含むZIPアーカイブ：
```
project.fnote
├── manifest.json          # プロジェクトメタデータ
├── presentation.pdl.yaml  # PDLコンテンツ
└── images/                # アップロード画像
    └── *.png, *.jpg
```

### .pdl.yaml（PDLファイル）
PDL構造のプレーンYAMLファイル。

## 🔧 PDL構造

```yaml
meta:
  project: "プロジェクト名"
  author: "著者"
  date: "2025-01-01"
  version: "1.0"
  theme: default
  header:
    show: true
    text: "{project}"
  footer:
    show: true
    left: "{author}"
    right: "{page} / {total}"

slides:
  - title: "スライドタイトル"
    body:
      text:
        - "箇条書き1"
        - "箇条書き2"
```

## 🎨 カスタマイズ

### グローバルフォーマット（meta内）
```yaml
meta:
  format:
    accent:
      color: "#6366f1"
    title:
      color: "#1e1b4b"
      size: 48
    text:
      color: "#334155"
      size: 28
    bullet:
      color: "#6366f1"
```

### スライド単位のフォーマット上書き
```yaml
slides:
  - title: "重要なスライド"
    format:
      background:
        color: "#dc2626"
      title:
        color: "#ffffff"
    body:
      text:
        - "このスライドはカスタムカラーです"
```

## 🖼️ 画像

1. 画像をImagesタブにドラッグ&ドロップ
2. PDLで参照：

```yaml
- title: "画像付きスライド"
  body:
    style: figure_caption
    figure: my-image.png
    caption: "画像のキャプション"
```

## 📊 ダイアグラム

```yaml
- title: "プロセスフロー"
  body:
    diagram:
      type: box-arrow
      direction: horizontal
      boxes:
        - "ステップ1"
        - "ステップ2"
        - "ステップ3"
```

## 🔄 プレースホルダー

header/footerで使用可能：
- `{project}` — プロジェクト名
- `{author}` — 著者名
- `{date}` — 日付
- `{page}` — 現在のページ番号
- `{total}` — 総ページ数

## 📋 動作要件

- JavaScriptが有効なモダンブラウザ
- サーバー不要
- インストール不要

## 📄 ライセンス

MIT License

## 🤝 コントリビュート

Issue、Pull Requestを歓迎します！

---

クリックよりテキストを好むプレゼンテーション作成者のために ❤️ を込めて作りました。
