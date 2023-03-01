import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import useUser from '@libs/client/useUser';

function MyApp({ Component, pageProps }: AppProps) {
  useUser();

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
        refreshInterval: 10000,
      }}
    >
      <div className='w-full max-w-xl mx-auto'>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
