import {FlatList, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../data';
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import NextButton from './NextButton';
import {useNavigation} from '@react-navigation/native';

const OnboardingCarousel = () => {
  const [index, setIndex] = useState(0);
  const slidesRef = useRef(null);
  const navigation = useNavigation();

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (index < Slides.length - 1) {
      slidesRef.current.scrollToIndex({index: index + 1});
    } else {
      console.log('last item');
      navigation.navigate('OnboardingComplete');
    }
  };

  return (
    <View>
      <FlatList
        data={Slides}
        ref={slidesRef}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleOnViewableItemsChanged}
      />

      <Pagination data={Slides} index={index} />

      <NextButton scrollTo={scrollTo} />
    </View>
  );
};

export default OnboardingCarousel;
