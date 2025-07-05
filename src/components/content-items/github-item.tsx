import type { ContentItem } from '@/types/content';

interface GitHubItemProps {
  item: ContentItem;
}

export default function GitHubItem({ item }: GitHubItemProps) {
  return (
    <div className="w-full">
      {/* GitHub Header */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xl">{item.icon}</span>
        <span className="text-sm text-gray-600">{item.title}</span>
      </div>
    </div>
  );
}
