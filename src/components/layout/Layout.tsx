import Link from 'next/link';

import Github from '../../../public/github.svg';
import Twitter from '../../../public/twitter.svg';
import Instagram from '../../../public/instagram.svg';

import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <main className='h-scrren bg-[url("/vertical_bg.png")] bg-cover  bg-no-repeat bg-fixed  tb:bg-none '>
      {children}
      <footer className='bg-portfolioLine-0'>
        <nav className='flex tb:font-title justify-center font-bold list-none pt-2'>
          <li className='text-xl px-3 cursor-pointer'>
            <Link href='https://github.com/toasahi'>
              <a className='px-3'>
                <Github width={32} height={32} />
              </a>
            </Link>
          </li>
          <li className='text-xl px-3  cursor-pointer'>
            <Link href='https://twitter.com/Dasadadana13'>
              <a className='px-3 relative'>
                <Twitter width={32} height={32} />
              </a>
            </Link>
          </li>
          <li className='text-xl px-3  cursor-pointer'>
            <Link href='https://www.instagram.com/todadaas.04/'>
              <a className='px-3 relative'>
                <Instagram width={32} height={32} />
              </a>
            </Link>
          </li>
        </nav>
        <div className=' text-white text-center'>
          <small>&copy; 2023 ASAHI TODA</small>
        </div>
      </footer>
    </main>
  );
};
