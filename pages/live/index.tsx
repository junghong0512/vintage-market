import type { NextPage } from 'next';

const Live: NextPage = () => {
  return (
    <div className='py-10  divide-y-2 space-y-4'>
      {[1, 1, 1, 1, 1, 1].map((_, i) => (
        <div className='px-4 pt-4' key={i}>
          <div className='w-full rounded-md shadow-sm bg-slate-300 aspect-video' />
          <h3 className='font-medium text-gray-700 text-lg mt-2'>
            Let&apos;s try potatos
          </h3>
        </div>
      ))}
      <button className='fixed bottom-24 right-5 bg-orange-400 rounded-full p-4 text-white shadow-xl hover:bg-orange-500 cursor-pointer transition-colors border-transparent'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
          />
        </svg>
      </button>
    </div>
  );
};

export default Live;
