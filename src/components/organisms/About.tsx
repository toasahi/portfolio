import { Agenda } from '../molecules/Agenda';
import Image from 'next/image';

export const About = () => {
  return (
    <>
      <Agenda agenda={'ABOUT'} />
      <section className='text-white font-text mb-32'>
        <div className='whitespace-nowrap overflow-hidden animate-flowingText'>
          <div className='flex text-6xl justify-between  w-72 font-light'>
            <h2>戸田</h2>
            <h2>麻陽</h2>
          </div>
          <div className='flex text-3xl justify-between w-60 ml-2 font-light mt-3'>
            <p>Toda</p>
            <p>Asahi</p>
          </div>
        </div>
        <div className='font-light tracking-[0.2rem] lg:leading-[2rem] mt-6 '>
          <p className='text-[16px] whitespace-nowrap overflow-hidden animate-flowingText'>
            2000年生まれ Webエンジニア 小学生から高校まで野球をしていた。
            <br />
            2019年にプログラミングに出会い、プログラミングの世界へ
            <br />
            以来、農業・旅行・災害などに関するサービスを発表、展示。
            <br />
            将来はIT × 農業を実現したいと考えています。
          </p>
          <p className='text-[12px] mt-2 whitespace-nowrap overflow-hidden animate-flowingText'>
            Born in 2000 Web Engineer I played baseball from elementary to high school.
            <br />
            Discovered programming in 2019 and entered the world of programming.
            <br />
            Since then, presented and exhibited services related to agriculture, travel, disasters,
            etc.
            <br />
            In the future, hopes to realize IT × Agriculture.
          </p>
        </div>
      </section>
      <section>
        <div className='bg-white ml-10 w-72 h-96 rounded relative mb-32'>
          <Image
            src='/museum.jpg'
            layout='fill'
            objectFit='cover'
            alt='museum'
            className='rounded'
          ></Image>
        </div>
      </section>
    </>
  );
};
