import { useRouter } from 'next/router';

export const About = () => {
  const router = useRouter();
  const linkToAbout = () => {
    router.push('/about');
  };

  return (
    <section className='bg-[url("/about.png")] bg-no-repeat bg-cover bg-center w-full  h-[750px] px-16 py-32'>
      <div className='text-white font-text'>
        <div className='flex text-6xl justify-between w-72 font-light'>
          <h2>戸田</h2>
          <h2>麻陽</h2>
        </div>
        <div className='flex text-3xl justify-between w-60 ml-2 font-light mt-3'>
          <p>Toda</p>
          <p>Asahi</p>
        </div>
        <div className='font-light tracking-[0.2rem] lg:leading-[2rem] mt-5 '>
          <p>
            2000年生まれ Webエンジニア 小学生から高校まで野球をしていた。
            <br />
            2019年にプログラミングに出会い、プログラミングの世界へ
            <br />
            以来、農業・旅行・災害などに関するサービスを発表、展示。
            <br />
            将来はIT × 農業を実現したいと考えています。
          </p>
          <p className='mt-5'>
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
        <button
          onClick={linkToAbout}
          className='w-48 h-16 mt-8 rounded-xl border-white text-xl border-2 font-extralight font-buttonText tracking-widest bg-transparent'
        >
          View About
        </button>
      </div>
    </section>
  );
};
