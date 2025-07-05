'use client';

import LinkCardItem from '@/components/content-items/link-card-item';
import ReleaseItem from '@/components/content-items/release-item';
import TweetItem from '@/components/content-items/tweet-item';
import { filteredItemsAtom } from '@/lib/state/atoms';
import type { ContentItem } from '@/types/content';
import { useAtom } from 'jotai';

function renderContentItem(item: ContentItem) {
  switch (item.postType) {
    case 'tweet':
      return <TweetItem key={item.id} item={item} />;
    case 'release':
      return <ReleaseItem key={item.id} item={item} />;
    case 'link-card':
      return <LinkCardItem key={item.id} item={item} />;
    case 'event':
      return <TweetItem key={item.id} item={item} />;
    case 'github':
      return <TweetItem key={item.id} item={item} />;
    default:
      return <TweetItem key={item.id} item={item} />;
  }
}

export default function PortfolioContent() {
  const [filteredItems] = useAtom(filteredItemsAtom);

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No content found.</p>
      </div>
    );
  }

  // Group by year for timeline display
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
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 sticky top-0 bg-white py-2">
            {year}
          </h2>
          <div className="space-y-6">
            {itemsByYear[year].map(renderContentItem)}
          </div>
        </div>
      ))}
    </div>
  );
}
