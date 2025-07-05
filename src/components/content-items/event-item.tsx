import type { ContentItem } from '@/types/content';

interface EventItemProps {
  item: ContentItem;
}

export default function EventItem({ item }: EventItemProps) {
  return (
    <div className="w-full">
      {/* Event Header */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xl">{item.icon}</span>
        <span className="text-sm text-gray-600">
          Presented at Classmethod Odyssey
        </span>
        <span className="text-sm text-gray-400">{item.date}</span>
      </div>

      {/* Event Content */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      >
        <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
        {item.url && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{item.url}</span>
          </div>
        )}
      </a>
    </div>
  );
}
