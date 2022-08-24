export const Walk = () => {
  return (
    <div className='flex justify-center items-center bg-[#eaeef0] min-h-[100vh] box-border'>
      <div className='relative w-[350px] h-[250px] shadow-[-10px_-10px_15px_rgba(255,255,255,0.9),8px_8px_25px_rgba(0,0,0,0.5)] bg-[#eaeef0] rounded-[20px] border-[1px] border-solid border-white flex justify-center items-center box-border'>
        <div className='absolute top-[40px] right-[40px] w-12 h-12 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,91,1),0_0_60px_rgba(255,255,91,1),0_0_80px_rgba(255,255,91,1),0_0_100px_rgba(255,255,91,1)]'></div>
        <div className='absolute w-full h-[60px] bottom-0 left-0 bg-[#333]'></div>
      </div>
    </div>
  );
};
