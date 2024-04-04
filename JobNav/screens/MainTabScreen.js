import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { IconButton, MD3Colors } from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

 import HomeScreen from './HomeScreen';
 import DetailsScreen from './DetailsScreen';

 // import ExploreScreen from './ExploreScreen';
// import ProfileScreen from './ProfileScreen';

// const HomeStack = createNativeStackNavigator();
// const DetailsStack = createNativeStackNavigator();

// const Tab = createMaterialBottomTabNavigator();

// const MainTabScreen = () => (
    

// <Tab.Navigator
//       initialRouteName="Home"
//       activeColor="#e91e63"
//       barStyle={{ backgroundColor: 'tomato' }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeStackScreen}
//         options={{
//           tabBarLabel: 'Updates',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="home" color={color} size={26} />
//           )
//         }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={DetailsStackScreen}
//         options={{
//           tabBarLabel: 'Updates',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="bell" color={color} size={26} />
//           )
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="account" color={color} size={26} />
//           )
//         }}
//       />
//       <Tab.Screen
//         name="Explore"
//         component={ExploreScreen}
//         options={{
//           tabBarLabel: 'Explore',
//           tabBarColor: '#d02860',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="account" color={color} size={26} />
//           )
//         }}
//       />

//     </Tab.Navigator>


      
   

     
      
      
    
// );

// export default MainTabScreen;

// const HomeStackScreen = ({navigation}) => (
// <HomeStack.Navigator screenOptions={{
//         headerStyle: {
//         backgroundColor: '#009387',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//         fontWeight: 'bold'
//         }
//     }}>
//         <HomeStack.Screen name="Home" component={HomeScreen} options={{
//         title:'Overview',
//         headerLeft: () => (
//           <IconButton
//           icon="menu"
//           iconColor={MD3Colors.primary10}
//           size={20}
//           onPress={() => navigation.openDrawer()}
//         />
//           // <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//         }} />
// </HomeStack.Navigator>
// );

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
          
//           // <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//         }} />
// </DetailsStack.Navigator>
// );


/////////////////////////////////////////////////////////////////////////////////////////////////

//const Stack1 = createNativeStackNavigator();
//const Stack2 = createNativeStackNavigator();


const HomeStack = createNativeStackNavigator();
const DetailsStack = createNativeStackNavigator();


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

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
        headerLeft: () => (
          <IconButton
          icon="menu"
          iconColor={MD3Colors.primary30}
          size={20}
          onPress={() => navigation.openDrawer()}
        />
         
        )
        }} />
</DetailsStack.Navigator>
);


function Screen1() {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Nested')}>
      <Text>Go to nested screen</Text>
    </TouchableOpacity>
  );
}

function NestedScreen() {
  return (
    <Text>This is the nested screen</Text>
  );
}

function Screen2() {
  return (
    <Text>This is screen 2</Text>
  );
}

function MainTabScreen() {
  const Tab = createBottomTabNavigator();
  
  return (
    <Tab.Navigator     
    >
   
      <Tab.Screen name="Home"
       component={HomeStackScreen}
       />
      <Tab.Screen name="Details"
       component={DetailsStackScreen} />
    </Tab.Navigator>
  );
}



export default MainTabScreen;
  