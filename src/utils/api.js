import axios from 'axios';
import api from '../constants/api'
import { userStore } from '../stores/userStore.js';
import { popupStore } from '../stores/popupStore.js';
let authToken;

userStore.subscribe(async (value) => {
  authToken = value.token
})
const axiosInstance = axios.create({
  baseURL: api.DEV,
  headers: {
    Authorization: `Bearer ${authToken}`
  }
});

// Request
axiosInstance.interceptors.request.use(
  config => {
    if (config.baseURL === api.DEV) {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }else {
        config.headers.Authorization = ``;
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
      if(path  === '/signin'){
        console.log('prevent redirect');
        console.log(error.response);
        popupStore.msg(error.response.data.detail, "error")
        Promise.resolve(true)
      }else if(path !== '/unauthorized'){
        console.log('redirect');
        window.location.href = '/unauthorized'
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
