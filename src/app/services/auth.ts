import axios from 'axios';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';

export const loginService = async (idToken: string) => {
  try {
    const { data } = await axios.post('/api/auth/login', { idToken });
    return data;
  } catch (error) {
    toast.info(`Failed to Login: ${error.response.data.message}`);
    throw error;
  }
};

export const refreshService = async () => {
  try {
    const { data } = await axios.post('/api/auth/refresh');
    return data;
  } catch (error) {
    toast.info(`Failed to Login: ${error.response.data.message}`);
    throw error;
  }
};

export const getValidToken = async () => {
  const { accessToken } = parseCookies();

  if (accessToken) {
    return accessToken;
  }

  await refreshService();

  return parseCookies().accessToken;
};
