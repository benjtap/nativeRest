
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInstance';

export default ({password, userName: username}) => (dispatch) => {
 
  dispatch({
    type: LOGIN_LOADING,
  });
  axiosInstance
    .post('Auth/login', {
      password,
      username,
    })
    .then((res) => {
      // const storageExpirationTimeInMinutes = 200;

      // const now = new Date();
      // now.setMinutes(now.getMinutes() + storageExpirationTimeInMinutes); // add the expiration time to the current Date time
      // const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000); // convert the expiry time in UNIX timestamp

      // const data = {
      //   token: res.data.accessToken, 
      //   expiryTime: expiryTimeInTimestamp
      // };

      AsyncStorage.setItem('token', res.data.accessToken);
     
     // AsyncStorage.setItem('token',  JSON.stringify(data));
     
      AsyncStorage.setItem('user', JSON.stringify(res.data.accessToken));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
       
      });
    })
    .catch((err) => {
       dispatch({
        type: LOGIN_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try agin'},
      });
    });
};
