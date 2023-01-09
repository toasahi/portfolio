import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
      <main className='h-scrren'>{children}
      <footer>
        <div className=' text-main-0'>
          <small>&copy; 2023 ASAHI TODA</small>
        </div>
      </footer>
      </main>
  );
};
