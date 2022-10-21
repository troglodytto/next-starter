import { NextApiHandler } from 'next';
import { setCookie } from 'nookies';
import httpClient from 'app/services/serverApiClient';

const login: NextApiHandler = async (req, res) => {
  const { idToken } = req.body;
  try {
    const { data } = await httpClient.post('/auth/login', {
      id_token: idToken,
    });

    const {
      refresh_token: refreshToken,
      access_token: accessToken,
      max_age: maxAge,
      is_active: isActive,
      profile_image: profileImage,
      username,
      email,
    } = data;

    setCookie({ res }, 'refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });

    setCookie({ res }, 'accessToken', accessToken, {
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      maxAge,
    });

    return res.status(200).json({ isActive, email, username, profileImage });
  } catch (error) {
    const { status, data } = error.response;

    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Something went wrong' });
  }
};

export default login;
