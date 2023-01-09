import type { NextPage } from 'next';
import { About } from '../components/organisms/About';
import { Portfolio } from '../components/organisms/Portfolio';

const Home: NextPage = () => {
  return (
    <div className='h-screen'>
      <Portfolio />
      <About />
    </div>
  );
};

export default Home;
