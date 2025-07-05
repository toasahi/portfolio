import type { ContentItem } from '@/types/content';
import OGPLinkCard from './ogp-link-card';

interface LinkCardItemProps {
  item: ContentItem;
}

export default function LinkCardItem({ item }: LinkCardItemProps) {
  return (
    <div className="w-full">
      {/* Link Card Header */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xl">{item.icon}</span>
        <span className="text-sm text-gray-600">Published a post on</span>
        <span className="text-sm font-medium text-blue-600">zenn.dev</span>
        <span className="text-sm text-gray-400">{item.date}</span>
      </div>

      {/* Link Card Content */}
      {item.url ? (
        <OGPLinkCard url={item.url} ogpData={item.ogpData || null} />
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </div>
      )}
    </div>
  );
}
