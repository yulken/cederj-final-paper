import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gamestore.caio-torres.dev:3333',
});

export default api;
