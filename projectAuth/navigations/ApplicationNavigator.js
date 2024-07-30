

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import {
 TASKSAPP,
  APP,
  LOGOUT,
  ADDAPP
   
} from '../constants/routeNames';

import React, { useState, useEffect } from 'react';
import { routes,screens } from '../constants/RouteItems';

import Application from '../screens/Application';

//  import Action1 from '../screens/action1';

 import Tasksapp from '../screens/Tasksapp';


import Logout from '../screens/Logout';
import Addapp from '../screens/Addapp';

const showtabdrawer =['AppStack']

const ApplicationNavigator = (props) => {

  const AppStack = createNativeStackNavigator();
   const { navigation } = props;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    routes.map((record) => (
      (showtabdrawer.indexOf(record.focusedRoute) >-1)
      && (record.showInTab===false)  ? record.showInDrawer =true :  record.showInDrawer =false
    ))
 
    return unsubscribe;
  });
  
  }, [navigation]);


  return (
    //initialRouteName={CONTACT}

    <AppStack.Navigator   screenOptions={{
      headerShown: false,
    }}>
      <AppStack.Screen name={APP} component={Application} />
      <AppStack.Screen name={ADDAPP} component={Addapp} />
      <AppStack.Screen name={TASKSAPP} component={Tasksapp} />
       <AppStack.Screen name={LOGOUT} 
       component={Logout} 
       options={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: false,
        detachPreviousScreen: true,
      }}
       />  
    </AppStack.Navigator>
  );
};
export default ApplicationNavigator;