import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { IconButton, MD3Colors } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

 import HomeScreen from './HomeScreen';
 //import DetailsScreen from './DetailsScreen';

 

const HomeStack = createNativeStackNavigator();
//const DetailsStack = createNativeStackNavigator();


const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Overview',
        headerLeft: () => (
          <IconButton
          icon="menu"
          iconColor={MD3Colors.primary10}
          size={20}
          onPress={() => navigation.openDrawer()}
        />
          
        )
        }} />
</HomeStack.Navigator>
);

// const DetailsStackScreen = ({navigation}) => (
// <DetailsStack.Navigator screenOptions={{
//         headerStyle: {
//         backgroundColor: '#1f65ff',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//         fontWeight: 'bold'
//         }
//     }}>
//         <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
//         headerLeft: () => (
//           <IconButton
//           icon="menu"
//           iconColor={MD3Colors.primary30}
//           size={20}
//           onPress={() => navigation.openDrawer()}
//         />
         
//         )
//         }} />
// </DetailsStack.Navigator>
// );



function MainTabScreen() {
  const Tab = createBottomTabNavigator();
  
  return (
    <Tab.Navigator     
    >
   
      <Tab.Screen name="Home"
       component={HomeStackScreen}
       />
      {/* <Tab.Screen name="Details"
       component={DetailsStackScreen} /> */}
    </Tab.Navigator>
  );
}



export default MainTabScreen;
  