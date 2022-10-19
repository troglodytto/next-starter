import { AppProps } from 'next/app';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';
import { Provider as StoreProvider } from 'react-redux';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import ThemeProvider from 'theme';
import Layout from 'components/layout';
import GlobalModalContextProvider from 'components/layout/modal';
import wrapper from 'app/store';
import 'styles/globals.css';
import nProgress from 'nprogress';
import { ComponentType, InsHTMLAttributes, Fragment } from 'react';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const queryClient = new QueryClient({
  mutationCache: new MutationCache({}),
});

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: ComponentType<InsHTMLAttributes<unknown>>;
  };
};

function NextApp({ Component, pageProps }: ComponentWithPageLayout) {
  const { store, props } = wrapper.useWrappedStore({ pageProps });

  const PageWrapper = Component.PageLayout ? Component.PageLayout : Fragment;

  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GlobalModalContextProvider>
            <Layout>
              <DefaultSeo
                title="Next Starter"
                description="A Starter Project for NextJs with Typescript and Redux"
                canonical="https://www.github.com/troglodytto/next-starter"
              />
              <PageWrapper>
                <Component {...props.pageProps} />
              </PageWrapper>
            </Layout>
          </GlobalModalContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default NextApp;
