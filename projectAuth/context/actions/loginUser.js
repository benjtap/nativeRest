
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
     
      AsyncStorage.setItem('token', res.data.accessToken);
      AsyncStorage.setItem('user', JSON.stringify(res.data.accessToken));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
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
