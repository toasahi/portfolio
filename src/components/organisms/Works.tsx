export const Works = () => {
  return (
    <section className='h-full'>
      <div className='flex justify-center'>
        <h1 className='font-title font-thin text-center text-main-0 text-5xl pt-20 border-b-4 pb-1 w-48 '>
          WORKS
        </h1>
      </div>
      <div className='w-full h-[40rem] relative overflow-hidden'>
        <div className='w-64 absolute top-16  animate-slideView1 tb:w-1/4'>
          <img className='' src='kainouji.jpg' alt='test'></img>
        </div>
        <div className='w-48 absolute top-32  animate-slideView3 tb:w-1/4'>
          <img className='' src='kainouji.jpg' alt='test'></img>
        </div>
        <div className='w-48 absolute top-64  animate-slideView2 tb:w-1/4'>
          <img className='' src='kainouji.jpg' alt='test'></img>
        </div>
        <div className='w-48 absolute top-96  animate-slideView4 tb:w-1/4'>
          <img className='' src='kainouji.jpg' alt='test'></img>
        </div>
      </div>
    </section>
  );
};
