import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Flow} from 'react-native-animated-spinkit';

const Primary = ({containerClass, handleFn, title, transform, loading}) => {
  return (
    <TouchableOpacity
      className={`rounded-lg bg-ay-green flex flex-row justify-center ${
        containerClass ?? ''
      }`}
      onPress={() => handleFn()}>
      {loading ? (
        <Flow color="white" size={38} className="my-5" />
      ) : (
        <Text
          className={`font-gilroy font-bold ${
            transform ?? ''
          } text-white text-center p-4`}>
          {title ?? 'Start'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Primary;
