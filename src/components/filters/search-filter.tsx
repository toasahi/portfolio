'use client';

import { searchQueryAtom, setSearchQueryAtom } from '@/lib/state/atoms';
import { useAtom } from 'jotai';

export default function SearchFilter() {
  const [searchQuery] = useAtom(searchQueryAtom);
  const [, setSearchQuery] = useAtom(setSearchQueryAtom);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search content..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
