
import React from 'react'

import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { screens } from '../RouteItems'
// import { useNavigation } from '@react-navigation/native';

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Home,JobDetails,ScreenHeaderBtn,
 } from "../components";
 import { 
  View,
  Text,Button
} from 'react-native';




const HomeStackNavigator = () => {

 
  const Stack = createNativeStackNavigator()
    
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Home} component={Home} 
      
      options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
        ),
        headerTitle: "",
      }}
      
      />
      <Stack.Screen name={screens.Details} component={JobDetails} 
      options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn
            iconUrl={icons.left}
            dimension='60%'
            handlePress={() => alert('toto')}
          />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
        ),
        headerTitle: "",
      }}
      
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
// router.back()