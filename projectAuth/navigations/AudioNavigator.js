import React, { useState, useEffect } from 'react';

import {createNativeStackNavigator} from  '@react-navigation/native-stack'


import {
  AUDIO,
  ACTION4,
  AUDIODETAILS,
  AUDIOGROUPMEMBERS,
  LOGOUT
  
} from '../constants/routeNames';

import { routes,screens } from '../constants/RouteItems';

import Audio from '../screens/Audio';
import Action4 from '../screens/action4';
import Audiodetails from '../screens/Audiodetails';
import AudioGroupMembers from '../screens/AudioGroupMembers';

import Logout from '../screens/Logout';

const showtabdrawer =['AudioStack']

const AudioNavigator = (props) => {
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
   

  const AudioStack = createNativeStackNavigator();
  return (
      <AudioStack.Navigator  initialRouteName={AUDIO} screenOptions={{
      headerShown: false,
    }}>
      <AudioStack.Screen name={screens.Audio} component={Audio} />
      <AudioStack.Screen name={screens.ACTION4} component={Action4} />
       <AudioStack.Screen name={screens.Audiodetails} component={Audiodetails} />
   
      <AudioStack.Screen name={screens.AudioGroupMembers} component={AudioGroupMembers} />  
     <AudioStack.Screen name={LOGOUT} component={Logout} /> 
    </AudioStack.Navigator>
  );
};
export default AudioNavigator;