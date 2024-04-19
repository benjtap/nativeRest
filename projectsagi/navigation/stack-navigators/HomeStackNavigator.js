//import React from 'react'
// import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { routes,screens } from '../RouteItems'

import { COLORS, icons, images, SIZES } from "../constants";
import {  Contact,Action1,Action3,GroupMembers } from "../componentsagi";






const Stack = createNativeStackNavigator()  //,'BookStack'
const showtabdrawer =['HomeStack']//,'BookStack'


const HomeStackNavigator = (props) => {

  const { navigation } = props;


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    routes.map((record) => (
      (showtabdrawer.indexOf(record.focusedRoute) >-1)
      && (record.showInTab===false)  ? record.showInDrawer =true :  record.showInDrawer =false
    ))
  //Douvle code


    return unsubscribe;
  });
  
  }, [navigation]);
   
  



  const Stack = createNativeStackNavigator()
    
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Contact} component={Contact} 
       />
         <Stack.Screen name={screens.Action3} component={Action3} 
     />
 <Stack.Screen name={screens.Action1} component={Action1} 
     />
    
     


<Stack.Screen name={screens.GroupMembers} component={GroupMembers} 
      />
   
   
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
// router.back()