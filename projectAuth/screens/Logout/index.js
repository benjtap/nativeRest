import React, {useContext, useEffect} from 'react';
import {ActivityIndicator,RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text} from 'react-native';
import logoutUser from '../../context/actions/logoutUser';
import {GlobalContext} from '../../context/Provider';

import {navigate} from '../../navigations/SideMenu/RootNavigator';

const Logout = (props) => {
  const { navigation } = props;
  const {authDispatch} = useContext(GlobalContext);
 
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  useEffect(() => {
    logoutUser()(authDispatch);
  
   
   
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text>Pull down to see RefreshControl indicator</Text>
    </ScrollView>
  </SafeAreaView>


  );
};
//<ActivityIndicator />
export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});