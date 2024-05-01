import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {navigationRef} from './SideMenu/RootNavigator';
import { useFonts } from "expo-font";
import * as Linking from 'expo-linking';

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}

const AppNavContainer = () => {
  const waitFor = React.useRef(new Deferred());

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

  useEffect(() => {
    // something like `isAuthenticated `
    if (isAuthenticated) {
      waitFor.current.resolve?.(null);
    }
  }, [isAuthenticated]);

  if(!fontsLoaded) {
    return(
       <ActivityIndicator size="large"/>

       
    );
  }
 
  return (
    <>
      {authLoaded ? (
        <NavigationContainer  ref={navigationRef}
        linking={{
          async getInitialURL() {
            const url = await Linking.getInitialURL();
            if (url == null) {
              return null;
            }
            // Ensures that "fallback" is rendered until the promise has been resolved
            await waitFor.current.promise;
            // react-navigation will handle the deep link now, after your own condition resolved
            // which ensures that the corresponding navigation screens/navigators exists and are rendered below
            return url;
          }
          // ,prefixes: [ ... ],
           ,config: {
            screens: {
              LOGIN: 'LOGIN',
            }
            }
        }}
        
        
        >
          {isAuthenticated ? <DrawerNavigator nav={nav}


          onUnhandledAction={() => {
            console.log("Using Fallback", "ddd")
          }}
          
          /> : <AuthNavigator nav={nav}  
          
          onUnhandledAction={() => {
            console.log("Using Fallback", "eee")
             }} 
          
          />}

         
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;