import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Flow} from 'react-native-animated-spinkit';

const Outline = ({
  borderColor,
  buttonPadding,
  containerClass,
  handleFn,
  title,
  transform,
  loading,
}) => {
  return (
    <TouchableOpacity
      className={`rounded-xl border ${
        borderColor ?? 'border-ay-green'
      } flex flex-row justify-center ${containerClass ?? ''}`}
      onPress={() => handleFn()}>
      {loading ? (
        <Flow color="#1dc468" size={38} className="my-5" />
      ) : (
        <Text
          className={`font-gilroy font-bold ${
            transform ?? ''
          } text-ay-green text-center ${buttonPadding ?? 'p-4'}`}>
          {title ?? 'Start'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Outline;
