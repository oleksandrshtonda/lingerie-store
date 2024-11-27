import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080/api/v1';
const token = "cm9vdDpHZW5pdXM4Nw==";
localStorage.setItem('authToken', token);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://116.203.195.165:8080/api/v1', // Правильний базовий URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in request:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Unauthorized. Redirecting to login...');
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
      }
      console.error(`Error ${error.response.status}:`, error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
