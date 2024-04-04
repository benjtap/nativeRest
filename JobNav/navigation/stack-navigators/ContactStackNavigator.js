import React from 'react'
import { View, Text } from 'react-native'
//import { createStackNavigator } from '@react-navigation/stack'
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { screens } from '../RouteItems'

const Stack = createNativeStackNavigator()

const Contact = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Contact screen!</Text>
  </View>
)

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Contact} component={Contact} />
    </Stack.Navigator>
  )
}

export default ContactStackNavigator
