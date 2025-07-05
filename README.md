# ポートフォリオ

Next.js 15を使用して構築された、高度な状態管理と柔軟なコンテンツシステムを備えたモダンなインタラクティブポートフォリオサイトです。

## 🎯 概要

このポートフォリオは、スケーラブルなWebアプリケーション構築への洗練されたアプローチを示しています：

- **デュアル状態管理**: アトミック状態のためのJotai + 複雑なフローのためのXState
- **ハイブリッドコンテンツシステム**: データベースバックアップと静的フォールバック
- **サーバーサイド最適化**: 事前計算されたOGPメタデータとRSCアーキテクチャ
- **型安全な開発**: モダンツールとの完全なTypeScript統合

## 🚀 技術スタック

### コアフレームワーク
- **Next.js 15** - App RouterとReact Server Components
- **TypeScript** - 完全な型安全性とモダンな開発体験
- **Tailwind CSS** - カスタムコンポーネントを含むユーティリティファーストスタイリング

### 状態管理
- **Jotai** - 細かい更新のためのアトミック状態管理
- **XState** - 複雑なUIフローのための状態機械
- **jotai-xstate** - JotaiとXStateの統合

### データベース & コンテンツ
- **Turso** - エッジ対応SQLiteデータベース
- **Drizzle ORM** - 型安全なデータベース操作
- **OGPメタデータ** - 自動リンクプレビュー生成

### 開発者体験
- **Biome** - 高速なリントと整形（ESLint + Prettier代替）
- **Lefthook** - コード品質のためのGitフック
- **Bun** - 高速パッケージマネージャーとランタイム

## 📁 プロジェクト構造

```
src/
├── actions/              # データ取得用Server Actions
│   └── content.ts        # コンテンツ管理操作
├── app/                  # Next.js App Router
│   ├── api/ogp/         # OGPメタデータAPIエンドポイント
│   ├── about/           # Aboutページ
│   └── page.tsx         # ポートフォリオホームページ
├── components/
│   ├── content-items/   # コンテンツタイプレンダラー
│   │   ├── tweet-item.tsx
│   │   ├── release-item.tsx
│   │   ├── link-card-item.tsx
│   │   └── ...
│   ├── filters/         # 検索とフィルタリングUI
│   ├── portfolio/       # ポートフォリオレイアウトコンポーネント
│   └── providers/       # 状態管理プロバイダー
├── lib/
│   ├── db/             # データベース層
│   │   ├── client.ts   # Turso接続
│   │   ├── schema.ts   # Drizzleスキーマ
│   │   └── repository.ts # データ操作
│   ├── state/          # 状態管理
│   │   ├── atoms.ts    # Jotai atoms
│   │   └── portfolio-machine.ts # XState状態機械
│   └── ogp.ts          # OGPメタデータ取得
├── scripts/
│   └── seed-db.ts      # データベースシーディング
└── types/
    └── content.ts      # TypeScript型定義
```

## 🛠️ 開発

### 前提条件
- **Bun** (推奨) または Node.js 18+
- データベース管理用の **Turso CLI**

### セットアップ

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd ai-portfolio
   ```

2. **依存関係のインストール**
   ```bash
   bun install
   ```

3. **環境設定**
   ```bash
   cp .env.example .env.local
   # TursoデータベースのURLと認証トークンを設定
   ```

4. **データベースセットアップ**
   ```bash
   bun run db:push      # データベースにスキーマを適用
   bun run db:seed      # サンプルデータでシード
   ```

5. **開発サーバー**
   ```bash
   bun run dev
   ```

### 利用可能なスクリプト

```bash
# 開発
bun run dev          # 開発サーバー起動
bun run build        # プロダクションビルド作成
bun run start        # プロダクションサーバー起動

# コード品質
bun run check        # Biome整形 + リント実行
bun run format       # コード整形のみ
bun run lint         # リントのみ

# データベース操作
bun run db:generate  # 新しいマイグレーション生成
bun run db:push      # データベースにスキーマをプッシュ
bun run db:migrate   # マイグレーション実行
bun run db:studio    # Drizzle Studio開く
bun run db:seed      # サンプルデータでデータベースをシード

# Gitフック
bun run lefthook:install  # Gitフックをインストール
```

## 🏗️ アーキテクチャ

### 状態管理戦略

**Jotai Atoms（細かい状態）**
```typescript
// UI状態のアトミック更新
const selectedCategoryAtom = atom<Category>('all');
const searchQueryAtom = atom<string>('');

// 派生状態の計算されたatom
const filteredItemsAtom = atom((get) => {
  const items = get(contentItemsAtom);
  const category = get(selectedCategoryAtom);
  // ... フィルタリングロジック
});
```

**XState状態機械（複雑なフロー）**
```typescript
// ポートフォリオライフサイクル管理
const portfolioMachine = setup({
  // Loading → Ready → Error状態
  // カテゴリフィルタリング、検索、リセットアクション
});
```

### コンテンツシステム

**統一コンテンツモデル**
- 複数の投稿形式をサポートする単一の`ContentItem`型
- リッチプレビューシステム（機能、ポートフォリオ、OGP、画像）
- 静的フォールバックデータを持つデータベースバックアップ

**コンテンツタイプ**
- **Release**: 機能紹介付きの製品リリース
- **Link Card**: OGPメタデータ付きの外部記事
- **Tweet**: メトリクス付きのソーシャルメディアスタイル投稿
- **Event**: タイムラインイベントとお知らせ
- **GitHub**: リポジトリショーケース

### データフロー

```
Database → Repository → Server Actions → RSC → Client Components
    ↓           ↓            ↓           ↓          ↓
  Turso → 型安全操作 → getContentItems → SSR → Jotai State
```

## 🎨 コンテンツ管理

### 新しいコンテンツの追加

コンテンツは2つの方法で管理できます：

1. **データベース**（メイン）
   ```bash
   bun run db:studio  # GUI管理用のDrizzle Studioを開く
   ```

2. **静的データ**（フォールバック）
   ```typescript
   // src/actions/content.ts
   const defaultItems: ContentItem[] = [
     {
       id: 'unique-id',
       type: 'release',
       postType: 'release',
       title: 'マイプロジェクト',
       description: 'プロジェクトの説明...',
       // ... その他のフィールド
     }
   ];
   ```

### コンテンツアイテム構造

```typescript
interface ContentItem {
  id: string;
  type: 'release' | 'writing' | 'misc';
  postType: 'tweet' | 'link-card' | 'release' | 'event' | 'github';
  title: string;
  description: string;
  date: string;
  url?: string;
  icon: string;
  author?: AuthorInfo;
  preview?: PreviewData;
  metrics?: MetricsData;
  year: string;
}
```

### コード品質

`biome.jsonc`でのBiome設定：
- ケバブケースファイル命名を強制
- TypeScript対応リントルール
- 一貫した整形基準

## 📖 設計思想

このポートフォリオは、いくつかのモダンなWeb開発パターンを実証しています：

1. **アトミック状態管理** - 細かい更新により不要な再レンダリングを防止
2. **プログレッシブエンハンスメント** - 静的データで動作し、データベースで強化
3. **型安全性** - データベースからUIまでの完全なTypeScriptカバレッジ
4. **パフォーマンス最優先** - RSC、エッジデータベース、最適化されたバンドリング
5. **開発者体験** - 包括的なツールと明確な抽象化