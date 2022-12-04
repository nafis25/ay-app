import {Button, Text, View} from 'react-native';

import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const OTP = () => {
  return (
    <SafeAreaView className="bg-white h-screen">
      <View className="flex justify-center items-center font-gilroy">
        <Text>OTP Screen</Text>
        <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
      </View>
    </SafeAreaView>
  );
};

export default OTP;
