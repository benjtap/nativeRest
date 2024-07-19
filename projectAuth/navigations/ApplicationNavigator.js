

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import {
 TASKSAPP,
  APP,
  LOGOUT,
   
} from '../constants/routeNames';
import React, { useState, useEffect } from 'react';
import { routes,screens } from '../constants/RouteItems';

import Application from '../screens/Application';

// import Action1 from '../screens/action1';
// import Action3 from '../screens/action3';
 import Tasksapp from '../screens/Tasksapp';


import Logout from '../screens/Logout';

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
      <AppStack.Screen name={TASKSAPP} component={Tasksapp} />
      {/* <ContactStack.Screen name={ACTION1} component={Action1} />
    <ContactStack.Screen name={ACTION3} component={Action3} />
   
        */}
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