import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

type Props = {
  isVisible: boolean;
};

export const Header: FC<Props> = (props) => {
  const { isVisible } = props;
  const scrollToSection = (id: string): void => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={isVisible ? 'block z-10 sticky top-5' : 'hidden'}>
      {/*<div className={'block z-10 sticky top-5'}>*/}
      <nav className='flex p-2 font-title text-white justify-end font-bold list-none mr-16'>
        <li
          className='text-xl px-4 pt-0.5 cursor-pointer transition ease-in-out delay-150 hover:text-[#333333] duration-300 '
          onClick={() => scrollToSection('about')}
        >
          ABOUT
        </li>
        <li
          className='text-xl px-4 pt-0.5 cursor-pointer'
          onClick={() => scrollToSection('profile')}
        >
          PROFILE
        </li>
        <li className='text-xl px-4 pt-0.5 cursor-pointer' onClick={() => scrollToSection('works')}>
          WORKS
        </li>
        <li
          className='text-xl px-4 pt-0.5 cursor-pointer'
          onClick={() => scrollToSection('contact')}
        >
          CONTACT
        </li>
        <li className='text-xl px-3 pt-0.5 cursor-pointer'>
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
        <li className='text-xl px-3 pt-0.5 cursor-pointer'>
          <Link href='https://twitter.com/Dasadadana13'>
            <a className='px-3 relative w-7 h-7'>
              <Image src={'/twitter.svg'} layout='fill' objectFit='cover' alt='twitter' />
            </a>
          </Link>
        </li>
        <li className='text-xl px-3 pt-0.5 cursor-pointer'>
          <Link href='https://www.instagram.com/todadaas.04/'>
            <a className='px-3 relative w-7 h-7'>
              <Image src={'/instagram.svg'} layout='fill' objectFit='cover' alt='instagram' />
            </a>
          </Link>
        </li>
      </nav>
    </div>
  );
};
