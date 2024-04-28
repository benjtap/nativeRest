import React, {useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import logoutUser from '../../context/actions/logoutUser';
import {GlobalContext} from '../../context/Provider';
//import {LOGIN} from '../../constants/routeNames';
//import {navigate} from '../../navigations/SideMenu/RootNavigator';

const Logout = (props) => {
  const { navigation } = props;
  const {authDispatch} = useContext(GlobalContext);

  useEffect(() => {
    logoutUser()(authDispatch);
    //navigate(LOGIN)
    navigation.navigate('SignInScreen')
  }, []);

  return <ActivityIndicator />;
};

export default Logout;