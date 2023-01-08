import {Skeleton} from '@rneui/base';
import {styled} from 'nativewind';
import {useRef} from 'react';
import {Image, ScrollView, Pressable, Text, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {img_base_url} from '../../config';

function PrivacySheet({sheetId, payload: {student, dhlPic}}) {
  const privacySheetRef = useRef(null);

  return (
    <ActionSheet
      id={sheetId}
      ref={privacySheetRef}
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
        <ScrollView className="px-6">
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
              {student.name}'s family received a mobile phone
            </Text>
            <AyText>
              When you started the scholarship for {student.name},{' '}
              {student.gender === 1 ? 'his' : 'her'} family received a mobile
              phone and created a mobile bank account. This is where{' '}
              {student.gender === 1 ? 'he' : 'she'} receives your scholarships
              every month. Since the mobile bank account number is also the
              contact number of the student (a minor), it is privacy protected.
            </AyText>
          </Pressable>
          <View className="h-16" />
        </ScrollView>
      </View>
    </ActionSheet>
  );
}

const AyText = styled(Text, 'font-gilroymedium leading-6');
const StyledImage = styled(Image);

export default PrivacySheet;
