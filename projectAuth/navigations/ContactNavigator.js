

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import {
  CONTACT,
  LOGOUT,
  EDITCONTACTFILES,
  ADDCONTACTFILES

  //  ACTION3,
  // GROUPMEMBERS
} from '../constants/routeNames';
import React, { useState, useEffect } from 'react';
import { routes,screens } from '../constants/RouteItems';

import Contact from '../screens/Contact';
import updatecontactfiles from '../screens/updatecontactfiles';
// import Action1 from '../screens/action1';
 import addcontactfiles from '../screens/addcontactfiles';
// import GroupMembers from '../screens/GroupMembers';


import Logout from '../screens/Logout';

//const showtabdrawer =['ContactStack']
const showtabdrawer =['ContactStack']


const ContactNavigator = (props) => {
 

  const ContactStack = createNativeStackNavigator();
   const { navigation } = props;

   let navegState = navigation.getState();

  //  if (!!navegState)
  //   console.log('CURRENT SCREEN', navegState.routes[navegState.index].name);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
  
    //   routes.map((record) => (
    //        (showtabdrawer.indexOf(record.focusedRoute) >-1)
    //   && (record.showInTab===false)  ? record.showInDrawer =true :  record.showInDrawer =false
    // ))

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
      <ContactStack.Screen name={EDITCONTACTFILES} component={updatecontactfiles} />
      <ContactStack.Screen name={ADDCONTACTFILES} component={addcontactfiles} />
      {/* <ContactStack.Screen name={ACTION1} component={Action1} />
    
   
      <ContactStack.Screen name={GROUPMEMBERS} component={GroupMembers} />  */}
       <ContactStack.Screen name={LOGOUT} 
       component={Logout} 
       options={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: false,
        detachPreviousScreen: true,
      }}
       />  
    </ContactStack.Navigator>
  );
};
export default ContactNavigator;