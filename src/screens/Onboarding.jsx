import {Button, Image, Text, View} from 'react-native';
import Images from '@assets/paths';

import React from 'react';

const Onboarding = () => {
  return (
    <View className="bg-white h-screen">
      <Image
        source={Images.congo}
        style={{height: 322, width: '100%'}}
        resizeMode="cover"
      />
    </View>
  );
};

export default Onboarding;
