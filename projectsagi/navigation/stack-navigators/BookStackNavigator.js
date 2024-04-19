//import React from 'react'
//import { View, Text } from 'react-native'
//import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react';
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { routes,screens } from '../RouteItems'
//import { screens } from '../RouteItems'
import {  Audio,Audiodetails,AudioGroupMembers,Action4 } from "../componentsagi";
const Stack = createNativeStackNavigator()

const showtabdrawer =['BookStack']//,'BookStack'




const BookStackNavigator = (props) => {


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
   

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Audio} component={Audio} />
      <Stack.Screen name={screens.Audiodetails} component={Audiodetails} />
      <Stack.Screen name={screens.AudioGroupMembers} component={AudioGroupMembers} />
      <Stack.Screen name={screens.Action4} component={Action4} />
      
      
    </Stack.Navigator>
  )
}

export default BookStackNavigator
