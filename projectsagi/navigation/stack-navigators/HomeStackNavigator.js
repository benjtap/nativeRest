import React from 'react'
import { View, Text } from 'react-native'

import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { routes,screens } from '../RouteItems'

import { COLORS, icons, images, SIZES } from "../constants";
import {  Home,ScreenHeaderBtn,Test1,Test2,Test3,GroupMembers } from "../componentsagi";

 //,JobDetails,ScreenHeaderBtn,




const Stack = createNativeStackNavigator()
const showtabdrawer =['HomeStack','BookStack']



// for(var p in routes){
//       var pitem =routes[p]

//       if (showtabdrawer.indexOf(pitem.focusedRoute) >-1)
//          {
//           pitem.showInDrawer =true;
          
//          }
//         else
//         {
//           pitem.showInDrawer =false;
         
//         }
        
// }



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
 <Stack.Screen name={screens.Test1} component={Test1} 
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
      <Stack.Screen name={screens.Test2} component={Test2} 
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
       <Stack.Screen name={screens.Test3} component={Test3} 
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

<Stack.Screen name={screens.GroupMembers} component={GroupMembers} 
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
   
      {/* <Stack.Screen name={screens.Details} component={JobDetails} 
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
   
      
      /> */}
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
// router.back()