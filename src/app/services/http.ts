import axios from 'axios';

const httpClient = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
});

httpClient.interceptors.request.use(async request => {
  return request;
});

export default httpClient;
