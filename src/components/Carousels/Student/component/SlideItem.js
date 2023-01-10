import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {styled} from 'nativewind';
import {Skeleton} from '@rneui/base';
import {img_base_url} from '../../../../config';
import {usePortal} from '../../../../requests/queries';
import {globalDateFormatter, isEmpty} from '../../../../utils/functions';

const {width, height} = Dimensions.get('screen');

const SlideItem = ({item: student, index, totalStudents}) => {
  const {data: portalResponse} = usePortal();

  let droppedStudent = portalResponse.data.past_student_history.find(
    history => history.student_uid === student.id,
  );

  return (
    <View style={styles.container}>
      <View className="flex flex-row justify-between p-6">
        <View className="flex flex-row items-center">
          <StyledImage
            PlaceholderContent={
              <Skeleton animation="pulse" circle width={50} height={50} />
            }
            placeholderStyle={{backgroundColor: '#f5f5f5'}}
            transition
            className="mr-3 h-12 w-12 rounded-full ring-green border-2 border-ay-green"
            source={{
              uri: img_base_url + student.details.profile_photo,
            }}
          />

          <View className="flex flex-row items-center ">
            <View>
              <BoldText className="leading-4 mb-1">Tasfique Ahmed</BoldText>
              <NormalText className="leading-4">Class 2, Roll 10</NormalText>
            </View>
          </View>
        </View>

        <View className="flex flex-row items-center">
          <View className="bg-gray-200 px-4 py-2 rounded-full">
            <BoldText className="text-white leading-4">
              {index + 1} of {totalStudents}
            </BoldText>
          </View>
        </View>
      </View>
      <Image
        source={{uri: img_base_url + student.details.story_photo}}
        resizeMode="cover"
        style={[styles.image]}
      />

      <View className="px-6 pt-10">
        <BoldText className="text-ay-green my-4">
          {isEmpty(droppedStudent)
            ? `Scholarship Session: ${globalDateFormatter(
                student.scholarship_start_date,
                'session',
              )}`
            : `Scholarship from ${globalDateFormatter(
                droppedStudent.scholarship_start_date,
                'session',
              )} to ${globalDateFormatter(
                droppedStudent.last_payment_for_month,
                'session',
              )}`}
        </BoldText>
        <NormalText className="-mb-7">
          {student.details.student_story}
        </NormalText>
      </View>
    </View>
  );
};

export default SlideItem;

const NormalText = styled(Text, 'font-gilroymedium leading-6');
const BoldText = styled(Text, 'font-gilroybold');
const HeadingText = styled(Text, 'font-gilroybold text-xl');
const GrayText = styled(Text, 'font-gilroymedium text-gray-400');
const StyledImage = styled(Image);

const styles = StyleSheet.create({
  container: {
    width,
  },
  image: {
    height: 512,
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
