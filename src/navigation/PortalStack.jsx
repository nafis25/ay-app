import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../screens';

const Drawer = createDrawerNavigator();

const PortalStack = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false, drawerType: 'back'}}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default PortalStack;
