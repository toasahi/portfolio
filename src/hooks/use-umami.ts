import { useCallback } from 'react';

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
    window.umami.track('outbound-link', {
      url: link.href,
      text: link.textContent?.trim() || '',
      hostname: link.hostname,
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
        window.umami.track('outbound-link', {
          url,
          hostname: new URL(url).hostname,
          ...additionalData,
        });
      }
    },
    [],
  );

  return { track, trackOutboundLink };
};
