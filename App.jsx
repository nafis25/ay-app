// In App.js in a new project

import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <SafeAreaProvider>
      <Routes />
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
