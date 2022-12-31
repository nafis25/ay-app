import {View} from 'react-native';
import React from 'react';
import AYWhiteLogo from '@assets/svgs/logos/alteryouth_white.svg';

export default function AuthNav() {
  return (
    <View className="overflow-hidden pb-3">
      <View className="flex-row justify-center bg-white shadow-sm">
        <AYWhiteLogo width={150} fill={'#1dc468'} />
      </View>
    </View>
  );
}
