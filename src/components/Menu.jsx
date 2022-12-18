import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AuthContext} from '../contexts/AuthContext';

const Menu = props => {
  const {logout} = useContext(AuthContext);
  const {navigation} = props;

  const handleLogout = async () => {
    await logout();
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{fontFamily: 'gilroy'}}
        label="Logout"
        onPress={() => handleLogout()}
      />
    </DrawerContentScrollView>
  );
};

export default Menu;
