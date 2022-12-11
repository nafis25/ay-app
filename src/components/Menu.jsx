import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AuthContext} from '../contexts/AuthContext';

const Menu = props => {
  const {logout} = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Pressable className="p-4" onPress={() => handleLogout()}>
        <Text>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default Menu;
