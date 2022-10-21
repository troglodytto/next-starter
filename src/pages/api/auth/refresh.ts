import { NextApiHandler } from 'next';
import { parseCookies, setCookie } from 'nookies';
import httpClient from 'app/services/serverApiClient';

const refreshToken: NextApiHandler = async (req, res) => {
  try {
    const { refreshToken: refresh } = parseCookies({ req });

    const { data } = await httpClient.post('/auth/refresh', { refresh });

    const { access: accessToken, max_age: maxAge } = data;

    setCookie({ res }, 'accessToken', accessToken, {
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: true,
      maxAge,
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    const { status, data } = error.response;

    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Something went wrong' });
  }
};

export default refreshToken;
