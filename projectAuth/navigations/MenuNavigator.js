import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import {
 MENUSAPP,
  LOGOUT,
  EDITMENUFILES,
  ADDMENUFILES
   
} from '../constants/routeNames';

import React, { useState, useEffect } from 'react';
import { routes,screens } from '../constants/RouteItems';
import Updatemenu from '../screens/Updatemenu';
// import Action1 from '../screens/action1';
 import Addmenu from '../screens/Addmenu';

//import MenuApp from '../screens/MenuApp';

import MenuApp from '../screens/Menu';


import Logout from '../screens/Logout';

const showtabdrawer =['MenuStack']

const MenuNavigator = (props) => {

  const MenuStack = createNativeStackNavigator();
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

    <MenuStack.Navigator   screenOptions={{
      headerShown: false,
    }}>
      <MenuStack.Screen name={MENUSAPP} component={MenuApp} />
      <MenuStack.Screen name={EDITMENUFILES} component={Updatemenu} />
      <MenuStack.Screen name={ADDMENUFILES} component={Addmenu} />

       <MenuStack.Screen name={LOGOUT} 
       component={Logout} 
       options={{
        headerShown: false,
        animationEnabled: false,
        gestureEnabled: false,
        detachPreviousScreen: true,
      }}
       />  
    </MenuStack.Navigator>
  );
};
export default MenuNavigator;