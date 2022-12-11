import {useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import PortalStack from './PortalStack';
import AuthStack from './AuthStack';
import {ActivityIndicator, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {isLoggedIn, authLoading, checkAuth, isSignout} =
    useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (authLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{animationTypeForReplace: isSignout ? 'pop' : 'push'}}
        />
      ) : (
        <Stack.Screen name="Portal" component={PortalStack} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
