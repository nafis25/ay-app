import {Button, Text, View} from 'react-native';

import React from 'react';

const Onboarding = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Onboarding Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default Onboarding;
