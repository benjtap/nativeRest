import React from 'react';
//import {createStackNavigator} from '@react-navigation/stack';
//import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import {LOGIN, REGISTER} from '../constants/routeNames';
import Login from '../screens/SignInScreen.js';
import Register from '../screens/SignUp';

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator   screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={LOGIN} component={Login} />
      <AuthStack.Screen name={REGISTER} component={Register} /> 
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;