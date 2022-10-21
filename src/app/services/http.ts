import axios from 'axios';
import { getValidToken } from './auth';

const httpClient = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
});

httpClient.interceptors.request.use(async request => {
  const accessToken = await getValidToken();

  if (accessToken) {
    Object.assign(request.headers, {
      Authorization: `Bearer ${accessToken}`,
    });
  }

  return request;
});

export default httpClient;
