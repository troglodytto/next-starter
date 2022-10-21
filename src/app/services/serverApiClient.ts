import axios from 'axios';

export const API_BASE_URL =
  process.env.API_URL ?? 'http://localhost:8000/api/v1';

const httpClient = axios.create({
  headers: {
    'Content-type': 'application/json',
    'x-api-key': process.env.API_KEY,
  },
  baseURL: API_BASE_URL,
});

export default httpClient;
