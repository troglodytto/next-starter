import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies, setCookie } from 'nookies';
import { initializeAuthState } from 'app/store/features/auth.slice';
import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import { AuthState } from 'next-env';
import httpClient from 'app/services/serverApiClient';

interface IHomePage {
  auth: Partial<AuthState>;
}

const HomePage: NextPage<IHomePage> = ({ auth }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth) dispatch(initializeAuthState(auth));
  }, [auth, dispatch]);

  return (
    <>
      <Head>
        <title>Next Js Starter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center w-full h-full">
        <h1 className="text-4xl">
          Welcome to&nbsp;
          <a href="https://nextjs.org" className="title">
            Next.js!
          </a>
          <br />
          <span className="text-base flex items-center">
            Powered by
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </h1>
      </main>
    </>
  );
};

HomePage.getInitialProps = async ctx => {
  const { refreshToken: token } = parseCookies(ctx);

  if (token) {
    const {
      data: { access: accessToken, max_age: maxAge },
    } = await httpClient.post('/auth/refresh', { refresh: token });

    setCookie(ctx, 'accessToken', accessToken, {
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: true,
      maxAge,
    });

    const { data } = await httpClient.get('user/profile', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return {
      auth: {
        email: data.email,
        isOnline: data.is_active,
        username: data.username,
        profileImage: data.profile_image,
      },
    };
  }

  return { auth: null };
};

export default HomePage;
