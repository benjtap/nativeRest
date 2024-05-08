import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator,StyleSheet,View} from 'react-native';
import {navigationRef} from './SideMenu/RootNavigator';
import { useFonts } from "expo-font";

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}

const HelpScreen = () => { 

  return (
    <View style={[styles.container, styles.horizontal]}>
    <Text> שלום וברכב</Text>
    <ActivityIndicator size="large" />
  </View> );
  


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
  //ref={(x) => (global.stackNavigator = x)}

  const CommonStack = createNativeStackNavigator();
  //
  return (
    <>
      {authLoaded ? (
        <NavigationContainer  ref={navigationRef}>
          {isAuthenticated ?<DrawerNavigator nav={nav}   />
          : <AuthNavigator nav={nav}        
          />
          }

        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});