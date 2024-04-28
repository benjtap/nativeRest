//import * as React from 'react'
import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, StyleSheet, View } from 'react-native'

import ContactStackNavigator from './ContactNavigator'
import AudioStackNavigator from './AudioNavigator'




import {
  routes, screens
} from '../constants/RouteItems';

const Tab = createBottomTabNavigator()

const tabOptions = ({ route }) => {
  const item = routes.find(routeItem => routeItem.name === route.name)
  
 
  if (!item.showInTab) {
    return {
      tabBarButton: () => <View style={{ width: 0 }} />,
      headerShown: false,
      tabBarStyle: styles.tabContainer,
      title: item.title,
    }
  }

  return {
    tabBarIcon: ({ focused }) => item.icon(focused),
    tabBarLabel: () => (
      <Text style={styles.tabBarLabel}>{item.title || ''}</Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabContainer,
    title: item.title,
  }
}



const BottomTabNavigator = () => {

  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name={screens.ContactStack}  component={ContactStackNavigator}
      />
    <Tab.Screen name={screens.AudioStack} component={AudioStackNavigator}
      />  
    
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: 12,
  },
  tabContainer: {
    height: 60,
  }
})

export default BottomTabNavigator
