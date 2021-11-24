import axios from 'axios';

const api = axios.create({
  baseURL: 'http://104.131.39.86:3333',
});

export default api;
