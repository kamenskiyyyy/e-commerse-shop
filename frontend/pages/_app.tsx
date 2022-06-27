import { Page } from '@components/Page';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/withData';

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  if (Component.getInitialProps) {
    pageProps = Component.getInitialProps(pageProps);
  }

  return (
    <ApolloProvider client={apolloClient}>
      <NextNProgress
        color='red'
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow
      />
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}
