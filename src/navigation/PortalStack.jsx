import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CheckoutScreen, HomeScreen, SettingsScreen} from '../screens';
import Menu from '../components/Menu';
import {useState, useEffect} from 'react';
import {getInitRoute} from '../requests/TokenHandler';
import {ActivityIndicator, View} from 'react-native';

const Drawer = createDrawerNavigator();

const PortalStack = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  const checkInitRoute = async () => {
    try {
      const route = await getInitRoute();
      if (route !== null) setInitialRoute(route);
    } catch (error) {
      console.log('error retrieving initRoute');
      console.error(error);
    }
  };

  useEffect(() => {
    checkInitRoute();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={props => <Menu {...props} />}
      screenOptions={{headerShown: false, drawerType: 'back'}}
      initialRouteName={initialRoute}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Checkout" component={CheckoutScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default PortalStack;
