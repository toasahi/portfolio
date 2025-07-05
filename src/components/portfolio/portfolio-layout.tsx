'use client';

import CategoryFilter from '@/components/filters/category-filter';
import SearchFilter from '@/components/filters/search-filter';
import { setContentItemsAtom } from '@/lib/state/atoms';
import type { ContentItem } from '@/types/content';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import PortfolioContent from './portfolio-content';

interface PortfolioLayoutProps {
  initialContentItems: ContentItem[];
}

export default function PortfolioLayout({
  initialContentItems,
}: PortfolioLayoutProps) {
  const [, setContentItems] = useAtom(setContentItemsAtom);

  useEffect(() => {
    setContentItems(initialContentItems);
  }, [initialContentItems, setContentItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <SearchFilter />
        <CategoryFilter />
        <PortfolioContent />
      </div>
    </div>
  );
}
