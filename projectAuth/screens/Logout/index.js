import React, {useContext, useEffect} from 'react';
import {ActivityIndicator,RefreshControl,
  SafeAreaView,
  View,
  StyleSheet,
  Text,} from 'react-native';
import logoutUser from '../../context/actions/logoutUser';
import {GlobalContext} from '../../context/Provider';
import { CommonActions } from '@react-navigation/native';
import { Link } from "expo-router";


//import {navigate} from '../../navigations/SideMenu/RootNavigator';

const Logout = (props) => {
  const { navigation } = props;
  const {authDispatch} = useContext(GlobalContext);
 



  useEffect(() => {
    
      logoutUser()(authDispatch)

     // navigation.dispatch(CommonActions.navigate("LOGINSTACK",{screen :"LOGIN"}));

      
          
  
      // navigation.dispatch(CommonActions.navigate("Help"));

  }, [navigation]);

  return (
    <View style={styles.View}>
    <Link href="/LOGIN">App</Link>
  </View>


  );
};
//<ActivityIndicator />
export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});