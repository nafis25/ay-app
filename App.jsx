// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext';
import {PortalProvider} from './src/contexts/PortalContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/navigation/Routes';
import Toast from 'react-native-toast-message';

import {QueryClient, QueryClientProvider} from 'react-query';

function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthProvider>
            <PortalProvider>
              <Routes />
            </PortalProvider>
          </AuthProvider>
        </NavigationContainer>
      </QueryClientProvider>
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
