import type { Category, ContentItem } from '@/types/content';
import { assign, setup } from 'xstate';

export interface PortfolioContext {
  contentItems: ContentItem[];
  filteredItems: ContentItem[];
  selectedCategory: Category;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

export type PortfolioEvent =
  | { type: 'FILTER_BY_CATEGORY'; category: Category }
  | { type: 'SEARCH'; query: string }
  | { type: 'LOAD_CONTENT'; items: ContentItem[] }
  | { type: 'LOAD_SUCCESS' }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'RESET_FILTERS' };

function filterItems(
  items: ContentItem[],
  category: Category,
  searchQuery: string,
): ContentItem[] {
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
}

export const portfolioMachine = setup({
  types: {
    context: {} as PortfolioContext,
    events: {} as PortfolioEvent,
  },
  actions: {
    setCategory: assign({
      selectedCategory: ({ event }) => {
        if (event.type === 'FILTER_BY_CATEGORY') {
          return event.category;
        }
        return 'all';
      },
    }),
    setSearchQuery: assign({
      searchQuery: ({ event }) => {
        if (event.type === 'SEARCH') {
          return event.query;
        }
        return '';
      },
    }),
    setContentItems: assign({
      contentItems: ({ event }) => {
        if (event.type === 'LOAD_CONTENT') {
          return event.items;
        }
        return [];
      },
    }),
    updateFilteredItems: assign({
      filteredItems: ({ context }) => {
        return filterItems(
          context.contentItems,
          context.selectedCategory,
          context.searchQuery,
        );
      },
    }),
    setLoading: assign({
      isLoading: () => true,
    }),
    clearLoading: assign({
      isLoading: () => false,
    }),
    setError: assign({
      error: ({ event }) => {
        if (event.type === 'LOAD_ERROR') {
          return event.error;
        }
        return null;
      },
    }),
    clearError: assign({
      error: () => null,
    }),
    resetFilters: assign({
      selectedCategory: () => 'all' as const,
      searchQuery: () => '',
    }),
  },
}).createMachine({
  id: 'portfolio',
  initial: 'idle',
  context: {
    contentItems: [],
    filteredItems: [],
    selectedCategory: 'all',
    searchQuery: '',
    isLoading: false,
    error: null,
  },
  states: {
    idle: {
      on: {
        LOAD_CONTENT: {
          target: 'loading',
          actions: ['setContentItems', 'setLoading'],
        },
      },
    },
    loading: {
      on: {
        LOAD_SUCCESS: {
          target: 'ready',
          actions: ['clearLoading', 'clearError', 'updateFilteredItems'],
        },
        LOAD_ERROR: {
          target: 'error',
          actions: ['clearLoading', 'setError'],
        },
      },
    },
    ready: {
      on: {
        FILTER_BY_CATEGORY: {
          actions: ['setCategory', 'updateFilteredItems'],
        },
        SEARCH: {
          actions: ['setSearchQuery', 'updateFilteredItems'],
        },
        RESET_FILTERS: {
          actions: ['resetFilters', 'updateFilteredItems'],
        },
        LOAD_CONTENT: {
          target: 'loading',
          actions: ['setContentItems', 'setLoading'],
        },
      },
    },
    error: {
      on: {
        LOAD_CONTENT: {
          target: 'loading',
          actions: ['setContentItems', 'setLoading', 'clearError'],
        },
        RESET_FILTERS: {
          target: 'ready',
          actions: ['resetFilters', 'clearError', 'updateFilteredItems'],
        },
      },
    },
  },
});
