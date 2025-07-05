# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
Next.js App Routerを使用した個人ポートフォリオサイトの開発プロジェクトです。

## 開発コマンド

### 基本コマンド
```sh
bun install        # 依存関係インストール
bun run dev        # 開発サーバー起動 (http://localhost:3000)
bun run build      # プロダクションビルド
bun run start      # プロダクションサーバー起動
```

### コード品質管理
```sh
bun run format     # Biomeフォーマット適用
bun run lint       # Biomeリント実行・修正
bun run check      # Biomeフォーマット・リント一括実行
```

### Git Hooks
```sh
bun run lefthook:install  # Git hooksセットアップ
```

## アーキテクチャ

### データフロー
1. **Static Data** → 静的データソース（`src/actions/content.ts`内のデフォルトデータ）
2. **Server Actions** (`src/actions/content.ts`) → データ取得
3. **Server Components** (`src/app/page.tsx`) → SSRでOGPデータ事前取得
4. **Client Components** (`src/components/portfolio-content.tsx`) → インタラクティブUI

### コンテンツ管理システム
- **Static Content**: 静的データによるコンテンツ管理
- **ContentItem型**: 統一されたコンテンツモデル（`src/types/content.ts`）
- **Default Data**: `getDefaultContentItems()`関数でコンテンツを定義

### コンポーネント設計
- **モジュラー設計**: コンテンツタイプ別コンポーネント（`src/components/content-items/`）
- **postType**: tweet, link-card, release, event, github
- **OGP統合**: 外部リンクの自動メタデータ取得

## 技術スタック

### フロントエンド
- **Next.js 15** - App Router, React Server Components
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **Jotai** - 状態管理
- **XState** - 複雑なUIフロー管理

### 開発ツール
- **Biome** - 高速リンター・フォーマッター（eslint + prettier代替）
- **lefthook** - Git hooks管理


## プロジェクト要件

### サイト機能
- **静的ポートフォリオサイト** - 認証機能なし
- **カテゴリフィルタリング**: All, Release, Writing, Misc
- **タイムライン表示**: 年別でコンテンツを整理
- **OGPリンクカード**: 外部記事の自動プレビュー生成
- **レスポンシブデザイン**: モバイルファースト

### デザイン参考
- **catnoseポートフォリオ** (https://catnose.me/)
- **参考画像**: `/image/catnose/*.png`

## 開発規約

### ファイル命名規則
- **ケバブケース**: 全てのファイル名はケバブケース（kebab-case）で統一
- **Biome設定**: `biome.jsonc`でファイル名規約を強制
- **例**: `user-profile.tsx`, `api-client.ts`, `hero-section.component.tsx`

### コード品質
- **設計原則**: 単一責任、疎結合、早期return、不変性重視
- **React Server Components**: useEffect最小化、SSRで最適化
- **TypeScript**: 型安全性を最大限活用
- **参考書籍**: 「良いコード/悪いコードで学ぶ設計入門」

## 重要な実装パターン

### Server Actions使用
```typescript
// src/actions/content.ts で静的データ取得
'use server';
export async function getContentItems(): Promise<ContentItem[]> {
  return getDefaultContentItems();
}
```

### OGPデータ事前取得
```typescript
// ページコンポーネントでOGPデータを事前取得
const enrichedContentItems = await Promise.all(
  contentItems.map(async (item) => {
    if (item.postType === 'link-card' && item.url) {
      const ogpData = await fetchOGPData(item.url);
      return { ...item, ogpData };
    }
    return item;
  })
);
```

### コンテンツタイプ別レンダリング
```typescript
// src/components/portfolio-content.tsx
switch (item.postType) {
  case 'tweet': return <TweetItem item={item} />;
  case 'release': return <ReleaseItem item={item} />;
  case 'link-card': return <LinkCardItem item={item} />;
  // ...
}
```

## コメント
- コードのコメントは全て日本語で記述してください。

## TDD TODOリスト

### 基本方針

- 🔴 Red: 失敗するテストを書く
- 🟢 Green: テストを通す最小限の実装
- 🔵 Refactor: リファクタリング
- 小さなステップで進める
- 仮実装（ベタ書き）から始める
- 三角測量で一般化する
- 明白な実装が分かる場合は直接実装してもOK
- テストリストを常に更新する
- 不安なところからテストを書く

### TDD実践のコツ

1. **最初のテスト**: まず失敗するテストを書く（コンパイルエラーもOK）
2. **仮実装**: テストを通すためにベタ書きでもOK（例：`return 42`）
3. **三角測量**: 2つ目、3つ目のテストケースで一般化する
4. **リファクタリング**: テストが通った後で整理する
5. **TODOリスト更新**: 実装中に思いついたことはすぐリストに追加
6. **1つずつ**: 複数のテストを同時に書かない
7. **コミット**: テストが通ったらすぐコミット

### コミットルール

- 
🔴 テストを書いたら: `test: add failing test for [feature]`
- 🟢 テストを通したら: `feat: implement [feature] to pass test`
- 🔵 リファクタリングしたら: `refactor: [description]`
- 小さくコミットする（1機能1コミット）