import Image from 'next/image';

export const Portfolio = () => {
  return (
    <div className='h-screen lg:px-12 xl:px-32'>
      <div className='flex lg:justify-between h-full tracking-[0.7rem] items-center font-title text-main-0'>
        <div className='flex items-center mx-auto lg:mx-0'>
          <div className='font-light text-2xl sm:font-bold xl:text-4xl'>
            <p>TODA</p>
            <p>ASAHI</p>
          </div>
          <div className='hidden lg:block lg:w-0.5 lg:h-96 lg:mx-12 bg-portfolioLine-0'></div>
          <div className='font-bold hidden sm:block lg:text-8xl lg:leading-[7.5rem]'>
            <p>PORT</p>
            <p>FO-</p>
            <p>LIO</p>
          </div>
        </div>
        <div className='hidden lg:block h-screen lg:w-[21rem] lg:mr-12 relative'>
          <Image src='/people.jpg' layout='fill' objectFit='cover' alt='people'></Image>
          <div className='absolute lg:w-96 lg:h-80 border-solid border-2 border-line-0 opacity-60 lg:-left-6 lg:top-64'></div>
        </div>
      </div>
    </div>
  );
};
