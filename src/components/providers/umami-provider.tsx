'use client';

import { setupOutboundLinkTracking } from '@/hooks/use-umami';
import { useEffect } from 'react';

interface UmamiProviderProps {
  children: React.ReactNode;
}

export default function UmamiProvider({ children }: UmamiProviderProps) {
  useEffect(() => {
    // Umamiスクリプトが読み込まれるまで待機
    const initializeTracking = () => {
      if (window.umami) {
        setupOutboundLinkTracking();
      } else {
        // 100ms後に再試行
        setTimeout(initializeTracking, 100);
      }
    };

    // DOM読み込み完了後に初期化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeTracking);
    } else {
      initializeTracking();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', initializeTracking);
    };
  }, []);

  return <>{children}</>;
}
