// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext';
import {PortalProvider} from './src/contexts/PortalContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <PortalProvider>
            <Routes />
          </PortalProvider>
        </AuthProvider>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
