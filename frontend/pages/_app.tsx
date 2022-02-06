import { Page } from '@components/Page';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <NextNProgress color='red'
                   startPosition={0.3}
                   stopDelayMs={200}
                   height={5}
                   showOnShallow={true} />
    <Page>
      <Component {...pageProps} />
    </Page>
  </>;
}
