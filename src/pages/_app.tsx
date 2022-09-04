import Layout from 'components/layout';
import { AppProps } from 'next/app';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import 'styles/globals.css';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({}),
});

function NextApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default NextApp;
