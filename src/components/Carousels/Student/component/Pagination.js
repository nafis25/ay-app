import {StyleSheet, View} from 'react-native';
import React from 'react';

const Pagination = ({data, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => (
        <View
          key={idx.toString()}
          style={[styles.dot, idx === index && styles.dotActive]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 630,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: '#f1f1f1',
  },
  dotActive: {
    backgroundColor: '#1dc468',
  },
});
