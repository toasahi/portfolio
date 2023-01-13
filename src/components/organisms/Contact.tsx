import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<FormData>({
    mode: 'onBlur',
    criteriaMode: 'all',
  });

  // submit時の処理
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    alert('OK. メールアドレスは一致しています。');
  };

  return (
    <section className='h-screen'>
      <div className='flex justify-center'>
        <h1 className='font-title font-thin text-center text-main-0 text-5xl pt-20 border-b-4 pb-1 w-48 '>
          Contact
        </h1>
      </div>
      <section className='w-2/3 mx-auto p-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='block md:flex md:justify-between'>
            <div className='w-full md:w-1/2'>
              <label className='font-title text-label-0 tracking-widest font-thin'>Name</label>
              <input
                className='w-full h-16  text-main-0 rounded-xl block text-2xl p-3 outline-none border-input-0 border-2'
                type='name'
                {...register('name', {
                  required: '名前を入力してください',
                })}
              />
            </div>
            <div className='w-full md:w-1/2'>
              <label className='font-title text-label-0 tracking-widest font-thin'>Email</label>
              <input
                className='w-full h-16  text-main-0 rounded-xl block text-2xl p-3 outline-none border-input-0 border-2'
                type='email'
                {...register('email', {
                  required: 'メールアドレスを入力してください。',
                  pattern: {
                    value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                    message: '入力形式がメールアドレスではありません。',
                  },
                })}
              />
            </div>
          </div>
          <div className='w-fill md:pt-16'>
            <label className='font-title text-label-0 tracking-widest font-thin'>Email</label>
            <input
              className='w-full h-16  text-main-0 rounded-xl block text-2xl p-3 outline-none border-input-0 border-2'
              type='email'
              {...register('email', {
                required: 'メールアドレスを入力してください。',
                pattern: {
                  value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                  message: '入力形式がメールアドレスではありません。',
                },
              })}
            />
          </div>
        </form>
      </section>
    </section>
  );
};
