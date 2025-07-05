import { useUmami } from '@/hooks/use-umami';
import type { OGPData } from '@/lib/ogp';

interface OGPLinkCardProps {
  url: string;
  ogpData: OGPData | null;
}

export default function OGPLinkCard({ url, ogpData }: OGPLinkCardProps) {
  const { trackOutboundLink } = useUmami();

  const handleLinkClick = () => {
    trackOutboundLink(ogpData?.url || url, {
      title: ogpData?.title || 'Unknown',
      source: 'link_card',
    });
  };
  if (!ogpData) {
    // フォールバック表示
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">🔗</span>
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {url}
            </h3>
            <p className="text-xs text-gray-500">リンクを開く</p>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={ogpData.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleLinkClick}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* 画像部分 */}
      {ogpData.image && (
        <div className="aspect-[2/1] bg-gray-100">
          <img
            src={ogpData.image}
            alt={ogpData.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* コンテンツ部分 */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {ogpData.title}
        </h3>
        {ogpData.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {ogpData.description}
          </p>
        )}
        <div className="flex items-center text-xs text-gray-500">
          <span className="truncate">
            {ogpData.siteName || new URL(ogpData.url).hostname}
          </span>
        </div>
      </div>
    </a>
  );
}
