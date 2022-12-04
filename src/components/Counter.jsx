import {View, Text, Pressable} from 'react-native';
import React from 'react';
import AntD from 'react-native-vector-icons/AntDesign';

const Counter = () => {
  return (
    <>
      <View className="flex flex-row items-center">
        <Pressable className="p-3 bg-gray-500 rounded border-2 border-gray-700">
          <AntD name="minus" color={'white'} />
        </Pressable>
        <View className="bg-gray-100 px-4 py-3">
          <Text>1</Text>
        </View>
        <Pressable className="p-3 bg-ay-green rounded border-2 border-green-700">
          <AntD name="plus" color={'white'} />
        </Pressable>
      </View>
    </>
  );
};

export default Counter;
