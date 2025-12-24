# FrameNote チュートリアル

FrameNoteでプレゼンテーションを作成するための初心者向けステップバイステップガイドです。

## 目次

1. [はじめに](#1-はじめに)
2. [最初のプレゼンテーション](#2-最初のプレゼンテーション)
3. [PDL構造を理解する](#3-pdl構造を理解する)
4. [テンプレートを使う](#4-テンプレートを使う)
5. [テーマを適用する](#5-テーマを適用する)
6. [画像を追加する](#6-画像を追加する)
7. [ダイアグラムを作成する](#7-ダイアグラムを作成する)
8. [Formatでカスタマイズ](#8-formatでカスタマイズ)
9. [ヘッダーとフッター](#9-ヘッダーとフッター)
10. [プレゼンテーションをエクスポート](#10-プレゼンテーションをエクスポート)
11. [便利なテクニック](#11-便利なテクニック)

---

## 1. はじめに

### FrameNoteを開く

1. `framenote-v0.3.html` をダウンロード
2. ダブルクリックでブラウザで開く
3. 左にエディタ、右にプレビューが表示されます

### インターフェース概要

```
┌─────────────────────────────────────────────────────────┐
│  🅵 FrameNote v0.3   [Theme ▼] [Open][Save][PDF][PPTX]  │
├─────────┬───────────────────────┬───────────────────────┤
│ Outline │  PDL Editor           │  Preview              │
│ (概要)  │  (エディタ)           │  (プレビュー)         │
│         │                       │                       │
│ □ Slide1│  meta:                │  ┌─────────────────┐  │
│ □ Slide2│    project: "..."     │  │                 │  │
│ □ Slide3│  slides:              │  │   スライド表示   │  │
│         │    - title: "..."     │  │                 │  │
│         │                       │  └─────────────────┘  │
├─────────┴───────────────────────┼───────────────────────┤
│  [Editor] [Images] [Validation] │     ◀  1/3  ▶        │
└─────────────────────────────────┴───────────────────────┘
```

---

## 2. 最初のプレゼンテーション

3枚のシンプルなプレゼンテーションを作成してみましょう。

### ステップ1: エディタをクリア

サンプルの内容を削除して、新しく始めます。

### ステップ2: metaセクションを書く

```yaml
meta:
  project: "初めてのプレゼンテーション"
  author: "あなたの名前"
  date: "2025"
  theme: default
```

### ステップ3: slidesセクションを追加

```yaml
slides:
```

### ステップ4: タイトルスライドを追加

```yaml
slides:
  - template: title
    title: "FrameNoteへようこそ"
    subtitle: "テキストでプレゼンを作る"
    author: "あなたの名前"
    date: "2025"
```

### ステップ5: コンテンツスライドを追加

```yaml
  - title: "FrameNoteとは？"
    body:
      text:
        - "テキストファーストのプレゼンツール"
        - "YAMLを書くだけで美しいスライド"
        - "クリック不要、ドラッグ不要"
```

### ステップ6: 終了スライドを追加

```yaml
  - template: thanks
    title: "ありがとうございました！"
    message: "ご質問は？"
    contact: "your.email@example.com"
```

### 完成例

```yaml
meta:
  project: "初めてのプレゼンテーション"
  author: "あなたの名前"
  date: "2025"
  theme: default

slides:
  - template: title
    title: "FrameNoteへようこそ"
    subtitle: "テキストでプレゼンを作る"
    author: "あなたの名前"
    date: "2025"

  - title: "FrameNoteとは？"
    body:
      text:
        - "テキストファーストのプレゼンツール"
        - "YAMLを書くだけで美しいスライド"
        - "クリック不要、ドラッグ不要"

  - template: thanks
    title: "ありがとうございました！"
    message: "ご質問は？"
    contact: "your.email@example.com"
```

---

## 3. PDL構造を理解する

### 基本構造

すべてのPDLファイルには2つのメインセクションがあります：

```yaml
meta:      # プレゼンテーション設定
  ...

slides:    # スライドの配列
  - ...    # 1枚目のスライド
  - ...    # 2枚目のスライド
```

### インデントのルール

PDLはYAMLフォーマットを使用します。インデントが重要です！

```yaml
# 正しい ✓
meta:
  project: "名前"    # 2スペースのインデント

# 間違い ✗
meta:
project: "名前"      # インデントがない
```

### スライドの種類

**標準スライド：**
```yaml
- title: "スライドタイトル"
  body:
    text:
      - "ポイント1"
      - "ポイント2"
```

**テンプレートスライド：**
```yaml
- template: quote
  quote: "テキスト"
  author: "著者"
```

---

## 4. テンプレートを使う

### タイトルテンプレート

オープニングスライドに最適。

```yaml
- template: title
  title: "メインタイトル"
  subtitle: "サブタイトル"
  author: "著者名"
  date: "2025"
```

### セクションテンプレート

プレゼンをパートに分ける時に使用。

```yaml
- template: section
  title: "パート1"
  subtitle: "イントロダクション"
```

### 引用テンプレート

印象的な引用を表示。

```yaml
- template: quote
  quote: "シンプルであることは、複雑であることよりも難しい。"
  author: "スティーブ・ジョブズ"
  source: "Businessweek, 1998"
```

### アジェンダテンプレート

プレゼンの概要を表示。

```yaml
- template: agenda
  title: "本日のアジェンダ"
  items:
    - "イントロダクション"
    - "メイントピック"
    - "デモ"
    - "Q&A"
```

### 比較テンプレート

2つのものを左右で比較。

```yaml
- template: comparison
  title: "従来 vs 新方式"
  left:
    label: "Before"
    items:
      - "手動プロセス"
      - "時間がかかる"
      - "エラーが起きやすい"
  right:
    label: "After"
    items:
      - "自動化"
      - "高速"
      - "信頼性が高い"
```

### タイムラインテンプレート

時系列のイベントを表示。

```yaml
- template: timeline
  title: "プロジェクトタイムライン"
  events:
    - date: "Q1"
      title: "企画"
    - date: "Q2"
      title: "開発"
    - date: "Q3"
      title: "テスト"
    - date: "Q4"
      title: "リリース"
```

### Q&Aテンプレート

質問で終わる。

```yaml
- template: qa
  title: "ご質問は？"
  contact: "email@example.com"
```

### サンキューテンプレート

プレゼンを締めくくる。

```yaml
- template: thanks
  title: "ありがとうございました！"
  message: "詳細情報は"
  contact: "https://example.com"
```

---

## 5. テーマを適用する

### UIセレクターを使う

ヘッダーのThemeドロップダウンをクリックしてテーマを選択。

### meta.themeを使う

```yaml
meta:
  theme: dark    # 選択肢: default, corporate, minimal, dark,
                 #        nature, sunset, ocean, lavender,
                 #        rose, midnight
```

### テーマ一覧

| テーマ | 最適な用途 |
|--------|-----------|
| `default` | 汎用 |
| `corporate` | ビジネスプレゼン |
| `minimal` | クリーン、テキスト重視 |
| `dark` | テック系、デモ |
| `nature` | 環境系トピック |
| `sunset` | 暖かい、フレンドリー |
| `ocean` | プロフェッショナル、落ち着いた |
| `lavender` | クリエイティブ、モダン |
| `rose` | マーケティング、ライフスタイル |
| `midnight` | プレミアム、ドラマチック |

---

## 6. 画像を追加する

### ステップ1: 画像をアップロード

1. エディタ下の「Images」タブをクリック
2. 画像ファイルをドラッグ&ドロップ、またはクリックして選択
3. 画像はプロジェクトに保存されます

### ステップ2: PDLで参照

**キャプション付き画像：**
```yaml
- title: "製品紹介"
  body:
    style: figure_caption
    figure: product-photo.png
    caption: "新デザイン"
```

**分割レイアウトでの画像：**
```yaml
- title: "機能紹介"
  body:
    style: split
    direction: horizontal
    ratio: "1:1"
    left:
      figure: screenshot.png
    right:
      text:
        - "機能1"
        - "機能2"
```

---

## 7. ダイアグラムを作成する

### ボックス矢印ダイアグラム

```yaml
- title: "プロセスフロー"
  body:
    diagram:
      type: box-arrow
      direction: horizontal
      boxes:
        - "入力"
        - "処理"
        - "出力"
```

### 縦方向ダイアグラム

```yaml
- title: "階層構造"
  body:
    diagram:
      type: box-arrow
      direction: vertical
      boxes:
        - "CEO"
        - "マネージャー"
        - "チーム"
```

---

## 8. Formatでカスタマイズ

### グローバルFormat

すべてのスライドに適用：

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

### スライド単位の上書き

特定のスライドだけ変更：

```yaml
- title: "警告！"
  format:
    background:
      color: "#fef2f2"
    title:
      color: "#dc2626"
  body:
    text:
      - "これは重要です"
```

### Formatの優先順位

1. スライドのformat（最優先）
2. メタのformat
3. テーマの色
4. デフォルト値（最低優先）

---

## 9. ヘッダーとフッター

### 基本設定

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

### 利用可能なプレースホルダー

| プレースホルダー | 出力 |
|----------------|------|
| `{project}` | metaのプロジェクト名 |
| `{author}` | metaの著者名 |
| `{date}` | metaの日付 |
| `{page}` | 現在のスライド番号 |
| `{total}` | 総スライド数 |

### ヘッダー/フッターのスタイリング

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

## 10. プレゼンテーションをエクスポート

### PDFエクスポート

1. 「PDF」ボタンをクリック
2. 生成を待つ
3. ファイルが自動でダウンロード

最適な用途: 印刷、メール添付

### PPTXエクスポート

1. 「PPTX」ボタンをクリック
2. 生成を待つ
3. ファイルが自動でダウンロード

最適な用途: PowerPointで編集、同僚との共有

### HTMLエクスポート

1. 「HTML」ボタンをクリック
2. 生成を待つ
3. ファイルが自動でダウンロード

最適な用途: Web公開、オフライン閲覧

### プロジェクトを保存

1. 「Save」ボタンをクリック
2. `.fnote` ファイルとしてダウンロード
3. すべてのコンテンツと画像を含む

---

## 11. 便利なテクニック

### コード補完を使う

`Ctrl+Space` で候補を表示：

- `- ` の後でスライドスニペット
- metaセクション内で設定
- どこでもキーワード

### クイックスライド移動

- Outlineパネルのスライドをクリック
- プレビュー下の `◀` `▶` ボタンを使用

### プレゼンテーションモード

- 「Present」をクリックまたは`F11`
- 矢印キーで移動
- `Esc`で終了

### YAMLのコツ

**複数行テキスト：**
```yaml
- title: "長いタイトル"
  body:
    text:
      - "これは非常に長い箇条書きで
         次の行に続きます"
```

**特殊文字：**
```yaml
- title: "引用符を使う"
  body:
    text:
      - "コロンや特殊文字にはダブルクォート"
      - 'シングルクォートでも可'
```

### よくある間違い

❌ **インデントが間違い：**
```yaml
meta:
project: "名前"  # インデントが必要！
```

✓ **正しい：**
```yaml
meta:
  project: "名前"
```

❌ **スライドにダッシュがない：**
```yaml
slides:
  title: "スライド"  # ダッシュがない！
```

✓ **正しい：**
```yaml
slides:
  - title: "スライド"
```

❌ **引用符が間違い：**
```yaml
title: プロジェクト "名前"  # 外側に引用符が必要！
```

✓ **正しい：**
```yaml
title: "プロジェクト \"名前\""
# または
title: 'プロジェクト "名前"'
```

---

## 次のステップ

- いろいろなテンプレートを試す
- テーマを実験する
- formatで独自の配色を作る
- プレゼンを共有しよう！

Happy presenting! 🎉
