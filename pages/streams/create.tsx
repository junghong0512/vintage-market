import type { NextPage } from 'next';

const Create: NextPage = () => {
  return (
    <div className='space-y-5 py-10 px-4'>
      <div>
        <label
          htmlFor='name'
          className='mb-1 block text-sm font-medium text-gray-700'
        >
          Name
        </label>
        <div className='rounded-md relative shadow-sm flex items-center'>
          <input
            id='name'
            className='appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500'
            type='text'
          />
        </div>
      </div>
      <div>
        <label
          htmlFor='price'
          className='mb-1 block text-sm font-medium text-gray-700'
        >
          Price
        </label>
        <div className='rounded-md relative shadow-sm flex items-center'>
          <div className='absolute left-0 pl-3 flex items-center justify-center pointer-events-none'>
            <span className='text-gray-500 text-sm'>$</span>
          </div>
          <input
            id='price'
            className='pl-7 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500'
            type='text'
            placeholder='0.00'
          />
          <div className='absolute right-0 pr-3 flex items-center pointer-events-none'>
            <span className='text-gray-500'>USD</span>
          </div>
        </div>
      </div>
      <div>
        <label className='mb-1 block text-sm font-medium text-gray-700'>
          Description
        </label>
        <textarea
          className='mt-1 shadow-sm w-full focus:ring-orange-500 focus:border-orange-500 rounded-md border-gray-300 '
          rows={4}
        />
      </div>
      <button className='w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none '>
        Go Live
      </button>
    </div>
  );
};

export default Create;
