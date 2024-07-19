import React, {useContext, useEffect} from 'react';
import {ActivityIndicator,RefreshControl,
  SafeAreaView,
  View,
  StyleSheet,
  Text,} from 'react-native';
import logoutUser from '../../context/actions/logoutUser';
import {GlobalContext} from '../../context/Provider';
import {navigate} from '../../navigations/SideMenu/RootNavigator';




const Logout = (props) => {
  const { navigation } = props;
  const {authDispatch} = useContext(GlobalContext);
 


  useEffect(() => {
    
    //await AsyncStorage.removeItem('token');
    //await AsyncStorage.removeItem('user');
       logoutUser()(authDispatch)
      // navigate('LOGIN') 
       
  }, []);

  return (
    <View style={styles.View}>
    {/* <Redirect href="/LOGIN">App</Redirect> */}
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