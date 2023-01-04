import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

const SlideItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={item.img} resizeMode="cover" style={[styles.image]} />

      <View className="px-7 pt-12">
        <Text className="font-gilroybold text-2xl mb-4">{item.title}</Text>
        <Text className="font-gilroymedium text-base ">{item.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  image: {
    height: '55%',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
