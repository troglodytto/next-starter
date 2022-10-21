import APIS from 'app/services/urls';
import axios from 'axios';
import { NextApiHandler } from 'next';
import { destroyCookie } from 'nookies';

const logout: NextApiHandler = async (req, res) => {
  try {
    const { data } = await axios.get(APIS.LOGOUT, { headers: req.headers });

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
