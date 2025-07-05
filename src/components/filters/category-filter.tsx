'use client';

import { selectedCategoryAtom, setCategoryAtom } from '@/lib/state/atoms';
import type { Category } from '@/types/content';
import { useAtom } from 'jotai';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'release', label: 'Release' },
  { value: 'writing', label: 'Writing' },
  { value: 'misc', label: 'Misc' },
];

export default function CategoryFilter() {
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [, setCategory] = useAtom(setCategoryAtom);

  return (
    <div className="flex space-x-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          onClick={() => setCategory(category.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === category.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
