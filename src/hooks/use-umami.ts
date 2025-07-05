import { useCallback } from 'react';

// URL解析とイベント名生成
const generateEventName = (url: string, source?: string): string => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    // 主要サービスのマッピング
    const serviceMap: Record<string, string> = {
      'zenn.dev': 'zenn',
      'qiita.com': 'qiita',
      'note.com': 'note',
      'github.com': 'github',
      'twitter.com': 'twitter',
      'x.com': 'twitter',
      'linkedin.com': 'linkedin',
      'youtube.com': 'youtube',
      'youtu.be': 'youtube',
      'medium.com': 'medium',
      'dev.to': 'dev',
      'stackoverflow.com': 'stackoverflow',
      'docs.google.com': 'google-docs',
      'drive.google.com': 'google-drive',
    };

    // www. プレフィックスを削除
    const cleanHostname = hostname.replace(/^www\./, '');

    // サービス名を取得（マッピングにない場合はホスト名の最初の部分を使用）
    const serviceName =
      serviceMap[cleanHostname] || cleanHostname.split('.')[0];

    // ソース情報があれば結合
    return source ? `${serviceName}-${source}` : serviceName;
  } catch {
    // URL解析に失敗した場合はフォールバック
    return source ? `external-${source}` : 'external';
  }
};

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

// Umamiドキュメントに基づく外部リンク追跡設定
export const setupOutboundLinkTracking = () => {
  if (typeof window !== 'undefined') {
    // 既存のクリックリスナーがあれば削除
    document.removeEventListener('click', handleOutboundClick);
    // 新しいクリックリスナーを追加
    document.addEventListener('click', handleOutboundClick);
  }
};

// 外部リンククリックハンドラー
const handleOutboundClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const link = target.closest('a');

  if (!link || !link.href) return;

  // 外部リンクかどうかチェック
  const isExternal = link.hostname !== window.location.hostname;
  const isOutbound =
    isExternal &&
    !link.href.startsWith('mailto:') &&
    !link.href.startsWith('tel:');

  if (isOutbound && window.umami) {
    // カスタムイベント名を生成
    const eventName = generateEventName(link.href, 'auto');

    window.umami.track(eventName, {
      url: link.href,
      text: link.textContent?.trim() || '',
      hostname: link.hostname,
      trackingType: 'auto',
    });
  }
};

export const useUmami = () => {
  const track = useCallback(
    (eventName: string, eventData?: Record<string, any>) => {
      if (typeof window !== 'undefined' && window.umami) {
        window.umami.track(eventName, eventData);
      }
    },
    [],
  );

  // 外部リンク専用トラッキング
  const trackOutboundLink = useCallback(
    (url: string, additionalData?: Record<string, any>) => {
      if (typeof window !== 'undefined' && window.umami) {
        // // ソース情報に基づいてカスタムイベント名を生成
        // const source = additionalData?.source || 'manual';
        // const eventName = generateEventName(url, source);

        window.umami.track(url, {
          url,
          hostname: new URL(url).hostname,
          trackingType: 'manual',
          ...additionalData,
        });
      }
    },
    [],
  );

  return { track, trackOutboundLink };
};
