import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from './navigations';
import GlobalProvider from './context/Provider';

const App = () => {
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
};

export default App;