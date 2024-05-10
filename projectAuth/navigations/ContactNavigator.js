

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import {
  CONTACT,
  LOGOUT,
   ACTION1,
   ACTION3,
  GROUPMEMBERS
} from '../constants/routeNames';
import React, { useState, useEffect } from 'react';
import { routes,screens } from '../constants/RouteItems';

import Contact from '../screens/Contact';

import Action1 from '../screens/action1';
import Action3 from '../screens/action3';

import GroupMembers from '../screens/GroupMembers';


import Logout from '../screens/Logout';

const showtabdrawer =['ContactStack']

const ContactNavigator = (props) => {

  const ContactStack = createNativeStackNavigator();
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

    <ContactStack.Navigator   screenOptions={{
      headerShown: false,
    }}>
      <ContactStack.Screen name={CONTACT} component={Contact} />
      <ContactStack.Screen name={ACTION1} component={Action1} />
    <ContactStack.Screen name={ACTION3} component={Action3} />
   
      <ContactStack.Screen name={GROUPMEMBERS} component={GroupMembers} /> 
      <ContactStack.Screen name={LOGOUT} component={Logout} />
    </ContactStack.Navigator>
  );
};
export default ContactNavigator;