export const Contact = () => {
  return (
    <section className='h-screen'>
      <div className='flex justify-center'>
        <h1 className='font-title font-light text-center text-main-0 text-5xl pt-20 border-b-4 pb-1 w-48 '>
          Contact
        </h1>
      </div>
      <section>
        <div className="flex">
            <div>
                <label>Name</label>
                <input type={'text'}></input>
            </div>
            <div>
                <label>Email</label>
                <input type={'email'}></input>
            </div>
        </div>
        <div>

        </div>
      </section>
    </section>
  );
};
