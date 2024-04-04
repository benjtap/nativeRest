import React from 'react'
import { View, Text } from 'react-native'
//import { createStackNavigator } from '@react-navigation/stack'

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import { screens } from '../RouteItems'

const Stack = createNativeStackNavigator()

const Book = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Book screen!</Text>
  </View>
)

const BookStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Book} component={Book} />
    </Stack.Navigator>
  )
}

export default BookStackNavigator
