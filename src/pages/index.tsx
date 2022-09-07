import type { NextPage } from 'next';
import { Header } from '../components/layout/Header';
import { Agenda } from '../components/molecules/Agenda';
import { About } from '../components/organisms/About';
import { Portfolio } from '../components/organisms/Portfolio';
import Image from 'next/image';
import { useState } from 'react';

const Home: NextPage = () => {
  const [work, setWorks] = useState('aster.jpeg');
  const images = ['aster.jpeg', 'kainouji.jpg', 'aster.jpeg', 'kainouji.jpg'];
  const onClickWorks = (id: number) => setWorks(images[id]);
  return (
    <div className='snap-y h-screen overflow-auto'>
      <Header isVisible={true} />
      <Portfolio />
      <div className='snap-start bg-[#4B505B] lg:px-12 xl:px-16' id='about'>
        <div className='flex h-screen items-center'>
          <About />
        </div>
      </div>
      <div className='snap-start bg-[#526378] lg:px-12 xl:px-16' id='profile'>
        <div className='flex h-screen items-center'>
          <Agenda agenda={'PROFILE'} />
        </div>
      </div>
      <div className='snap-start h-screen bg-[#4B505B] lg:px-12 xl:px-16' id='works'>
        <div className='flex h-screen items-center justify-between'>
          <Agenda agenda={'WORKS'} />
          <section className={'bg-white w-[73%] h-[79%] rounded-2xl relative'}>
            <Image
              src={'/' + work}
              layout='fill'
              objectFit='fill'
              alt='museum'
              className='rounded'
            ></Image>
          </section>
          <section className={'overflow-auto h-[79%]'}>
            <div className={'bg-white h-36 w-52 rounded-2xl relative'}>
              <Image
                src='/aster.jpeg'
                layout='fill'
                objectFit='fill'
                alt='aster'
                className='rounded'
                onClick={() => onClickWorks(0)}
              ></Image>
            </div>
            <div className={'bg-white h-36 w-52 rounded-2xl my-5 relative'}>
              <Image
                src='/kainouji.jpg'
                layout='fill'
                objectFit='fill'
                alt='kainouji'
                className='rounded'
                onClick={() => onClickWorks(1)}
              ></Image>
            </div>
            <div className={'bg-white h-36 w-52 rounded-2xl my-5'}></div>
            <div className={'bg-white h-36 w-52 rounded-2xl my-5'}></div>
            <div className={'bg-white h-36 w-52 rounded-2xl my-5'}></div>
          </section>
        </div>
      </div>
      <div className='snap-start h-screen bg-[#526378] lg:px-12 xl:px-16' id='contact'>
        <div className='flex h-screen items-center'>
          <Agenda agenda={'CONTACT'} />
        </div>
      </div>
    </div>
  );
};

export default Home;
