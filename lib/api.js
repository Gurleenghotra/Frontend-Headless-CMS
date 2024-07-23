import axios from 'axios';

const api = axios.create({
  baseURL: 'https://usable-crown-415c3bf021.strapiapp.com', // Ensure this URL matches your Strapi server URL
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default api;
