import axios from 'axios';
import api from '../constants/api'

// const tmpToken = 'v6VdyELtR1ip5qiNGW9jLojW';
const axiosInstance = axios.create({
  baseURL: api.TEST,
  headers: {
    // TOKEN: tmpToken,
    //'Access-Control-Allow-Origin': '*',
    //'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
   // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    //'Accept': '*/*'
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
