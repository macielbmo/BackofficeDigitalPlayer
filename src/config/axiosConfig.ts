import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// // Adicionando interceptadores (opcional)
// api.interceptors.request.use(
//   (config) => {
//     console.log('Requisição feita com Axios:', config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//     //   window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
