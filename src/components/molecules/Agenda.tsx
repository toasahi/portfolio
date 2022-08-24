import { FC } from 'react';

type Props = {
  agenda: string;
};

export const Agenda: FC<Props> = (props) => {
  const { agenda } = props;
  return (
    <div className='bg-[#3A3A3A] h-1/2 mx-10 w-2 p-1.5 relative '>
      <h1 className='absolute text-white font-title rotate-90 text-4xl -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2'>
        {agenda}
      </h1>
    </div>
  );
};
