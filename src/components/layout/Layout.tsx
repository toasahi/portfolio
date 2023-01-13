import Link from 'next/link'
import Image from 'next/image'

import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <main className='h-full'>
      {children}
      <footer className='bg-portfolioLine-0 h-24'>
      <nav className='flex font-title justify-center font-bold list-none pt-2'>
        <li className='text-xl px-3 cursor-pointer'>
          <Link href='https://github.com/toasahi'>
            <a className='px-3 relative w-7 h-7'>
              <Image
                src={'/github.svg'}
                layout='fill'
                objectFit='cover'
                alt='github'
                className={'px-3'}
              />
            </a>
          </Link>
        </li>
        <li className='text-xl px-3  cursor-pointer'>
          <Link href='https://twitter.com/Dasadadana13'>
            <a className='px-3 relative w-7 h-7'>
              <Image src={'/twitter.svg'} layout='fill' objectFit='cover' alt='twitter' />
            </a>
          </Link>
        </li>
        <li className='text-xl px-3  cursor-pointer'>
          <Link href='https://www.instagram.com/todadaas.04/'>
            <a className='px-3 relative w-7 h-7'>
              <Image src={'/instagram.svg'} layout='fill' objectFit='cover' alt='instagram' />
            </a>
          </Link>
        </li>
      </nav>
        <div className=' text-white text-center pt-4'>
          <small>&copy; 2023 ASAHI TODA</small>
        </div>
      </footer>
    </main>
  );
};
