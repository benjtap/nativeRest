import React from 'react'
import { View, Text } from 'react-native'
//import { createStackNavigator } from '@react-navigation/stack'
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { screens } from '../RouteItems'

const Stack = createNativeStackNavigator()

const MyRewards = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>MyRewards screen!</Text>
  </View>
)

const MyRewardsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.MyRewards} component={MyRewards} />
    </Stack.Navigator>
  )
}

export default MyRewardsStackNavigator
