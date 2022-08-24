import type { NextPage } from 'next';
import { Header } from '../components/layout/Header';
import { Agenda } from '../components/molecules/Agenda';
import { About } from '../components/organisms/About';
import { Portfolio } from '../components/organisms/Portfolio';

const Home: NextPage = () => {
  return (
    <div className='snap-y h-screen overflow-auto'>
      <Header />
      <Portfolio />
      <div className='snap-start bg-[#526378] lg:px-12 xl:px-16' id='about'>
        <div className='flex h-screen items-center'>
          <About />
        </div>
      </div>
      <div className='snap-start bg-[#4B505B] lg:px-12 xl:px-16' id='profile'>
        <div className='flex h-screen items-center'>
          <Agenda agenda={'PROFILE'} />
        </div>
      </div>
      <div className='snap-start h-screen bg-[#526378] lg:px-12 xl:px-16' id='works'>
        <div className='flex h-screen items-center justify-between'>
          <Agenda agenda={'WORKS'} />
          <section className={'bg-white w-[73%] h-[79%] rounded-2xl'}></section>
          <section className={'overflow-auto h-[79%]'}>
            <div className={'bg-white h-36 w-52 rounded-2xl'}></div>
            <div className={'bg-white h-36 w-52 rounded-2xl my-5'}></div>
            <div className={'bg-white h-36 w-52 rounded-2xl my-5'}></div>
            <div className={'bg-white h-36 w-52 rounded-2xl my-5'}></div>
            <div className={'bg-white h-36 w-52 rounded-2xl my-5'}></div>
          </section>
        </div>
      </div>
      <div className='snap-start h-screen bg-[#4B505B] lg:px-12 xl:px-16' id='contact'>
        <div className='flex h-screen items-center'>
          <Agenda agenda={'CONTACT'} />
        </div>
      </div>
    </div>
  );
};

export default Home;
