import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGOUT_USER} from '../../constants/actionTypes';
import { Redirect,router } from "expo-router";
import { useRootNavigationState } from 'expo-router'

export default () =>  async(dispatch) => {
  await  AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
  
 
   dispatch({
    type: LOGOUT_USER,
  });

  //router.replace('/LOGIN')
    
};