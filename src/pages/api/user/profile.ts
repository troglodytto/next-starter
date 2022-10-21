import { NextApiHandler } from 'next';
import httpClient from 'app/services/serverApiClient';

const getUserProfile: NextApiHandler = async (req, res) => {
  try {
    const { data } = await httpClient.get('/user/profile', {
      headers: req.headers,
    });

    const {
      email,
      is_active: isActive,
      is_staff: isStaff,
      is_superuser: isSuperuser,
      profile_image: profileImage,
      username,
    } = data;

    return res.status(200).json({
      isActive,
      email,
      username,
      profileImage,
      isSuperuser,
      isStaff,
    });
  } catch (error) {
    const { status, data } = error.response;

    return res
      .status(status ?? 500)
      .json(data ?? { message: 'Something went wrong' });
  }
};

export default getUserProfile;
