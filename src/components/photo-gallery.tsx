'use client';

import { useCloudinaryPhotos } from '@/hooks/use-cloudinary-photos';
import DecorativeArea from './photo-gallery/decorative-area';
import LargePhoto from './photo-gallery/large-photo';
import SmallPhoto from './photo-gallery/small-photo';
import TallPhoto from './photo-gallery/tall-photo';
import WidePhoto from './photo-gallery/wide-photo';

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

function GalleryItemComponent({ item }: { item: GalleryItem }) {
  if ('type' in item && item.type === 'decorative') {
    return <DecorativeArea text={item.text} className={item.className} />;
  }

  const photo = item as Photo;
  switch (photo.size) {
    case 'large':
      return <LargePhoto src={photo.src} alt={photo.alt} />;
    case 'small':
      return <SmallPhoto src={photo.src} alt={photo.alt} />;
    case 'wide':
      return <WidePhoto src={photo.src} alt={photo.alt} />;
    case 'tall':
      return <TallPhoto src={photo.src} alt={photo.alt} />;
    default:
      return <SmallPhoto src={photo.src} alt={photo.alt} />;
  }
}

// 静的な画像データ（フォールバック用）
const staticGalleryItems: GalleryItem[] = [
  { id: 1, src: '100_0139_xhdvx4', alt: 'ルーム撮影作品', size: 'large' },
  { id: 2, src: '100_0022_wdboxh', alt: '撮影作品2', size: 'small' },
  { id: 3, src: '100_0090_tt9d3k', alt: '撮影作品3', size: 'small' },
  { id: 4, src: '100_0086_ouvgpg', alt: '撮影作品4', size: 'wide' },
  { id: 5, src: '100_0144_ksi7is', alt: '撮影作品5', size: 'tall' },
  { id: 6, src: '100_0018_b7dfxw', alt: '撮影作品6', size: 'small' },
  { id: 7, src: '100_0133_e3mwvj', alt: '撮影作品7', size: 'wide' },
  { id: 8, src: '100_0060_rmncep', alt: '撮影作品8', size: 'small' },
  {
    id: 9,
    type: 'decorative',
    text: 'もっと見る',
    className: 'col-span-1 row-span-1',
  },
];

export default function PhotoGallery() {
  const { galleryItems, loading, error } = useCloudinaryPhotos();

  // フォールバック: APIエラー時は静的データを使用
  const displayItems = error ? staticGalleryItems : galleryItems;

  if (loading) {
    return (
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          📸 写真ギャラリー
        </h2>
        <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[600px] max-w-4xl mx-auto">
          <div className="col-span-4 row-span-4 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin text-3xl mb-2">📸</div>
              <p className="text-gray-500">写真を読み込み中...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          📸 写真ギャラリー
        </h2>
        <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[600px] max-w-4xl mx-auto">
          <div className="col-span-4 row-span-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-2">⚠️</div>
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        📸 写真ギャラリー
      </h2>
      <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[600px] max-w-4xl mx-auto">
        {displayItems.map((item) => (
          <GalleryItemComponent key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
