// @flow

import 'react-native-gesture-handler';
import React, {useEffect,createRef } from 'react'; 
import {NavigationContainer} from '@react-navigation/native';
import { 
  View,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';

//172.23.208.1
import DrawerNavigator from './navigation/DrawerNavigator'

import { useFonts } from "expo-font";


// const client = new ApolloClient({
//   uri: 'http://localhost/graphql',
//   cache: new InMemoryCache()
// });

// import { 
//   Provider as PaperProvider, 
//   DefaultTheme as PaperDefaultTheme,
//   DarkTheme as PaperDarkTheme 
// } from 'react-native-paper';


// import { ApolloProvider } from 'react-apollo-hooks';



import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

//const Drawer = createDrawerNavigator();
const navigationRef = createRef()
const nav = () => navigationRef.current

const App = () => {
  

  const [fontsLoaded] = useFonts({
   DMMedium: require('./assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('./assets/fonts/DMSans-Regular.ttf'),
  })

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };



  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
     
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
    
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
     
    }
   
  }), []);

  useEffect(() => {
    setTimeout(async() => {
     
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
     
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
   

<AuthContext.Provider value={authContext}>
    {/* <AuthContext.Provider value={authContext}> */}
    {/* <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer ref={navigationRef}>
            <DrawerNavigator nav={nav} />
        </NavigationContainer>
      </SafeAreaView> */}
   
      { loginState.userToken !== null ? (
       
      
      
      <SafeAreaView style={styles.safeArea}>
        
       <StatusBar barStyle="dark-content" />
        <NavigationContainer ref={navigationRef}>
            <DrawerNavigator nav={nav} />
        </NavigationContainer>
        {/* <Home /> */}
      
      </SafeAreaView>

        )
    :
    <NavigationContainer>
      <RootStackScreen/>
      </NavigationContainer>
    } 
    
    {/* </AuthContext.Provider> */}
    </AuthContext.Provider>
   
  );
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})
