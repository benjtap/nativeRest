import React from 'react';

import {createNativeStackNavigator} from  '@react-navigation/native-stack'

import SignInScreen from './SignInScreen';


const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
       <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/> */}
    </RootStack.Navigator>
);

export default RootStackScreen;