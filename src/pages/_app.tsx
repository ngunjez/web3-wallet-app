import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/src/styles/theme';
// import { GlobalStyles } from '@/src/styles/GlobalStyles';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Web3 Wallet - Connect & View Balances</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* <GlobalStyles /> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}