import type { Category, ContentItem } from '@/types/content';
import { atom } from 'jotai';
import { atomWithMachine } from 'jotai-xstate';
import { portfolioMachine } from './portfolio-machine';

// XState machine atom
export const portfolioMachineAtom = atomWithMachine(() => portfolioMachine);

// Individual atoms for granular control
export const selectedCategoryAtom = atom<Category>('all');
export const searchQueryAtom = atom<string>('');

// Computed atoms
export const contentItemsAtom = atom<ContentItem[]>([]);

// Filtered items atom that recomputes when dependencies change
export const filteredItemsAtom = atom<ContentItem[]>((get) => {
  const items = get(contentItemsAtom);
  const category = get(selectedCategoryAtom);
  const searchQuery = get(searchQueryAtom);

  let filtered = items;

  // Category filter
  if (category !== 'all') {
    filtered = filtered.filter((item) => item.type === category);
  }

  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );
  }

  return filtered;
});

// Loading states
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);

// Actions
export const setCategoryAtom = atom(null, (get, set, category: Category) => {
  set(selectedCategoryAtom, category);
});

export const setSearchQueryAtom = atom(null, (get, set, query: string) => {
  set(searchQueryAtom, query);
});

export const setContentItemsAtom = atom(
  null,
  (get, set, items: ContentItem[]) => {
    set(contentItemsAtom, items);
  },
);

export const resetFiltersAtom = atom(null, (get, set) => {
  set(selectedCategoryAtom, 'all');
  set(searchQueryAtom, '');
});

// UI state atoms
export const activeItemIdAtom = atom<string | null>(null);
export const expandedItemsAtom = atom<Set<string>>(new Set<string>());

// Toggle expanded item
export const toggleExpandedItemAtom = atom(null, (get, set, itemId: string) => {
  const expandedItems = new Set(get(expandedItemsAtom));
  if (expandedItems.has(itemId)) {
    expandedItems.delete(itemId);
  } else {
    expandedItems.add(itemId);
  }
  set(expandedItemsAtom, expandedItems);
});

// Timeline view state
export const timelineViewAtom = atom<'list' | 'grid'>('list');
export const selectedYearAtom = atom<string | 'all'>('all');
