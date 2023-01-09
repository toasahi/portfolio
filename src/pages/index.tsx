import type { NextPage } from 'next';
import { About } from '../components/organisms/About';
import { Portfolio } from '../components/organisms/Portfolio';

const Home: NextPage = () => {
  return (
    <div className='h-screen'>
      <Portfolio />
      <div
        className='bg-[url("/about.png")] bg-no-repeat bg-cover bg-center rounded w-full  h-[700px] lg:px-12 xl:px-16'
        id='about'
      >
        <div className='flex'>
          <About />
        </div>
      </div>
    </div>
  );
};

export default Home;
