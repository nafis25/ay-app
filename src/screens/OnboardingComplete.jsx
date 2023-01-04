import {Button, Image, ImageBackground, Text, View} from 'react-native';
import Images from '@assets/paths';
import {PrimaryButton} from '../components/Buttons';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const OnboardingComplete = () => {
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground
      source={Images.congo}
      className="h-screen flex flex-row items-end px-6"
      style={{paddingBottom: insets.bottom}}
      resizeMode="cover">
      <View className="w-full">
        <Text className="font-gilroybold text-5xl text-white tracking-tighter">
          Ensure a {'\n'}literate {'\n'}citizen for {'\n'}Bangladesh
        </Text>
        <PrimaryButton title={'start'} transform="uppercase" />
      </View>
    </ImageBackground>
  );
};

export default OnboardingComplete;
