'use client';

import { selectedCategoryAtom, setCategoryAtom } from '@/lib/state/atoms';
import type { Category } from '@/types/content';
import { useAtom } from 'jotai';

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

export default function CategoryButtons() {
  const [activeCategory] = useAtom(selectedCategoryAtom);
  const [, setCategory] = useAtom(setCategoryAtom);

  const handleCategoryChange = (category: Category) => {
    setCategory(category);
  };

  return (
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
  );
}
