import {Skeleton} from '@rneui/base';
import {styled} from 'nativewind';
import {useRef} from 'react';
import {Image, ScrollView, Pressable, Text, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {img_base_url} from '../../config';
import SvgCalendarPending from '@assets/svgs/icons/calendar_pending.svg';
import SvgCalendarComplete from '@assets/svgs/icons/calendar_complete.svg';

function HishabSheet({sheetId, payload: dhlPic}) {
  const hishabSheetRef = useRef(null);

  return (
    <ActionSheet
      id={sheetId}
      ref={hishabSheetRef}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      indicatorStyle={{
        width: 100,
      }}
      openAnimationConfig={{damping: 35, stiffness: 300}}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}>
      <View className="pt-6">
        <ScrollView className="px-4">
          <Pressable>
            <View>
              <StyledImage
                PlaceholderContent={
                  <Skeleton animation="pulse" width={'100%'} height={320} />
                }
                placeholderStyle={{backgroundColor: '#f5f5f5'}}
                transition
                className="h-96 rounded-lg"
                resizeMode="cover"
                source={{
                  uri: img_base_url + dhlPic,
                }}
              />
            </View>
            <Text className="font-gilroybold text-lg mt-4 mb-2">
              How the mobile phone is financed
            </Text>
            <View>
              <AyText>
                The cost of the mobile phone and logistics amounts to BDT 1,500.
                This is balanced from the scholarship received by your student
                in the first 3 months as shown below:
              </AyText>
              <View className="flex flex-row justify-between my-6">
                <View className="flex flex-col items-center">
                  <View className="flex flex-row justify-center items-center h-16 w-16 rounded-full bg-gray-100">
                    <SvgCalendarPending />
                  </View>
                  <View className="rounded-xl mt-3 py-1 px-2 bg-gray-100">
                    <Text className="font-gilroybold text-xs">1st Month</Text>
                  </View>
                </View>
                <View className="flex flex-col items-center">
                  <View className="flex flex-row justify-center items-center h-16 w-16 rounded-full bg-gray-100">
                    <SvgCalendarPending />
                  </View>
                  <View className="rounded-xl mt-3 py-1 px-2 bg-gray-100">
                    <Text className="font-gilroybold text-xs">2nd Month</Text>
                  </View>
                </View>
                <View className="flex flex-col items-center">
                  <View className="flex flex-row justify-center items-center h-16 w-16 rounded-full bg-gray-100">
                    <SvgCalendarPending />
                  </View>
                  <View className="rounded-xl mt-3 py-1 px-2 bg-gray-100">
                    <Text className="font-gilroybold text-xs">3rd Month</Text>
                  </View>
                </View>
                <View className="flex flex-col items-center">
                  <View className="flex flex-row justify-center items-center h-16 w-16 rounded-full bg-ay-green">
                    <SvgCalendarComplete />
                  </View>
                  <View className="rounded-xl mt-3 py-1 px-2 bg-gray-100">
                    <Text className="font-gilroybold text-xs">4th Month</Text>
                  </View>
                </View>
              </View>
              <AyText>
                From the 4th month onward, your student receives the total
                scholarship amount of BDT 1,000 per month.
              </AyText>
            </View>
          </Pressable>
          <View className="h-12" />
        </ScrollView>
      </View>
    </ActionSheet>
  );
}

const AyText = styled(Text, 'font-gilroymedium leading-6');
const StyledImage = styled(Image);

export default HishabSheet;
