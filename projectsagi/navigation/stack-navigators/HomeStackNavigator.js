import React from 'react'
import { View, Text } from 'react-native'

import {createNativeStackNavigator} from  '@react-navigation/native-stack'
import { routes,screens } from '../RouteItems'

import { COLORS, icons, images, SIZES } from "../constants";
import {  Contact,Action1,Action2,Action3,GroupMembers } from "../componentsagi";






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
      <Stack.Screen name={screens.Contact} component={Contact} 
       />
 <Stack.Screen name={screens.Action1} component={Action1} 
     />
      <Stack.Screen name={screens.Action2} component={Action2} 
      />
       <Stack.Screen name={screens.Action3} component={Action3} 
     />


<Stack.Screen name={screens.GroupMembers} component={GroupMembers} 
      />
   
   
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
// router.back()