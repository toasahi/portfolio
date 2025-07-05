'use client';

import {
  EventItem,
  GitHubItem,
  LinkCardItem,
  ReleaseItem,
  TweetItem,
} from '@/components/content-items';
import type { Category, ContentItem } from '@/types/content';
import { useEffect, useState } from 'react';

interface PortfolioContentProps {
  contentItems: ContentItem[];
}

export default function PortfolioContent({
  contentItems,
}: PortfolioContentProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isVisible, setIsVisible] = useState(true);

  const filteredItems = contentItems.filter(
    (item) => activeCategory === 'all' || item.type === activeCategory,
  );

  const handleCategoryChange = (category: Category) => {
    if (category !== activeCategory) {
      setIsVisible(false);
      setTimeout(() => {
        setActiveCategory(category);
        setIsVisible(true);
      }, 150);
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, [activeCategory]);

  const renderContentItem = (item: ContentItem) => {
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
  };

  const categoryLabels = {
    all: 'All',
    release: 'Release',
    writing: 'Writing',
    misc: 'Misc',
  };

  const categoryIcons = {
    all: '✋',
    release: '🎉',
    writing: '🚕',
    misc: '🐶',
  };

  return (
    <>
      {/* Category Filter Buttons */}
      <div className="flex space-x-4 mb-12">
        {(Object.keys(categoryLabels) as Category[]).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryChange(category)}
            className={`flex flex-col items-center p-3 transition-all duration-200 ${
              activeCategory === category ? '' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gray-100 '
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{categoryIcons[category]}</span>
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {categoryLabels[category]}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-12">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            {/* 2025 年 */}
            {filteredItems.some((item) => item.year === '2025') && (
              <div className="mb-12">
                <h2 className="text-lg font-medium text-gray-900 mb-6">2025</h2>
                <div className="space-y-4 relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-px border-l border-dashed border-gray-300"></div>
                  {filteredItems
                    .filter((item) => item.year === '2025')
                    .map((item) => (
                      <div key={item.id} className="relative pl-16">
                        {/* Timeline dot */}
                        <div className="absolute left-4 top-6 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                        {renderContentItem(item)}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 2024 年 */}
            {filteredItems.some((item) => item.year === '2024') && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">2024</h2>
                <div className="space-y-4 relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-px border-l border-dashed border-gray-300"></div>
                  {filteredItems
                    .filter((item) => item.year === '2024')
                    .map((item) => (
                      <div key={item.id} className="relative pl-16">
                        {/* Timeline dot */}
                        <div className="absolute left-4 top-6 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                        {renderContentItem(item)}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
