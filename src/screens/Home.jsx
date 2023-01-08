import {
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Video from 'react-native-video';
import React, {useContext, useRef, useState} from 'react';
import {usePortal} from '../requests/queries';
import Images from '@assets/paths';
import {styled} from 'nativewind';
import {AuthContext} from '../contexts/AuthContext';
import {PrimaryButton} from '../components/Buttons';
import {firstName, globalDateFormatter, isEmpty} from '../utils/functions';
import {addReferral} from '../requests/PortalRequests';
import Toast from 'react-native-toast-message';
import CommunitySection from '../components/CommunitySection';

const explainer = '../../assets/videos/ay_explainer.mp4';

const Home = ({navigation}) => {
  const {
    isLoading: portalLoading,
    isFetching: portalFetching,
    isError: portalError,
    data: portalResponse,
  } = usePortal();
  const {user} = useContext(AuthContext);

  const NoStudentView = () => {
    const Hero = () => {
      const UnassignedStudentsView = () => {
        let today = new Date();

        let newDate = new Date(
          today.setMonth(today.getMonth() + today.getDate() < 20 ? 1 : 2),
        );
        return (
          <View className="bg-white p-4 rounded-lg max-w-xs">
            <BoldText className="text-lg">Hey {user.name}!</BoldText>
            <NormalText className="leading-5 mt-3">
              You have{' '}
              {portalResponse.data.user_info.paid_unassigned_student_count}{' '}
              literacy scholarship
              {portalResponse.data.user_info.paid_unassigned_student_count > 1
                ? 's'
                : ''}{' '}
              registered, which will commence on the next scholarship session of{' '}
              {globalDateFormatter(newDate, 'session')}
            </NormalText>
          </View>
        );
      };
      const NoScholarshipsView = () => {
        return (
          <View className="bg-white p-4 rounded-lg max-w-xs">
            <BoldText className="text-lg">Hey {user.name}!</BoldText>
            <NormalText className="leading-5 my-3">
              You have no active scholarships. Join the #alteryouthrevolution by
              clicking below.
            </NormalText>
            <PrimaryButton
              title="Start Scholarship"
              transform="uppercase"
              handleFn={() => navigation.navigate('Checkout')}
            />
          </View>
        );
      };
      const NoInviteView = () => {
        const [link, onChangeLink] = React.useState(null);
        const [inviteLoading, setInviteLoading] = useState(false);

        const handleInviteLink = () => {
          let _link = link;

          if (isEmpty(_link))
            return Toast.show({
              bottomOffset: 100,
              type: 'error',
              text1: 'Invite error!',
              text2: 'You need an invite link first',
            });

          if (!_link.includes('alteryouth'))
            return Toast.show({
              bottomOffset: 100,
              type: 'error',
              text1: 'Invite error!',
              text2: "That doesn't look like a valid invite link",
            });

          if (_link.slice(-1) === '/') _link = _link.slice(0, -1);

          const invite_code = _link.split('/').pop();

          setInviteLoading(true);

          addReferral({invite_code: invite_code})
            .then(() => navigation.navigate('Checkout'))
            .catch(error => {
              let error_type = error.response.data.error;
              let error_string = '';
              if (error_type === 'IntegrityError')
                error_string = 'It looks like you already have an invite';
              if (error_type === 'MaximumReferralReachedError')
                error_string =
                  'The invite code has reached its maximum capacity';
              error_string = 'Invalid invite link';
              Toast.show({
                bottomOffset: 100,
                type: 'error',
                text1: 'Invite error!',
                text2: error_string,
              });
            })
            .finally(() => setInviteLoading(false));
        };

        return (
          <View className="bg-white p-4 rounded-lg max-w-xs">
            <BoldText className="text-lg">Hey {user.name}!</BoldText>
            <View className="my-3">
              <NormalText className="leading-5 mb-3">
                Keep an eye on {user.email} for an invitation from AlterYouth.{' '}
                {'\n'}
                {'\n'}
                <NormalText className="text-ay-green leading-5">
                  Got an invite from a friend? Paste it below to start your
                  scholarship
                </NormalText>
              </NormalText>
              <TextInput
                className="border border-gray-200 focus:border-black p-4 rounded font-gilroy"
                onChangeText={onChangeLink}
                value={link}
                placeholder="Invite link"
                keyboardType="email-address"
                dataDetectorTypes="link"
                autoCapitalize="none"
                autoCorrect="false"
              />
            </View>
            <PrimaryButton
              title="Start"
              transform="uppercase"
              handleFn={handleInviteLink}
              loading={inviteLoading}
            />
          </View>
        );
      };

      return (
        <ImageBackground
          source={Images.home_inactive}
          className="flex flex-row justify-center items-center h-96">
          {!portalResponse.data.user_info.invited_by ? (
            <NoInviteView />
          ) : portalResponse.data.user_info.paid_unassigned_student_count >
            0 ? (
            <UnassignedStudentsView />
          ) : (
            <NoScholarshipsView />
          )}
        </ImageBackground>
      );
    };

    const VideoSection = () => {
      const videoRef = useRef(null);
      const [videoShow, setVideoShow] = useState(false);
      return (
        <View className=" pt-3 pb-6">
          <HeadingText className="px-6 mb-5">
            We are moving towards a literate Bangladesh
          </HeadingText>

          {videoShow ? (
            <Video
              ref={videoRef}
              fullscreen={true}
              source={require(explainer)} // Can be a URL or a local file.
              style={{height: 320, width: '100%'}}
              controls={true}
            />
          ) : (
            <ImageBackground
              source={Images.congo}
              className="h-80 flex items-center justify-center">
              <Pressable onPress={() => setVideoShow(true)}>
                <Text className="text-white text-xl">Play</Text>
              </Pressable>
            </ImageBackground>
          )}

          <View className="px-6 pt-6">
            <PrimaryButton transform={'uppercase'} />
          </View>
        </View>
      );
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Hero />
          <CommunitySection />
          <VideoSection />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const StudentView = () => {
    const Hero = () => {
      return (
        <ImageBackground
          source={Images.home_active}
          resizeMode="cover"
          className="flex flex-row justify-center items-center h-96">
          <View className="p-4">
            <BoldText className="text-3xl tracking-tighter">
              Hi {firstName(user.name)}, thank you {'\n'}for a better world!{' '}
            </BoldText>

            <NormalText className="my-5">
              Your scholarship helps a child wake up happier every morning and
              go to school. You can change more lives by telling your friends.
              Spread the love.
            </NormalText>

            <Pressable className="bg-white rounded-lg mb-3">
              <Text className="font-gilroymedium text-teal-700 underline px-4 py-5 leading-3">
                alteryouth.com/invite/khandakar25
              </Text>
            </Pressable>

            <PrimaryButton
              title="Share"
              transform="uppercase"
              containerClass={'bg-teal-700 w-60'}
              // handleFn={() => navigation.navigate('Checkout')}
            />
          </View>
        </ImageBackground>
      );
    };
    const VideoSection = () => {
      const videoRef = useRef(null);
      const [videoShow, setVideoShow] = useState(false);
      return (
        <View className=" pt-3 pb-6">
          <HeadingText className="px-6 mb-5">
            We are moving towards a literate Bangladesh
          </HeadingText>

          {videoShow ? (
            <Video
              ref={videoRef}
              fullscreen={true}
              source={require(explainer)} // Can be a URL or a local file.
              style={{height: 320, width: '100%'}}
              controls={true}
            />
          ) : (
            <ImageBackground
              source={Images.congo}
              className="h-80 flex items-center justify-center">
              <Pressable onPress={() => setVideoShow(true)}>
                <Text className="text-white text-xl">Play</Text>
              </Pressable>
            </ImageBackground>
          )}

          <View className="px-6 pt-6">
            <PrimaryButton transform={'uppercase'} />
          </View>
        </View>
      );
    };

    return (
      <View>
        <Hero />
        <CommunitySection />
        <VideoSection />
      </View>
    );
  };

  return (
    <ScrollView className="bg-white">
      <StudentView />
    </ScrollView>
  );
};

const NormalText = styled(Text, 'font-gilroymedium leading-6');
const BoldText = styled(Text, 'font-gilroybold');
const HeadingText = styled(Text, 'font-gilroybold text-xl');
const GrayText = styled(Text, 'font-gilroymedium text-gray-400');

export default Home;
