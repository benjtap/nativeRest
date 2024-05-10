import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from './navigations';
import GlobalProvider from './context/Provider';
import { View, LogBox } from "react-native";



const App = () => {
  LogBox.ignoreAllLogs();
  console.disableYellowBox = true;
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
};

export default App;