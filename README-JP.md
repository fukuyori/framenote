# FrameNote v0.2

**FrameNote** は軽量なテキストファーストのスライド作成ツールです。  
PDL（Presentation Description Language）で構造化されたノートを書くと、即座にプレゼンテーションスライドになります。

WYSIWYGもドラッグ＆ドロップも不要 — 構造と意図だけで作成。

---

## ✨ 機能

### コアコンセプト

- **PDL**（YAML形式の宣言的言語）でスライドを記述
- SVGレンダリングによるリアルタイムプレビュー
- 16:9 固定アスペクト比
- 装飾ではなく明瞭さを重視した設計

---

### PDL（Presentation Description Language）

FrameNoteはPDL v0.2を使用します。構造化されたプレゼンテーションのための宣言的言語です。

#### 基本構造

```yaml
meta:
  project: マイプレゼンテーション
  author: 作成者名

slides:
  - title: スライドタイトル
    body:
      text:
        - 箇条書き1
        - 箇条書き2
```

#### ボディスタイル

| スタイル | 説明 |
|---------|------|
| `text` | テキストのみ（デフォルト） |
| `figure_caption` | 図＋キャプション＋テキスト |
| `figure_bullets` | 図＋箇条書き |
| `split` | 左右または上下の分割レイアウト |

#### 図の例

```yaml
- title: 機能紹介
  body:
    style: figure_caption
    figure: screenshot.png
    caption: アプリケーションのスクリーンショット
    text:
      - Imagesタブから画像をアップロード
      - ファイル名で参照
```

#### 分割レイアウト

```yaml
- title: 比較
  body:
    style: split
    split:
      direction: horizontal  # または vertical
      ratio: 0.5
      a:
        text:
          - 左側のコンテンツ
      b:
        text:
          - 右側のコンテンツ
```

#### ダイアグラム（ボックス矢印）

```yaml
- title: プロセスフロー
  body:
    text:
      - シンプルなフロー図
    diagram:
      boxes:
        - ステップ1
        - ステップ2
        - ステップ3
```

#### 発表者ノート

```yaml
- title: 重要なスライド
  body:
    text:
      - キーポイント
  notes: このポイントを強調することを忘れずに
```

---

### エディタ機能

**Monaco Editor**（VS Codeのコア）を搭載：

- PDLのシンタックスハイライト
- インラインエラーマーカー付きリアルタイム検証
- コード補完とスニペット
- クリックでジャンプできるスライドアウトライン

#### スニペット

入力して`Tab`キーで展開：

| トリガー | 説明 |
|---------|------|
| `slide` | 基本スライドテンプレート |
| `slide-figure` | 図付きスライド |
| `slide-split` | 分割レイアウトスライド |
| `diagram` | ボックス矢印ダイアグラム |

---

### 画像管理

1. **Images**タブをクリック
2. 画像をドラッグ＆ドロップ、またはクリックしてアップロード
3. サムネイルをクリックしてファイル名をコピー
4. PDLでファイル名を使用：`figure: image.png`

---

### 検証

FrameNoteはPDLをリアルタイムで検証します：

| コード | 種別 | 説明 |
|--------|------|------|
| `PDL-E*` | エラー | 構造的な問題（必須フィールドの欠落） |
| `PDL-W*` | 警告 | スタイルの問題（箇条書きが多すぎる、空のタイトル） |

エラーの表示場所：
- エディタ内にインライン表示（赤い下線）
- 診断パネル
- スライドアウトライン（赤い枠線）

---

### プレゼンテーションモード

1. **Present**ボタンをクリック
2. 矢印キーまたはボタンで移動
3. `Escape`キーで終了

---

## 🧠 設計思想

- **テキストが真実の源** — 隠れた書式なし
- **装飾より構造** — コンテンツに集中
- **エラーは導くもの、妨げるものではない** — プレビューは使用可能なまま
- **エディタが言語を教える** — 補完とヒント

FrameNoteはPowerPointの代替ではありません。  
構造化されたプレゼンテーションのための**思考ツール**です。

---

## 🚀 はじめに

### 要件

- モダンブラウザ（Chrome、Edge、Firefox、Safari）
- ビルドツール不要
- インストール不要

### 実行

`framenote-v0.2.html`をブラウザで開くだけ。

---

## 📁 プロジェクト構造

```
/
├── framenote-v0.2.html   # 単一ファイルアプリケーション
├── README.md             # 英語版ドキュメント
└── README-JP.md          # 日本語版ドキュメント
```

---

## 📋 PDL仕様

FrameNote v0.2はPDL v0.2仕様を実装しています：

### ドキュメント構造

```yaml
meta: MetaObject      # 任意
slides: SlideArray    # 必須
```

### スライド構造

```yaml
- title: string       # 必須
  body: Body          # 必須
  notes: string       # 任意
```

### ボディタイプ

- **TextBody**: `{ text: string | string[] }`
- **FigureCaptionBody**: `{ style: "figure_caption", figure: string, caption: string, text?: ... }`
- **FigureBulletsBody**: `{ style: "figure_bullets", figure: string, text: string[] }`
- **SplitBody**: `{ style: "split", split: { a: Pane, b: Pane, direction?, ratio? } }`

---

## 🗺 ロードマップ

### v0.3（予定）

- [ ] PDF出力
- [ ] PPTX出力
- [ ] 縦方向ダイアグラムフロー
- [ ] テーマカスタマイズ
- [ ] キーボードショートカットパネル

### 将来

- [ ] スライドごとの複数図
- [ ] セクション構造
- [ ] テンプレートライブラリ
- [ ] クラウドストレージ連携

---

## 📜 ライセンス

MIT License

---

## 🙌 ステータス

**バージョン:** 0.2  
**状態:** 機能的、実験的  
**フォーカス:** PDL言語設計とオーサリング体験

---

## 🔗 リンク

- [PDL仕様書](./pdl.md)
- [GitHubリポジトリ](https://github.com/fukuyori/framenote)
