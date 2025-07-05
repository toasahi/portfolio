import { getContentItems } from '@/actions/content';
import PortfolioContainer from '@/components/portfolio/portfolio-container';
import SnsNavigation from '@/components/sns-navigation';
import { fetchOGPData } from '@/lib/ogp';
import Link from 'next/link';

export default async function Home() {
  const contentItems = await getContentItems();

  // link-cardタイプのアイテムのOGPデータを事前取得
  const enrichedContentItems = await Promise.all(
    contentItems.map(async (item) => {
      if (item.postType === 'link-card' && item.url) {
        const ogpData = await fetchOGPData(item.url);
        return { ...item, ogpData };
      }
      return item;
    }),
  );

  return (
    <div className="min-h-screen bg-white max-w-[700px] mx-auto">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className="mb-16">
          <div className="mb-6">
            <h1 className="text-xl font-medium text-gray-900 mb-2">
              Asa
              <span className="text-orange-500 ml-1">✨</span>
            </h1>
          </div>

          <div className="space-y-2 text-gray-600 mb-6">
            <p>I'm a SRE and developer in Japan.</p>
            <p>I enjoy programming as a hobby.</p>
            <Link
              href="/about"
              className="text-blue-500 hover:underline inline-block"
            >
              Read more →
            </Link>
          </div>

          <SnsNavigation />
        </header>

        {/* ポートフォリオコンテンツ (クライアントコンポーネント) */}
        <PortfolioContainer contentItems={enrichedContentItems} />
      </div>
    </div>
  );
}
