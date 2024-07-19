import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from './navigations';
import GlobalProvider from './context/Provider';
//import { View, LogBox } from "react-native";
import { Text, View, StyleSheet, I18nManager, Platform ,LogBox} from 'react-native';
import Constants from 'expo-constants';

import * as Updates from 'expo-updates';


const App = () => {
  const shouldBeRTL = true;

  if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== 'web') {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    Updates.reloadAsync();
  }


  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
};

export default App;