import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav className='flex flex-rows p-2 bg-red-500 text-white font-bold'>
        <Link href='/src/pages'>
          <a>Home</a>
        </Link>
        <Link href='/'>
          <a>About </a>
        </Link>
      </nav>
      {children}
    </div>
  );
};
