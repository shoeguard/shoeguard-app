import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.shoeguard.co/api/v1',
  timeout: 10000,
});

export default api;
