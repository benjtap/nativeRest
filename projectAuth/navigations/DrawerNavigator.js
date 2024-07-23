
import {GlobalContext} from '../context/Provider';
import * as React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'

import BottomTabNavigator from './BottomTabNavigator'
import {
  routes, screens
} from '../constants/RouteItems';





const CustomDrawerContent = (props) => {
  const currentRouteName = props.nav()?.getCurrentRoute()?.name
 
 if (currentRouteName ==='Contacts' ||currentRouteName ==='Application' ||currentRouteName ==='MENUSAPP' ||currentRouteName ==='Audio')
    return (
    <DrawerContentScrollView {...props}>
      {
        routes.filter(route => route.showInDrawer).map((route) => {
          const focusedRoute = routes.find(r => r.name === currentRouteName)
          const focused = focusedRoute ?
            route.name === focusedRoute?.focusedRoute :
            route.name === screens.HomeStack
          return (
            <DrawerItem
              key={route.name}
              label={() => (
                <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                  {route.title}
                </Text>
              )}
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.drawerItem, focused ? styles.drawerItemFocused : null]}
            />
          )
        })
      }
    </DrawerContentScrollView>
  )
  else
 <DrawerContentScrollView {...props}>
      {
        routes.filter(route => route.showInDrawer).map((route) => {
          const focusedRoute = routes.find(r => r.name === currentRouteName)
          const focused = focusedRoute ?
            route.name === focusedRoute?.focusedRoute :
            route.name === screens.HomeStack
          return (
            <DrawerItem
              key={route.name}
              label={() => (
                <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                  {route.title}
                </Text>
              )}
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.drawerItem, focused ? styles.drawerItemFocused : null]}
            />
          )
        })
      }
    </DrawerContentScrollView>

}



const DrawerNavigator = ({ nav }) => {
  
  const screenOptions = React.useCallback(({navigation})=>{

    return {
        headerStyle: {
         backgroundColor: '#fff',
         height: 60,
         shadowColor: "#CCC",
         shadowOffset: {
           width: 0,
           height: 5,
         },
         shadowOpacity: 0.36,
         shadowRadius: 6.68,
         elevation: 8,
        },
           drawerStyle: {
            width: 200,
            height:300,
             right: 200,
             top:70,
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            overflow: 'hidden',
            background: 'transparent'
          },
          drawerPosition: 'right',
          drawerContentStyle:{
           flexDirection:"column-reverse"
         },
        headerTitle: () => <Image source={require('../assets/favicon.png')} />,
        headerTintColor: '#404040',
         headerRight: () => (
          <TouchableOpacity onPress={() =>  {
            if (1===1)
              navigation.toggleDrawer()
           }} style={styles.headerLeft}>
            <Icon name="bars" size={20} color="#eee" />
          </TouchableOpacity>
        ),
          
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    }
}, [])

 
  const Drawer = createDrawerNavigator();
  const {authDispatch} = React.useContext(GlobalContext);
  
  return (
    <Drawer.Navigator
    screenOptions={screenOptions}
    
      // screenOptions={({ navigation }) => ({
      //   headerStyle: {
      //     backgroundColor: '#AAAAEE',
      //     height: 50,
      //   },
   
      //   drawerStyle: {
      //       width: 200,
      //       height:300,
      //        right: 200,
      //        top:70,
      //       backgroundColor: '#fff',
      //       borderTopRightRadius: 20,
      //       borderTopLeftRadius: 20,
      //       borderBottomRightRadius: 20,
      //       borderBottomLeftRadius: 20,
      //       overflow: 'hidden',
      //       background: 'transparent'
      //     },
      //     drawerPosition: 'right',
      //     drawerContentStyle:{
      //      flexDirection:"column-reverse"
      //    },
        
         
      //     // 
      //   headerRight: () => (
      //     <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
      //       <Icon name="bars" size={20} color="#eee" />
      //     </TouchableOpacity>
      //   ),
      // })}
      
      drawerContent={(props) => <CustomDrawerContent {...props} nav={nav}
         authDispatch={authDispatch} />} >
    
   
    <Drawer.Screen name={screens.AppTab} component={BottomTabNavigator} options={{
       headerTitle: () => <Image source={require('../assets/favicon.png')} />,
      
      }}/>
   
      {/* <Drawer.Screen name={screens.ContactTab} component={BottomTabNavigator} options={{
        // title: 'Home',
        headerTitle: () => <Image source={require('../assets/favicon.png')} />,
      
      }}/> */}
      
    </Drawer.Navigator>
  )
  
  
   


}


 
// return (
//   <Drawer.Navigator

  
  
//     screenOptions={({ navigation }) => ({
//       headerStyle: {
//         backgroundColor: '#AAAAEE',
//         height: 50,
//       },
 
//       drawerStyle: {
//           width: 200,
//           height:300,
//            right: 200,
//            top:70,
//           backgroundColor: '#fff',
//           borderTopRightRadius: 20,
//           borderTopLeftRadius: 20,
//           borderBottomRightRadius: 20,
//           borderBottomLeftRadius: 20,
//           overflow: 'hidden',
//           background: 'transparent'
//         },
//         drawerPosition: 'right',
//         drawerContentStyle:{
//          flexDirection:"column-reverse"
//        },
      
       
//         // 
//       headerRight: () => (
//         <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
//           <Icon name="bars" size={20} color="#eee" />
//         </TouchableOpacity>
//       ),
//     })}
    
//     drawerContent={(props) => <CustomDrawerContent {...props} nav={nav}
//       authDispatch={authDispatch} />} >
  
 
 
 
//     <Drawer.Screen name={screens.ContactTab} component={BottomTabNavigator} options={{
//       // title: 'Home',
//       headerTitle: () => <Image source={require('../assets/favicon.png')} />,
    
//     }}/>
    
//   </Drawer.Navigator>
// )




const styles = StyleSheet.create({
  headerLeft: {
    // marginLeft: 15,
    marginRight: 25,
    color: 'black',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
})

export default DrawerNavigator


