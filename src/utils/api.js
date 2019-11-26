import axios from 'axios';
import api from '../constants/api'
import { userStore } from '../stores/userStore.js';

let authToken;
let token;
const unsubscribe = userStore.subscribe(async (value) => {
  authToken = value.token
})
// const tmpToken = 'v6VdyELtR1ip5qiNGW9jLojW';
const axiosInstance = axios.create({
  baseURL: api.DEV,
  headers: {
    // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc0NzczMTIxLCJqdGkiOiI1NzViNDZlMzZiNTI0NTA3YWIxNzAyZjFmMGNjZjYwNiIsInVzZXJfaWQiOjF9.78fq8gV9IigsNs3Qt1RgktdN8gB7n9Z3fUwmd2em2F8`
    Authorization: `Bearer ${authToken}`
  }
});

// Request
axiosInstance.interceptors.request.use(
  config => {
    if (config.baseURL === api.DEV) {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log(error);

    if (error.response.status === 401) {
      const path = window.location.pathname;
      if(!token && path !== '/unauthorized'){
        console.log('redirect');
        window.location.href = '/unauthorized'
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
