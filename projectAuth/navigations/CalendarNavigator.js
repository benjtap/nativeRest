import React, { useState, useEffect } from 'react';

import {createNativeStackNavigator} from  '@react-navigation/native-stack'



import { routes,screens } from '../constants/RouteItems';

 import Calendar from '../screens/Calendar';
 import Planning from '../screens/Planning';

import Logout from '../screens/Logout';
import {
  LOGOUT
  
} from '../constants/routeNames';
const showtabdrawer =['CalendarStack']

const CalendarNavigator = (props) => {
  const { navigation } = props;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    routes.map((record) => (
      (showtabdrawer.indexOf(record.focusedRoute) >-1)
      && (record.showInTab===false)   ? record.showInDrawer =true :  record.showInDrawer =false
    ))

    //Douvle code

    return unsubscribe;
  });
  }, [navigation]);
   

  const CalendarStack = createNativeStackNavigator();
  return (
      <CalendarStack.Navigator  initialRouteName={screens.Calendar}   screenOptions={{
      headerShown: false,
    }}>
      <CalendarStack.Screen name={screens.Calendar} component={Calendar} />
      <CalendarStack.Screen name={screens.Planning} component={Planning} />
     <CalendarStack.Screen name={LOGOUT} component={Logout} /> 
    </CalendarStack.Navigator>
  );
};
export default CalendarNavigator;