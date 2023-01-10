import {FlatList, View} from 'react-native';
import React, {useRef, useState} from 'react';
import SlideItem from './SlideItem';
import Pagination from './Pagination';

const StudentCarousel = ({studentData}) => {
  const [index, setIndex] = useState(0);
  const slidesRef = useRef(null);

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  return (
    <View>
      <FlatList
        data={studentData}
        ref={slidesRef}
        renderItem={({item, index}) => (
          <SlideItem
            item={item}
            index={index}
            totalStudents={studentData.length}
          />
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleOnViewableItemsChanged}
      />

      <Pagination data={studentData} index={index} />
    </View>
  );
};

export default StudentCarousel;
