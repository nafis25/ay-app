import {
  View,
  Text,
  Image,
  ScrollView as RNScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import Images from '@assets/paths';
import {LinearProgress, Badge} from '@rneui/base';
import {styled} from 'nativewind';
import {PrimaryButton} from '../components/Buttons';

const Congratulations = () => {
  return (
    <ScrollView className="bg-white" contentContainerStyle="py-10">
      <View className="px-6 mb-6">
        <Text className="font-gilroybold text-xl mb-2">
          🥳 Congratulations Nafis!
        </Text>
        <AyText>Meet your scholarship recipients</AyText>
      </View>
      <Image
        source={Images.congo}
        style={{height: 322, width: '100%'}}
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="font-gilroybold text-xl mb-4">
          Let's build a movement towards a literate Bangladesh!
        </Text>
        <View className="mb-5">
          <StyledLinearProgress
            className="rounded-lg my-3 h-2"
            trackColor="#e6f6ef"
            color="#1dc468"
            value={0.2}
            variant="determinate"
          />
          <Text className="font-gilroymedium text-gray-400 text-xs">
            <Text className="font-gilroymedium text-black">120</Text>{' '}
            scholarships offered of 2,000 goal{'  '}
            <StyledBadge badgeStyle="bg-gray-300" />
            {'  '}
            <Text className="font-gilroymedium text-black">1,000</Text> users
          </Text>
        </View>
        <AyText className="mb-10">
          <Text className="font-gilroybold text-black">
            #alteryouthrevolution
          </Text>{' '}
          is a community of people like you, providing scholarships to students
          who do not have a father to support them financially.
          {'\n'}
          {'\n'}
          Only members of the community can invite others to start scholarships.
          Here is your exclusive invite link to share with your family and
          friends.
        </AyText>
        <View className="flex flex-col gap-3">
          <Pressable className="flex flex-row justify-center bg-gray-100 p-4 rounded-lg">
            <Text className="font-gilroylight text-teal-700 underline">
              alteryouth.com/invite/nafis25
            </Text>
          </Pressable>
          <View>
            <PrimaryButton bgColor="bg-teal-700" title="Share" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const StyledBadge = styled(Badge, {
  props: {
    badgeStyle: true,
  },
});

const StyledLinearProgress = styled(LinearProgress, {
  props: {
    style: true,
  },
});

const ScrollView = styled(RNScrollView, {
  props: {
    contentContainerStyle: true,
  },
});

const AyText = styled(Text, 'font-gilroymedium leading-5');

export default Congratulations;
