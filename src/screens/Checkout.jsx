import {View, Text} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {removeInitRoute} from '../requests/TokenHandler';

const Checkout = () => {
  useEffect(() => {
    removeInitRoute();
  }, []);

  return (
    <View>
      <Text>Checkout</Text>
    </View>
  );
};

export default Checkout;
