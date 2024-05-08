import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import envs from '../config/env';
import {LOGOUT} from '../constants/routeNames';
import {navigate} from '../navigations/SideMenu/RootNavigator';




let headers = {};

 //'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
 //const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const axiosInstance = axios.create({
  baseURL: envs.BACKEND_URL,
  headers,
  });


//axiosInstance.defaults.headers.common["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8'


axiosInstance.interceptors.request.use(

  async (config) => {
    
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      console.log('test')
      resolve(response);
    }),
  (error) => {

    console.log(error.request)
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    //if (error.response.status !="" ) {
    //  console.log(error.response.status)
    if (error.response.status === 401) {
      navigate(LOGOUT, {tokenExpired: true});
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;