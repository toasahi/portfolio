'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black text-white px-4 py-2 rounded-full shadow-lg">
        <div className="flex items-center space-x-1">
          <Link
            href="/"
            className={
              pathname === '/'
                ? 'bg-white text-black px-3 py-1 rounded-md text-sm'
                : 'text-white hover:bg-gray-800 px-3 py-1 rounded-md text-sm transition-colors'
            }
          >
            Home
          </Link>
          <Link
            href="/about"
            className={
              pathname === '/about'
                ? 'bg-white text-black px-3 py-1 rounded-md text-sm'
                : 'text-white hover:bg-gray-800 px-3 py-1 rounded-md text-sm transition-colors'
            }
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
