import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {navigationRef} from './SideMenu/RootNavigator';
import { useFonts } from "expo-font";

const AppNavContainer = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  const nav = () => navigationRef.current

  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = React.useState(false);
  
  const [fontsLoaded] = useFonts({
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
     DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
   })

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setAuthLoaded(true);

        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);

        setIsAuthenticated(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  // React.useEffect(() => {
  //   //SplashScreen.hide();
  // }, []);

  if(!fontsLoaded) {
    return(
       <ActivityIndicator size="large"/>

       
    );
  }


  return (
    <>
      {authLoaded ? (
        <NavigationContainer ref={navigationRef}>
          {isAuthenticated ? <DrawerNavigator nav={nav} /> : <AuthNavigator nav={nav} />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;