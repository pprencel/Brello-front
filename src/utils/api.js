import axios from 'axios';
import api from '../constants/api'

// const tmpToken = 'v6VdyELtR1ip5qiNGW9jLojW';
const axiosInstance = axios.create({
  baseURL: api.TEST,
  headers: {
    // TOKEN: tmpToken,
  }
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
