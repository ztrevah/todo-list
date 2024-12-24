import axios from 'axios'
import { logout } from '../services/auth';
import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

const request = axios.create({
  withCredentials: false,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token") || "";
    let user_id = "";
    if(token) {
      try {
        const userInfo = JSON.parse(CryptoJS.AES.decrypt(token, SECRET_KEY).toString(CryptoJS.enc.Utf8));
        user_id = userInfo.id || "";
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
    return {
      ...req,
      url: req.url.replace(":user_id", user_id),
    };
  },
  (error) => {
    return Promise.reject(error);
  }
)

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response) {
      console.error('Error status', error.response.status)
      console.error('Error data', error.response.data)
      if(Math.floor(error.response.status / 100) === 4) {
        if(!error.config.url?.endsWith("tasks")){
          logout();
          window.location.href = '/signin';
        }
      }
    } else if (error.request) {
      console.error('No response received', error.request)
    } else {
      console.error('Request error', error.message)
    }
    return Promise.reject(error)
  }
)

export default request
