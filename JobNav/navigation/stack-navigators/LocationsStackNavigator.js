import React from 'react'
import { View, Text } from 'react-native'
//import { createStackNavigator } from '@react-navigation/stack'
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { screens } from '../RouteItems'

const Stack = createNativeStackNavigator()

const Locations = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Locations screen!</Text>
  </View>
)

const LocationsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Locations} component={Locations} />
    </Stack.Navigator>
  )
}

export default LocationsStackNavigator
