import {Button, Text, View} from 'react-native';

import React, {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';

const School = () => {
  const {user} = useContext(AuthContext);
  return (
    <View className="flex-1 justify-center items-center">
      {user?.name && <Text>Hey {user?.name}!</Text>}
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default School;
