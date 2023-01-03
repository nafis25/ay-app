import {Skeleton} from '@rneui/base';
import {styled} from 'nativewind';
import {useRef, useState} from 'react';
import {Image, ScrollView, Pressable, Text, View} from 'react-native';
import ActionSheet, {
  SheetManager,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {img_base_url} from '../../config';
import {capitalize, globalDateFormatter} from '../../utils/functions';

function DhlSheet({sheetId, payload: dhlInfo}) {
  const dhlSheetRef = useRef(null);
  const scrollHandlers = useScrollHandlers('1', dhlSheetRef);

  return (
    <ActionSheet
      id={sheetId}
      ref={dhlSheetRef}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      indicatorStyle={{
        width: 100,
      }}
      openAnimationConfig={{damping: 35, stiffness: 300}}
      snapPoints={[60, 100]}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}>
      <View className="pt-6">
        <Text className="px-4 font-gilroybold text-lg mb-3">
          Mobile phone shipment
        </Text>
        <ScrollView {...scrollHandlers} className="px-4">
          <Pressable>
            <View className="border border-black mb-4">
              <View className="bg-black px-2 py-3">
                <Text className="font-gilroybold text-base text-white">
                  Shipping Information
                </Text>
              </View>
              <View className="flex flex-row justify-between px-2 py-5 border border-b-black">
                <Text className="font-gilroybold">Receiver Name</Text>
                <Text className="font-gilroymedium">{dhlInfo.receiver}</Text>
              </View>
              <View className="flex flex-row justify-between px-2 py-5 border border-b-black">
                <Text className="font-gilroybold">
                  Relationship with student
                </Text>
                <Text className="font-gilroymedium">
                  {capitalize(dhlInfo.relationship)}
                </Text>
              </View>
              <View className="flex flex-row justify-between px-2 py-5 border border-b-black">
                <Text className="font-gilroybold">Delivered on</Text>
                <Text className="font-gilroymedium">
                  {globalDateFormatter(dhlInfo.delivered_on, 'general')}
                </Text>
              </View>
              <View className="px-2 py-5 border border-b-black">
                <Text className="font-gilroybold mb-3">Location</Text>
                <Text className="font-gilroymedium leading-5">
                  {dhlInfo.location}
                </Text>
              </View>
            </View>
            <View>
              <StyledImage
                PlaceholderContent={
                  <Skeleton animation="pulse" width={'100%'} height={320} />
                }
                placeholderStyle={{backgroundColor: '#f5f5f5'}}
                transition
                style={{height: 500}}
                resizeMode="cover"
                source={{
                  uri: img_base_url + dhlInfo.pic,
                }}
              />
            </View>
          </Pressable>
          <View className="h-20" />
        </ScrollView>
      </View>
    </ActionSheet>
  );
}

const AyText = styled(Text, 'font-gilroymedium');
const StyledImage = styled(Image);

export default DhlSheet;
