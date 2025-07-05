import { v2 as cloudinary } from 'cloudinary';

// Cloudinary設定
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryResource {
  public_id: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  bytes: number;
  url: string;
}

export async function getPhotosFromFolder(
  folderPath?: string,
): Promise<CloudinaryResource[]> {
  try {
    let searchQuery = cloudinary.search.max_results(30);

    // フォルダが指定されている場合のみフォルダ検索
    if (folderPath) {
      searchQuery = searchQuery.expression(`folder:${folderPath}`);
    }

    const result = await searchQuery.execute();
    return result.resources as CloudinaryResource[];
  } catch (error) {
    console.error('Cloudinary API error:', error);
    return [];
  }
}

// 画像のサイズ比率からレイアウトサイズを決定
export function determinePhotoSize(
  width: number,
  height: number,
): 'large' | 'small' | 'wide' | 'tall' {
  const aspectRatio = width / height;

  if (aspectRatio > 1.5) {
    return 'wide'; // 横長
  } else if (aspectRatio < 0.7) {
    return 'tall'; // 縦長
  } else if (Math.random() > 0.7) {
    return 'large'; // ランダムで大きな画像
  } else {
    return 'small'; // デフォルトは小さな画像
  }
}
