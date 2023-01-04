import {StyleSheet, Pressable} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NextButton({scrollTo}) {
  return (
    <Pressable
      onPress={() => scrollTo()}
      className="flex flex-row justify-center items-center h-12 w-12 border rounded-full border-gray-400"
      style={styles.container}>
      <Ionicons name="ios-arrow-forward" size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '88%',
    left: '80%',
  },
});
