import { determinePhotoSize, getPhotosFromFolder } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // フォルダ指定なしで全画像を取得（画像がルートにあるため）
    const cloudinaryPhotos = await getPhotosFromFolder();

    const photos = cloudinaryPhotos.map((photo, index) => ({
      id: index + 1,
      src: photo.public_id,
      alt: `撮影作品${index + 1}`,
      size: determinePhotoSize(photo.width, photo.height),
    }));

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Photos API error:', error);
    return NextResponse.json(
      { error: '写真の取得に失敗しました' },
      { status: 500 },
    );
  }
}
