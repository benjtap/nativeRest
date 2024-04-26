import React from 'react';

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import {
  CONTACT,
  LOGOUT,
   ACTION1,
   ACTION3,
  GROUPMEMBERS
} from '../constants/routeNames';

import { routes,screens } from '../constants/routeNames';

import Contact from '../screens/Contact';

import Action1 from '../screens/action1';
import Action3 from '../screens/action3';

import GroupMembers from '../screens/GroupMembers';


import Logout from '../screens/Logout';
const ContactNavigator = (props) => {
  const ContactStack = createNativeStackNavigator();
  return (
  

    <ContactStack.Navigator initialRouteName={CONTACT} screenOptions={{
      headerShown: false,
    }}>
      <ContactStack.Screen name={CONTACT} component={Contact} />
      <ContactStack.Screen name={ACTION1} component={Action1} />
    <ContactStack.Screen name={ACTION3} component={Action3} />
   
      <ContactStack.Screen name={GROUPMEMBERS} component={GroupMembers} /> 
      <ContactStack.Screen name={LOGOUT} component={Logout} />
    </ContactStack.Navigator>
  );
};
export default ContactNavigator;