import React from 'react'
import { View, Text } from 'react-native'
//import { createStackNavigator } from '@react-navigation/stack'

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import { screens } from '../RouteItems'
import {  Audio,Audiodetails,AudioGroupMembers,Action4 } from "../componentsagi";
const Stack = createNativeStackNavigator()



const BookStackNavigator = () => {
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
