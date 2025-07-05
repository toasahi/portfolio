import type { ContentItem } from '@/types/content';

interface TweetItemProps {
  item: ContentItem;
}

export default function TweetItem({ item }: TweetItemProps) {
  return (
    <div className="w-full">
      {/* Tweet Header */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xl">{item.icon}</span>
        <span className="text-sm text-gray-600">Posted logofolio</span>
        <span className="text-sm text-gray-400">{item.date}</span>
      </div>

      {/* Tweet Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {item.author?.name?.charAt(0)}
              </span>
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">
                  {item.author?.name}
                </span>
                <span className="text-gray-500 text-sm">
                  {item.author?.handle}
                </span>
              </div>
              <span className="text-blue-500 text-sm">🐦</span>
            </div>
            <p className="text-gray-900 text-sm leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Tweet Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>21:06 · {item.date}</span>
              <div className="flex items-center space-x-1">
                <span className="text-pink-500">♥</span>
                <span>1,103</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
