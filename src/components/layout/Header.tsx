import Link from 'next/link';
import Twitter from '../../../public/twitter.svg';
import Github from '../../../public/github.svg';
import Instagram from '../../../public/instagram.svg';

export const Header = () => {
  const scrollToSection = (id: string): void => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='z-10 sticky top-5'>
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
          className=' text-xl px-4 pt-0.5 cursor-pointer'
          onClick={() => scrollToSection('contact')}
        >
          CONTACT
        </li>
        <Link href='https://github.com/toasahi'>
          <a className='px-3'>
            <Github />
          </a>
        </Link>
        <Link href='https://twitter.com/Dasadadana13'>
          <a className='px-3'>
            <Twitter />
          </a>
        </Link>
        <Link href='https://www.instagram.com/todadaas.04/'>
          <a className='px-3'>
            <Instagram />
          </a>
        </Link>
      </nav>
    </div>
  );
};
