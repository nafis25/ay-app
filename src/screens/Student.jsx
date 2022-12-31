import {Image, ScrollView, Text, View} from 'react-native';

import React, {useContext} from 'react';
import {PortalContext} from '../contexts/PortalContext';
import {usePortal} from '../requests/queries';
import {styled} from 'nativewind';
import {Divider, Skeleton} from '@rneui/base';
import {img_base_url, profile_photo_url} from '../config';
import SvgPin from '@assets/svgs/icons/pin.svg';
import SvgFather from '@assets/svgs/icons/father.svg';
import SvgMother from '@assets/svgs/icons/mother.svg';
import {areNumbersEqual, isEmpty} from '../utils/functions';
import moment from 'moment';
import {Flow} from 'react-native-animated-spinkit';

const NoStudentView = () => {
  return (
    <View className="flex-1 justify-center h-screen px-4">
      <Text className="font-gilroybold text-lg mb-1">Student Details</Text>
      <Text className="font-gilroymedium">
        Get to know more about your students
      </Text>
    </View>
  );
};

const DeadstateView = () => {
  return (
    <>
      <View className="bg-white">
        <StyledImage
          PlaceholderContent={
            <Skeleton animation="pulse" width={'100%'} height={320} />
          }
          placeholderStyle={{backgroundColor: '#f5f5f5'}}
          transition
          className="h-80"
          source={{
            uri: profile_photo_url,
          }}
        />
        <View className="px-4 py-5">
          <View className="flex flex-row justify-between">
            <BoldText className="text-ay-green">
              Scholarship Session: May '23
            </BoldText>
            <BoldText className="text-ay-green">@asif64</BoldText>
          </View>
          <View className="my-4">
            <HeadingText className="">Kabir Azam</HeadingText>
            <NormalText>Class 3, Roll 12</NormalText>
          </View>
          <View className="mb-6">
            <NormalText className="mb-1">
              Bholadia Government Primary School
            </NormalText>
            <View className="flex flex-row items-center">
              <SvgPin width={11} />
              <GrayText className="mt-1 ml-1">Panchagarh, Bangladesh</GrayText>
            </View>
          </View>
          <Text className="font-indie text-xl">
            "I want to be a doctor when I grow up. I love playing football with
            my friends and my favourite food is biryani."
          </Text>
        </View>
      </View>
      <View className="absolute w-screen h-screen bg-black opacity-80 p-6" />

      <View className="absolute w-screen h-screen p-6">
        <View className="bg-white p-4 rounded-lg">
          <BoldText className="text-lg mb-1">
            Your scholarship hasn't started yet
          </BoldText>
          <NormalText className="leading-5">
            Please wait until your scholarship has commenced to avail all the
            features.
          </NormalText>
        </View>
      </View>
    </>
  );
};

const Student = () => {
  const {
    data: {selected_student},
  } = useContext(PortalContext);

  const {
    isLoading: portalLoading,
    isFetching: portalFetching,
    isError: portalError,
    data: portalResponse,
  } = usePortal();

  const Profile = () => {
    let droppedStudent = portalResponse.data.past_student_history.find(
      history => history.student_uid === selected_student.id,
    );
    return (
      <View>
        <StyledImage
          PlaceholderContent={
            <Skeleton animation="pulse" width={'100%'} height={320} />
          }
          placeholderStyle={{backgroundColor: '#f5f5f5'}}
          transition
          className="h-80"
          source={{
            uri: img_base_url + selected_student.details.profile_photo,
          }}
        />
        <View className="px-4 py-5">
          <View className="flex flex-row justify-between">
            <BoldText className="text-ay-green">
              {isEmpty(droppedStudent)
                ? `Scholarship Session: ${moment(
                    selected_student.scholarship_start_date,
                  ).format("MMMM 'YY")}`
                : `Scholarship from ${moment(
                    droppedStudent.scholarship_start_date,
                  ).format("MMMM 'YY")} to ${moment(
                    droppedStudent.last_payment_for_month,
                  ).format("MMMM 'YY")}`}
            </BoldText>
            <BoldText className="text-ay-green">
              {isEmpty(droppedStudent) &&
                `@${portalResponse.data.user_info.invite_code}`}
            </BoldText>
          </View>
          <View className="my-4">
            <HeadingText className="">{selected_student.name}</HeadingText>
            <NormalText>
              Class {selected_student.current_class}, Roll{' '}
              {selected_student.roll}
            </NormalText>
          </View>
          <View className="mb-6">
            <NormalText className="mb-1">
              {selected_student.school.name}
            </NormalText>
            <View className="flex flex-row items-center">
              <SvgPin width={11} />
              <GrayText className="mt-1 ml-1">
                {selected_student.school.address.district.name}, Bangladesh
              </GrayText>
            </View>
          </View>
          <Text className="font-indie text-xl">
            "I want to be{' '}
            {/^[aeiou]$/i.test(selected_student.details.ambition.charAt(0))
              ? 'an '
              : 'a '}
            {selected_student.details.ambition.toLowerCase()} when I grow up. I
            love playing{' '}
            {selected_student.details.favourite_game.charAt(0).toLowerCase() +
              selected_student.details.favourite_game.slice(1)}{' '}
            with my friends and my favourite food is{' '}
            {selected_student.details.favourite_food.toLowerCase()}
            ."
          </Text>
        </View>
      </View>
    );
  };

  const Family = () => {
    return (
      <View>
        <StyledImage
          PlaceholderContent={
            <Skeleton animation="pulse" width={'100%'} height={320} />
          }
          placeholderStyle={{backgroundColor: '#f5f5f5'}}
          transition
          className="h-80"
          source={{
            uri: img_base_url + selected_student.details.family_photo,
          }}
        />
        <View className="px-4 py-5">
          <View>
            <GrayText>
              Photo of {selected_student.nick_name} with{' '}
              {selected_student.gender === 1 ? 'his' : 'her'}{' '}
              {selected_student.details.family_photo_with.toLowerCase()}
            </GrayText>

            <View className="my-5">
              <HeadingText className="">
                {selected_student.nick_name}'s Family
              </HeadingText>
              <NormalText>
                Scholarship Criteria: {selected_student.criteria}
              </NormalText>
            </View>

            <NormalText>{selected_student.details.student_story}</NormalText>
          </View>
          <StyledDivider className="my-10" />
          <View className="flex flex-col gap-8">
            <View className="flex flex-row">
              <SvgFather width={20} />
              <View className="ml-4">
                <BoldText className="mb-1">Father</BoldText>
                <NormalText>
                  {selected_student.details.father_name},{' '}
                  {selected_student.details.father_status}
                </NormalText>
              </View>
            </View>
            <View className="flex flex-row">
              <SvgMother width={20} />
              <View className="ml-4">
                <BoldText className="mb-1">Mother</BoldText>
                <NormalText>
                  {selected_student.details.mother_name},{' '}
                  {selected_student.details.mother_status}
                </NormalText>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const Address = () => {
    return (
      <View>
        <StyledImage
          PlaceholderContent={
            <Skeleton animation="pulse" width={'100%'} height={320} />
          }
          placeholderStyle={{backgroundColor: '#f5f5f5'}}
          transition
          className="h-80"
          source={{
            uri: img_base_url + selected_student.school.address.upazila.image,
          }}
        />
        <View className="px-4 py-5">
          <BoldText>{selected_student.nick_name}'s Home</BoldText>
          <View className="my-5">
            <Text className="font-gilroybold text-2xl -mb-1">
              {selected_student.school.address.district.name}
            </Text>
            <Text className="font-gilroybold text-3xl">Bangladesh</Text>
          </View>
          <NormalText>
            {selected_student.school.address.district.description}
          </NormalText>
        </View>
      </View>
    );
  };

  if (
    portalLoading ||
    portalFetching ||
    (isEmpty(selected_student) && !isEmpty(portalResponse?.data.students))
  )
    return (
      <View className="flex-1 justify-center items-center bg-white h-screen">
        <Flow color="#1dc468" size={38} />
      </View>
    );

  //  if (portalError) return <Loader type="redirect" />;

  if (
    areNumbersEqual(
      portalResponse.data.user_info.active_scholarship_count,
      0,
    ) &&
    !areNumbersEqual(
      portalResponse.data.user_info.paid_unassigned_student_count,
      0,
    )
  )
    return <DeadstateView />;

  if (
    areNumbersEqual(portalResponse.data.user_info.active_scholarship_count, 0)
  )
    return <NoStudentView />;

  return (
    <ScrollView className="bg-white">
      <Profile />
      <Family />
      <Address />
    </ScrollView>
  );
};

const StyledImage = styled(Image);
const StyledDivider = styled(Divider);

const NormalText = styled(Text, 'font-gilroymedium leading-6');
const BoldText = styled(Text, 'font-gilroybold');
const HeadingText = styled(Text, 'font-gilroybold text-xl');
const GrayText = styled(Text, 'font-gilroymedium text-gray-400');

export default Student;
