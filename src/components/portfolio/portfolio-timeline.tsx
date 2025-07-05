'use client';

import {
  EventItem,
  GitHubItem,
  LinkCardItem,
  ReleaseItem,
  TweetItem,
} from '@/components/content-items';
import { filteredItemsAtom } from '@/lib/state/atoms';
import type { ContentItem } from '@/types/content';
import { useAtom } from 'jotai';

function renderContentItem(item: ContentItem) {
  switch (item.postType) {
    case 'tweet':
      return <TweetItem item={item} />;
    case 'release':
      return <ReleaseItem item={item} />;
    case 'link-card':
      return <LinkCardItem item={item} />;
    case 'event':
      return <EventItem item={item} />;
    case 'github':
      return <GitHubItem item={item} />;
    default:
      return (
        <div className="w-full">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        </div>
      );
  }
}

export default function PortfolioTimeline() {
  const [filteredItems] = useAtom(filteredItemsAtom);

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No content found for the selected category.
        </p>
      </div>
    );
  }

  // Group items by year
  const itemsByYear = filteredItems.reduce(
    (acc, item) => {
      const year = item.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    },
    {} as Record<string, ContentItem[]>,
  );

  const years = Object.keys(itemsByYear).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a),
  );

  return (
    <main className="bg-gray-50 rounded-lg p-6">
      <div className="space-y-12">
        <div className="transition-all duration-300 ease-in-out opacity-100 translate-y-0">
          {years.map((year) => (
            <div
              key={year}
              className={years.indexOf(year) === 0 ? 'mb-12' : ''}
            >
              <h2 className="text-lg font-medium text-gray-900 mb-6">{year}</h2>
              <div className="space-y-4 relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-px border-l border-dashed border-gray-300"></div>
                {itemsByYear[year].map((item) => (
                  <div key={item.id} className="relative pl-16">
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-6 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                    {renderContentItem(item)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
