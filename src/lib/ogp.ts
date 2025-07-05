import * as cheerio from 'cheerio';

export interface OGPData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
}

export async function fetchOGPData(url: string): Promise<OGPData | null> {
  try {
    // URLの正規化
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

    // HTMLを取得
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
      },
      // キャッシュ設定
      next: { revalidate: 3600 }, // 1時間キャッシュ
    });

    if (!response.ok) {
      console.warn(`Failed to fetch ${normalizedUrl}: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // OGPメタタグから情報を取得
    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text() ||
      '';

    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      '';

    const image =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      '';

    const siteName = $('meta[property="og:site_name"]').attr('content') || '';

    // 相対URLを絶対URLに変換
    const absoluteImage =
      image && !image.startsWith('http')
        ? new URL(image, normalizedUrl).href
        : image;

    return {
      title: title.trim(),
      description: description.trim(),
      image: absoluteImage || '',
      url: normalizedUrl,
      siteName: siteName.trim(),
    };
  } catch (error) {
    console.error(`Error fetching OGP data for ${url}:`, error);
    return null;
  }
}
