import { NextApiHandler } from 'next';
import { destroyCookie } from 'nookies';
import httpClient from 'app/services/serverApiClient';

const logout: NextApiHandler = async (req, res) => {
  try {
    const { data } = await httpClient.get('/auth/logout', {
      headers: req.headers,
    });

    destroyCookie({ res }, 'refreshToken', { path: '/' });
    destroyCookie({ res }, 'accessToken', { path: '/' });

    return res.status(200).json(data);
  } catch (error) {
    const { status, data } = error.response;

    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Something went wrong' });
  }
};

export default logout;
