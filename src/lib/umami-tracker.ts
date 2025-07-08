'use client';
import { getOrCreateUser } from '@/lib/userUtils';
import { useEffect } from 'react';

interface UmamiTrackerProps {
  userId?: string;
}

export default function UmamiTracker({ userId }: UmamiTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const initializeUmami = () => {
      if (window.umami) {
        const user = getOrCreateUser();
        const finalUserId = userId || user.id;

        window.umami.identify({
          userId: finalUserId,
          sessionId: user.sessionId,
          createdAt: user.createdAt,
        });

        // biome-ignore lint/suspicious/noConsole: Development logging is necessary
        console.log('Umami initialized with user:', finalUserId);
      }
    };

    if (window.umami) {
      initializeUmami();
    } else {
      const checkUmami = setInterval(() => {
        if (window.umami) {
          initializeUmami();
          clearInterval(checkUmami);
        }
      }, 100);

      return () => clearInterval(checkUmami);
    }
  }, [userId]);

  return null;
}
