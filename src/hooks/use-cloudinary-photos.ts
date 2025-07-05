'use client';

import { useEffect, useState } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  size: 'large' | 'small' | 'wide' | 'tall';
}

interface DecorativeItem {
  id: number;
  type: 'decorative';
  text?: string;
  className?: string;
}

type GalleryItem = Photo | DecorativeItem;

export function useCloudinaryPhotos() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch('/api/photos');
        if (!response.ok) {
          throw new Error('写真の取得に失敗しました');
        }

        const photos: Photo[] = await response.json();

        // 装飾アイテムを追加
        const items: GalleryItem[] = [
          ...photos,
          {
            id: photos.length + 1,
            type: 'decorative',
            text: 'もっと見る',
            className: 'col-span-1 row-span-1',
          },
        ];

        setGalleryItems(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラー');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return { galleryItems, loading, error };
}
