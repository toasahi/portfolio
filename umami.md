# Umamiによる外部リンクメトリクス追跡システム解説

## 概要

このポートフォリオサイトでは、[Umami](https://umami.is/)を使用して外部リンクのクリック状況を詳細に追跡しています。ユーザーが外部サイトへのリンクをクリックした際に、自動的にメトリクスをUmamiサーバーに送信する仕組みを実装しています。

## 🚀 Umami設定方法

### 1. Umamiアカウントの作成

#### Cloud版（推奨）

1. **Umami Cloudにアクセス**
   ```
   https://cloud.umami.is/
   ```

2. **アカウント作成**
   - GitHubアカウントでの認証が推奨
   - メールアドレスでの登録も可能

3. **プランの選択**
   - **Free**: 月間10万PVまで無料
   - **Hobby**: 月間$9、100万PVまで
   - **Pro**: 月間$20、1000万PVまで

#### セルフホスト版

```bash
# Docker Composeを使用した構築例
git clone https://github.com/umami-software/umami.git
cd umami
cp .env.example .env

# データベース設定（PostgreSQL推奨）
echo "DATABASE_URL=postgresql://username:password@localhost:5432/umami" >> .env
echo "HASH_SALT=your-random-hash-salt" >> .env

# 起動
docker-compose up -d
```

### 2. ウェブサイトの登録

#### Umamiダッシュボードでの設定

1. **新しいウェブサイトを追加**
   ```
   Settings → Websites → Add website
   ```

2. **ウェブサイト情報の入力**
   - **Name**: `My Portfolio` など
   - **Domain**: `your-domain.com`
   - **Timezone**: `Asia/Tokyo`

3. **トラッキングコードの取得**
   ```html
   <script 
     src="https://cloud.umami.is/script.js" 
     data-website-id="your-website-id">
   </script>
   ```

### 3. Next.jsプロジェクトへの統合

#### 環境変数の設定

```bash
# .env.local ファイルを作成
echo "NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id" >> .env.local
```

#### layout.tsxへの追加

```typescript
// src/app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
        
        {/* Umamiトラッキングスクリプト */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```

### 4. 外部リンク追跡の実装

#### カスタムHookの作成

```typescript
// src/hooks/use-umami.ts
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export const useUmami = () => {
  const track = useCallback((eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track(eventName, eventData);
    }
  }, []);

  return { track };
};
```

#### プロバイダーの実装

```typescript
// src/components/providers/umami-provider.tsx
'use client';

import { setupOutboundLinkTracking } from '@/hooks/use-umami';
import { useEffect } from 'react';

export default function UmamiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initializeTracking = () => {
      if (window.umami) {
        setupOutboundLinkTracking();
      } else {
        setTimeout(initializeTracking, 100);
      }
    };

    initializeTracking();
  }, []);

  return <>{children}</>;
}
```

### 5. 動作確認

#### ブラウザでの確認

1. **開発者ツールの確認
   ```javascript
   // Consoleで実行
   console.log('Umami loaded:', !!window.umami);
   
   // テストイベント送信
   window.umami?.track('test-event', { source: 'manual-test' });
   ```

2. **ネットワークタブの確認**
   - `umami.is` へのリクエストを確認
   - イベント送信時の POST リクエストを確認

#### Umamiダッシュボードでの確認

1. **リアルタイム確認**
   ```
   Dashboard → Realtime → ページビューとイベントをリアルタイム表示
   ```

2. **イベント分析**
   ```
   Analytics → Events → カスタムイベントの詳細分析
   ```

### 6. 高度な設定

#### カスタムドメインの設定（Self-hosted）

```nginx
# nginx設定例
server {
    listen 443 ssl;
    server_name analytics.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### データ保持期間の設定

```sql
-- PostgreSQLでの設定例
-- 1年以上のデータを削除
DELETE FROM event WHERE created_at < NOW() - INTERVAL '1 year';
DELETE FROM pageview WHERE created_at < NOW() - INTERVAL '1 year';
```

#### GDPR対応設定

```typescript
// Cookie同意バナーとの連携例
const initializeUmami = () => {
  if (cookieConsent.analytics) {
    setupOutboundLinkTracking();
  }
};
```

### 7. パフォーマンス最適化

#### 遅延読み込み設定

```typescript
// 条件付き読み込み
const shouldLoadUmami = process.env.NODE_ENV === 'production' && 
                       process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
```

#### バンドルサイズ最適化

```typescript
// 動的インポート
const loadUmami = async () => {
  if (typeof window !== 'undefined') {
    const { setupOutboundLinkTracking } = await import('@/hooks/use-umami');
    setupOutboundLinkTracking();
  }
};
```

### 8. トラブルシューティング

#### よくある問題

1. **スクリプトが読み込まれない**
   ```bash
   # Content Security Policy の確認
   # meta タグまたはヘッダーに追加
   script-src 'self' https://cloud.umami.is;
   ```

2. **イベントが送信されない**
   ```typescript
   // デバッグ用コード
   window.umami?.track('debug-event', { 
     timestamp: Date.now(),
     userAgent: navigator.userAgent 
   });
   ```

3. **環境変数が読み込まれない**
   ```bash
   # Next.js再起動
   npm run dev
   # または
   bun run dev
   ```

#### ログ確認方法

```typescript
// 開発時のデバッグログ
if (process.env.NODE_ENV === 'development') {
  console.log('Umami track:', { eventName, eventData });
}
```

## アーキテクチャ

### システム構成図

```
[ユーザークリック] → [リンク検出] → [メトリクス生成] → [Umami送信]
     ↓                   ↓              ↓             ↓
   a要素クリック      外部リンク判定    イベント名生成   追跡データ送信
```

### 主要コンポーネント

1. **useUmami Hook** (`src/hooks/use-umami.ts`)
2. **UmamiProvider** (`src/components/providers/umami-provider.tsx`)  
3. **OGPLinkCard** (`src/components/content-items/ogp-link-card.tsx`)
4. **Umamiスクリプト** (RootLayoutで読み込み)

## 実装詳細

### 1. useUmami Hook

#### 主要機能

```typescript
// 自動追跡：全ての外部リンクを自動検出・追跡
const setupOutboundLinkTracking = () => {
  document.addEventListener('click', handleOutboundClick);
};

// 手動追跡：特定のリンクを意図的に追跡
const trackOutboundLink = (url: string, additionalData?: Record<string, any>) => {
  window.umami.track(url, { url, hostname, trackingType: 'manual', ...additionalData });
};
```

#### イベント名生成ロジック

```typescript
const generateEventName = (url: string, source?: string): string => {
  const serviceMap = {
    'zenn.dev': 'zenn',
    'github.com': 'github',
    'twitter.com': 'twitter',
    // ... その他のサービス
  };
  
  const hostname = new URL(url).hostname.replace(/^www\./, '');
  const serviceName = serviceMap[hostname] || hostname.split('.')[0];
  
  return source ? `${serviceName}-${source}` : serviceName;
};
```

**例：**
- `https://zenn.dev/article/123` → `zenn-auto` (自動検出の場合)
- `https://github.com/user/repo` → `github-link-card` (リンクカードから手動の場合)

### 2. 外部リンク検出システム

#### 自動検出の仕組み

```typescript
const handleOutboundClick = (event: MouseEvent) => {
  const link = (event.target as HTMLElement).closest('a');
  
  // 外部リンク判定
  const isExternal = link.hostname !== window.location.hostname;
  const isOutbound = isExternal && 
    !link.href.startsWith('mailto:') && 
    !link.href.startsWith('tel:');
  
  if (isOutbound && window.umami) {
    const eventName = generateEventName(link.href, 'auto');
    window.umami.track(eventName, {
      url: link.href,
      text: link.textContent?.trim() || '',
      hostname: link.hostname,
      trackingType: 'auto',
    });
  }
};
```

#### 追跡対象の判定基準

✅ **追跡対象**
- 異なるホスト名へのリンク
- HTTP/HTTPSプロトコル

❌ **追跡対象外**
- 同一サイト内のリンク
- `mailto:` リンク
- `tel:` リンク

### 3. プロバイダーシステム

#### UmamiProvider の役割

```typescript
export default function UmamiProvider({ children }: UmamiProviderProps) {
  useEffect(() => {
    const initializeTracking = () => {
      if (window.umami) {
        setupOutboundLinkTracking(); // 自動追跡を有効化
      } else {
        setTimeout(initializeTracking, 100); // Umamiスクリプト読み込み待機
      }
    };

    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeTracking);
    } else {
      initializeTracking();
    }
  }, []);
  
  return <>{children}</>;
}
```

#### コンポーネント階層

```
RootLayout
├── StateProvider (Jotai状態管理)
└── UmamiProvider (追跡システム初期化)
    └── children (全てのページコンポーネント)
```

### 4. 手動追跡システム

#### OGPLinkCard での実装例

```typescript
export default function OGPLinkCard({ url, ogpData }: OGPLinkCardProps) {
  const { trackOutboundLink } = useUmami();

  const handleLinkClick = () => {
    trackOutboundLink(ogpData?.url || url, {
      title: ogpData?.title || 'Unknown',
      source: 'link-card',           // 追跡ソースを明示
      siteName: ogpData?.siteName,   // 追加のメタデータ
    });
  };

  return (
    <a
      href={ogpData.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleLinkClick}      // 手動追跡をトリガー
    >
      {/* リンクカードUI */}
    </a>
  );
}
```

## データフロー

### 1. 自動追跡フロー

```
1. ユーザーが外部リンクをクリック
   ↓
2. handleOutboundClick が発火
   ↓
3. 外部リンクかどうか判定
   ↓
4. generateEventName でイベント名生成
   ↓
5. window.umami.track でデータ送信
   ↓
6. Umamiサーバーに記録
```

### 2. 手動追跡フロー

```
1. ユーザーがOGPリンクカードをクリック
   ↓
2. handleLinkClick が発火
   ↓
3. trackOutboundLink を呼び出し
   ↓
4. 追加メタデータと共にUmamiに送信
   ↓
5. リンク先へナビゲート
```

## 追跡データの構造

### 自動追跡データ

```typescript
{
  url: "https://zenn.dev/example",
  text: "リンクのテキスト内容",
  hostname: "zenn.dev",
  trackingType: "auto"
}
```

### 手動追跡データ（OGPリンクカード）

```typescript
{
  url: "https://zenn.dev/example",
  hostname: "zenn.dev", 
  trackingType: "manual",
  title: "記事のタイトル",
  source: "link-card",
  siteName: "Zenn"
}
```

## メトリクス分析での活用

### 取得可能なインサイト

1. **人気外部サービス**: どのサービスが最も参照されているか
2. **コンテンツ効果**: どのコンテンツタイプが外部リンククリックを促進するか
3. **ユーザー行動**: どのようなリンクテキストがクリックされやすいか
4. **サイト価値**: 外部リソースへの導線としての価値

### Umamiダッシュボードでの確認項目

- **Events**: `zenn-auto`, `github-link-card` などのイベント頻度
- **Custom Properties**: `source`, `siteName` による詳細分析
- **Page Views**: リンククリック前のページ分析

## セキュリティ考慮事項

### プライバシー保護

1. **個人情報の除外**: URLパラメータの機密情報は送信しない
2. **最小限データ**: 必要最小限のメタデータのみ追跡
3. **ユーザー同意**: 分析目的であることを明示

### 実装上の安全策

```typescript
// URLの正規化とサニタイゼーション
const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

// エラーハンドリング
try {
  const parsedUrl = new URL(url);
  // 処理続行
} catch {
  return 'external'; // フォールバック
}
```

## トラブルシューティング

### よくある問題と解決法

1. **Umamiスクリプトが読み込まれない**
   ```typescript
   // 解決策: 初期化の遅延実行
   setTimeout(initializeTracking, 100);
   ```

2. **重複イベントの発生**
   ```typescript
   // 解決策: リスナーの重複登録防止
   document.removeEventListener('click', handleOutboundClick);
   document.addEventListener('click', handleOutboundClick);
   ```

3. **環境変数の設定漏れ**
   ```bash
   # .env.local に設定
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
   ```

### デバッグ方法

```typescript
// ブラウザコンソールでの確認
console.log('Umami available:', !!window.umami);
console.log('Tracking data:', { url, hostname, trackingType });
```

## 今後の拡張可能性

### 追加機能の提案

1. **A/Bテスト**: リンクテキストの効果測定
2. **リアルタイム分析**: 即座のフィードバック表示
3. **カスタムイベント**: より詳細なユーザー行動追跡
4. **パフォーマンス追跡**: リンク先サイトの応答時間測定

### 技術的改善案

1. **TypeScript強化**: より厳密な型定義
2. **テスト追加**: Jest/Playwright による自動テスト
3. **エラー監視**: Sentryとの連携
4. **キャッシュ最適化**: 追跡データの効率的な送信

## まとめ

このUmamiによる外部リンク追跡システムは、以下の特徴を持っています：

- 🔄 **自動・手動の二重追跡**: 包括的なデータ収集
- 🎯 **精密なイベント分類**: サービス別・ソース別の詳細分析
- 🔒 **プライバシー重視**: 最小限のデータ収集
- 🚀 **パフォーマンス最適化**: 非同期処理によるUX向上
- 📊 **豊富なメタデータ**: 詳細な分析を可能にする構造化データ

このシステムにより、ポートフォリオサイトの価値とユーザー行動を定量的に把握し、コンテンツ戦略の最適化に活用できます。

UmamiProviderが必要な理由は、layout.tsxでのScriptロードとクライアント側の初期化が非同期で動作するためです。

  layout.tsx:32-36 でUmamiスクリプトをafterInteractive戦略で読み込んでいますが、これは単純にscriptタグをDOMに
  追加するだけです。

  UmamiProvider は、スクリプトが実際に読み込まれwindow.umamiが利用可能になるまで待機し、その後に外部リンクト
  ラッキング機能（setupOutboundLinkTracking()）を初期化する役割を持っています。

  つまり、ScriptはUmamiライブラリをダウンロードし、UmamiProviderはその初期化と設定を担当しています。

> mamiProviderが必要な理由は、layout.tsxでのScriptロードとクライアント側の初期化が非同期で動作するためです。
  ですが初心者にもわかりやすく処理の流れを教えてください。

⏺ Umamiの処理の流れを初心者向けに説明します：

  1. ページが開かれる

  ユーザーがサイトにアクセスすると、layout.tsxが最初に読み込まれます。

  2. Scriptタグがスクリプトをダウンロード開始

  // layout.tsx:32-36
  <Script
    src="https://cloud.umami.is/script.js"
    strategy="afterInteractive"  // ページが操作可能になった後にダウンロード
  />
  この時点ではまだUmamiは使えません（ダウンロード中）。

  3. UmamiProviderが起動

  同時に、UmamiProviderコンポーネントもマウントされ、useEffectが実行されます。

  4. Umamiが使えるまで待機

  // umami-provider.tsx:13-19
  const initializeTracking = () => {
    if (window.umami) {
      // ✅ Umamiが読み込み完了！設定開始
      setupOutboundLinkTracking();
    } else {
      // ❌ まだダウンロード中...100ms後に再チェック
      setTimeout(initializeTracking, 100);
    }
  };

  5. 外部リンクトラッキング設定完了

  Umamiが利用可能になったら、外部リンクのクリック追跡機能を設定します。

  なぜ2つに分かれているか？
  - Script: Umamiライブラリを取得する係
  - UmamiProvider: Umamiが準備完了するまで待って設定する係

  レストランで例えると、Scriptが「料理を注文」、UmamiProviderが「料理が出来上がるまで待って食べ始める」役割で
  す。


   window.umamiを使用する理由と、data-umami-event属性がNext.jsでは不十分な理由を説明します：

  Next.jsの制約とSPAの問題

  1. Server Side Renderingの制約

  // ❌ Next.jsのSSRではwindowオブジェクトが存在しない
  <a data-umami-event="outbound-link-click">  // サーバー側では動作しない

  2. 動的コンテンツの追跡困難

  // ❌ 静的属性では動的情報を取得できない
  <a data-umami-event="outbound-link-click"
     data-umami-event-url="https://example.com">  // URLが動的に変わる場合に対応できない

  3. 詳細なメタデータ収集の限界

  // ❌ 属性だけでは複雑なデータを送信できない
  // リンクテキスト、ホスト名、カスタムイベント名の生成など

  window.umamiを使う利点

  1. 動的なイベント名生成

  // ✅ URLから動的にサービス名を判定
  const eventName = generateEventName(link.href, 'auto');
  // 'github-auto', 'zenn-auto' など
  window.umami.track(eventName, { ... });

  2. 豊富なメタデータ送信

  // ✅ 複雑なデータ構造を送信可能
  window.umami.track('github-auto', {
    url: link.href,
    text: link.textContent?.trim(),    // リンクのテキスト
    hostname: link.hostname,           // ホスト名
    trackingType: 'auto',             // 自動/手動の区別
    siteName: ogpData?.siteName       // OGPデータ
  });

  3. クライアント側での完全制御

  // ✅ ブラウザでのみ実行、SSRの制約なし
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }

  実際の動作比較

  属性ベース（制限あり）

  <!-- 静的、メタデータ不足 -->
  <a href="https://github.com/user/repo"
     data-umami-event="outbound-link-click"
     data-umami-event-url="https://github.com/user/repo">

  window.umamiベース（柔軟）

  // 動的、豊富なメタデータ
  const handleClick = () => {
    window.umami.track('github-link-card', {
      url: 'https://github.com/user/repo',
      title: 'Repository Name',
      source: 'link-card',
      siteName: 'GitHub'
    });
  };

  結論: Next.jsのSSR環境と動的なメタデータ収集要件により、window.umamiを使った JavaScript
  ベースの実装が必要不可欠です。

   window.umamiを使う理由を、もっと分かりやすく説明します：

  🍔 ハンバーガーショップの例で理解する

  data-umami-event（属性）方式 = メニュー看板

  <!-- これは看板のようなもの -->
  <a data-umami-event="hamburger-click">ハンバーガー</a>

  問題点：
  - 看板は「ハンバーガーがクリックされた」としか分からない
  - 誰が？いつ？どのハンバーガー？が分からない
  - 注文内容の詳細が取れない

  window.umami方式 = 注文システム

  // 詳細な注文情報を記録
  window.umami.track('big-mac-order', {
    customer: '田中さん',
    time: '14:30',
    extras: ['ポテト', 'コーラ'],
    price: 590
  });

  利点：
  - 誰が何を注文したか詳細に分かる
  - リアルタイムで情報を記録
  - 複雑な注文内容も対応可能

  🏗️ 技術的な理由

  1. Next.jsのSSR問題

  // サーバー側（Node.js）では window が存在しない
  if (typeof window !== 'undefined') {  // ブラウザでのみ実行
    window.umami.track('click');
  }

  2. 動的な情報収集

  // リンクをクリックした瞬間に情報を生成
  const handleClick = () => {
    const linkText = element.textContent;     // 「GitHub」
    const hostname = new URL(url).hostname;   // 「github.com」

    window.umami.track(`${hostname}-click`, {
      text: linkText,
      url: url,
      timestamp: Date.now()
    });
  };

  3. 条件に応じた追跡

  // 外部リンクかどうか判定してから追跡
  if (link.hostname !== window.location.hostname) {
    window.umami.track('external-link', { url: link.href });
  }

  📊 実際のデータ比較

  属性方式で取れるデータ

  イベント名: "outbound-link-click"
  URL: "https://github.com"

  window.umami方式で取れるデータ

  イベント名: "github-link-card"
  URL: "https://github.com/user/repo"
  リンクテキスト: "React Component Library"
  サイト名: "GitHub"
  追跡タイプ: "manual"
  タイムスタンプ: 2024-01-15T10:30:00Z

  結論： window.umamiは「詳細な情報を動的に収集できる高機能な注文システム」で、属性は「基本情報しか分からない
  看板」程度の違いがあります。