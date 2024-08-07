import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GlobalContext} from '../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator,StyleSheet,View,Text} from 'react-native';
import {navigationRef} from './SideMenu/RootNavigator';
import { useFonts } from "expo-font";
// import Login from '../screens/SignInScreen.js';
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import * as Linking from 'expo-linking';


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
 
  const prefix = Linking.createURL("/");
 
  const config = {
    screens: {
      AuthStack: {
        screens: {
          LOGIN: 'LOGIN',
        },
      }
    }
  };

  const linking = {
    prefixes: [prefix],
    config:config
  };
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

   function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);
    newDate = newDate.getTime();
    return newDate;  
    };
  
  const getUser = async () => {
    try {
      const user =await AsyncStorage.getItem('token');
      //await AsyncStorage.removeItem('token');
      const start = Date.now();
      if (user) {
        setAuthLoaded(true);

        setIsAuthenticated(true);

        console.log('setIsAuthenticated=true ' +start)
      } else {
        setAuthLoaded(true);

        setIsAuthenticated(false);
        
        console.log('setIsAuthenticated=false ' +start)
      }
    } catch (error) {
      console.log('setIsAuthenticated='+error + ' '+start)

    }
  };
  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  useEffect(() => {
   
    if (isAuthenticated) {
      waitFor.current.resolve?.(null);
    }
  }, [isAuthenticated]);

  if(!fontsLoaded) {
    return(
       <ActivityIndicator size="large"/>

       
    );
  }
 
 
  const Stack = createNativeStackNavigator();
  //
  return (
    <>
      {authLoaded ? (
        <NavigationContainer  ref={navigationRef} linking={linking}>
          {isAuthenticated ?<DrawerNavigator  nav={nav}   />
          : <AuthNavigator nav={nav}        
          />
          }
        
              
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )
    }

        

     



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

 // const Help = () =>{
  //    return (
  //    <View><Text>Help</Text></View>
  //    )
  // }

  //navigationKey={currentUserId}