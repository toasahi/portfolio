'use client';

import CategoryButtons from '@/components/filters/category-buttons';
import { setContentItemsAtom } from '@/lib/state/atoms';
import type { ContentItem } from '@/types/content';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import PortfolioTimeline from './portfolio-timeline';

interface PortfolioContainerProps {
  contentItems: ContentItem[];
}

export default function PortfolioContainer({
  contentItems,
}: PortfolioContainerProps) {
  const [, setContentItems] = useAtom(setContentItemsAtom);

  useEffect(() => {
    setContentItems(contentItems);
  }, [contentItems, setContentItems]);

  return (
    <>
      <CategoryButtons />
      <PortfolioTimeline />
    </>
  );
}
