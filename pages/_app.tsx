import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
