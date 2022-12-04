import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import PortalStack from './PortalStack';
import AuthStack from './AuthStack';

const Routes = () => {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      {isLoggedIn ? <PortalStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
