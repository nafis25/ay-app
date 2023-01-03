import {Image, Pressable, ScrollView, Text, View} from 'react-native';

import React, {useContext} from 'react';
import moment from 'moment';
import {PortalContext} from '../contexts/PortalContext';
import {usePortal} from '../requests/queries';
import {Divider, Skeleton} from '@rneui/base';
import {styled} from 'nativewind';
import {img_base_url} from '../config';
import {
  areNumbersEqual,
  capitalize,
  globalDateFormatter,
  isEmpty,
} from '../utils/functions';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgFeaturephone from '@assets/svgs/icons/featurephone.svg';
import SvgHat from '@assets/svgs/icons/hat.svg';
import SvgBkash from '@assets/svgs/icons/bkash.svg';
import SvgBkashLogo from '@assets/svgs/logos/bkash_logo.svg';
import {SheetManager} from 'react-native-actions-sheet';
import {Flow} from 'react-native-animated-spinkit';

const DeadstateView = () => {};

const NoStudentView = () => {
  return (
    <View className="flex-1 justify-center h-screen px-4">
      <Text className="font-gilroybold text-lg mb-1">
        Scholarship Transactions
      </Text>
      <Text className="font-gilroymedium">
        Find mobile banking statements of scholarship transfers here
      </Text>
    </View>
  );
};

const Scholarships = () => {
  const {
    data: {selected_student},
  } = useContext(PortalContext);

  const {
    isLoading: portalLoading,
    isFetching: portalFetching,
    isError: portalError,
    data: portalResponse,
  } = usePortal();

  let studentTransactions = portalResponse?.data.transactions.filter(
    payment => payment.student === selected_student.id,
  );
  let droppedStudent = portalResponse.data.past_student_history.find(
    history => history.student_uid === selected_student.id,
  );
  let dhlInfo = {
    pic: selected_student.details.transfer_photo ?? '',
    receiver: selected_student.details.current_guardian_name ?? '',
    relationship: selected_student.details.current_guardian_relationship ?? '',
    delivered_on: selected_student.transferred_at ?? '',
    location:
      `${selected_student.school.name}, ${selected_student.school.address.district.name}` ??
      '',
  };

  const InactiveView = () => {
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

          <View className="flex flex-row justify-between px-4 py-3 mt-5 mb-8 bg-white rounded-lg shadow">
            <View>
              <NormalText className="mb-1">
                {selected_student.nick_name}'s{' '}
                {capitalize(
                  selected_student.details.current_guardian_relationship,
                )}
              </NormalText>
              <BoldText>
                {selected_student.details.current_guardian_name}
              </BoldText>
            </View>
            <View>
              <NormalText className="">Mobile Bank A/C</NormalText>
              <NormalText className="text-yellow-400">Processing</NormalText>
            </View>
          </View>
          <View>
            <HeadingText className="mb-5">What's happening now</HeadingText>
            <View className="flex flex-col gap-7">
              <View className="flex flex-row">
                {selected_student.details.transfer_photo ? (
                  <>
                    <View className="flex flex-row justify-center items-center rounded-full bg-ay-green h-9 w-9">
                      <Ionicons
                        name="ios-checkmark-outline"
                        size={20}
                        color="white"
                      />
                    </View>
                    <View className="ml-4 flex-1">
                      <BoldText className="mb-2">
                        Mobile phone shipment
                      </BoldText>
                      <NormalText>
                        Delivered on{' '}
                        {globalDateFormatter(
                          selected_student.transferred_at,
                          'long',
                        )}
                      </NormalText>
                      <Pressable
                        onPress={() =>
                          SheetManager.show('dhl-sheet', {payload: dhlInfo})
                        }>
                        <Text className="font-gilroylight underline text-ay-green mt-1">
                          View delivery photo
                        </Text>
                      </Pressable>
                    </View>
                  </>
                ) : (
                  <>
                    <View className="flex flex-row justify-center items-center rounded-full bg-sky-200 h-9 w-9">
                      <SvgFeaturephone width={9} fill="white" />
                    </View>
                    <View className="ml-4 flex-1">
                      <BoldText className="mb-2">
                        Mobile phone shipment
                      </BoldText>
                      <NormalText>
                        A mobile phone is being shipped to the guardian to
                        facilitate scholarship transactions
                      </NormalText>
                    </View>
                  </>
                )}
              </View>
              <View className="flex flex-row">
                <View className="flex flex-row justify-center items-center rounded-full bg-bkash h-9 w-9">
                  <SvgBkash width={15} fill="white" />
                </View>
                <View className="ml-4 flex-1">
                  <BoldText className="mb-2">
                    Mobile bank account creation
                  </BoldText>
                  <NormalText>
                    Your student's guardian is being supported to create her own
                    account
                  </NormalText>
                </View>
              </View>
              <View className="flex flex-row">
                <View className="flex flex-row justify-center items-center rounded-full bg-ay-green h-9 w-9">
                  <SvgHat />
                </View>
                <View className="ml-4 flex-1">
                  <BoldText className="mb-2">Scholarship activation</BoldText>
                  <NormalText>
                    Upon successful completion of the above steps, your student
                    will start receiving the monthly scholarships
                  </NormalText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ActiveView = () => {
    let incubationCount = 4;
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
        <View className="py-5">
          <View className="px-4">
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
          </View>
          <View className="px-4">
            <Pressable
              onPress={() =>
                SheetManager.show('privacy-sheet', {
                  payload: {
                    student: {
                      name: selected_student.nick_name,
                      gender: selected_student.gender,
                    },
                    dhlPic: dhlInfo.pic,
                  },
                })
              }
              className="flex flex-row justify-between px-4 py-3 mt-5 mb-10 bg-white rounded-lg shadow">
              <View>
                <NormalText className="mb-1">
                  {selected_student.nick_name}'s{' '}
                  {capitalize(
                    selected_student.details.current_guardian_relationship,
                  )}
                </NormalText>
                <BoldText>
                  {selected_student.details.current_guardian_name}
                </BoldText>
              </View>
              <View>
                <NormalText className="mb-1">Mobile Bank A/C</NormalText>
                <BoldText>
                  {selected_student.bkash_phone_number}{' '}
                  <Ionicons
                    name="ios-information-circle-outline"
                    color={'#1dc468'}
                  />
                </BoldText>
              </View>
            </Pressable>
          </View>
          <View className="px-4 mb-6">
            <SvgBkashLogo />
            <HeadingText className="mt-3 mb-1">
              Scholarship Transactions
            </HeadingText>
            <NormalText>
              Monthly transfers to {selected_student.nick_name}'s guardian
            </NormalText>
          </View>
          <View>
            {studentTransactions.map((payment, index) => {
              if (payment.amount === 500) incubationCount -= 1;
              return (
                <View
                  className={`py-6 px-4 border-t border-t-gray-200 ${
                    studentTransactions[index + 1]
                      ? 'border-b-0'
                      : 'border-b border-b-gray-200'
                  }`}
                  key={index}>
                  <View className="flex flex-row justify-between">
                    <View className="flex flex-col gap-2">
                      <BoldText>
                        Scholarship sent for{' '}
                        {`${payment.paid_month} ${payment.paid_year}`}
                      </BoldText>
                      <NormalText>bKash Wallet No. {payment.wallet}</NormalText>
                      <NormalText className="text-ay-green">
                        Transaction ID: {payment.trx_id}
                      </NormalText>
                    </View>
                    <View className="flex flex-col justify-between items-end">
                      <GrayText>
                        {globalDateFormatter(payment.date, 'general')}
                      </GrayText>

                      <BoldText className="text-xl leading-6">
                        TK {payment.amount.toLocaleString()}
                      </BoldText>
                    </View>
                  </View>

                  {payment.amount === 500 && (
                    <Pressable
                      onPress={() =>
                        SheetManager.show('hishab-sheet', {
                          payload: dhlInfo.pic,
                        })
                      }>
                      <BoldText className="text-gray-400 mt-4">
                        Balanced for phone purchase: {incubationCount}
                        /3{' '}
                        <Ionicons
                          name="ios-help-circle-outline"
                          color={'#1dc468'}
                        />
                      </BoldText>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </View>
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

  // if (portalError) return <Loader type="redirect" />;

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
      {isEmpty(studentTransactions) ? <InactiveView /> : <ActiveView />}
    </ScrollView>
  );
};

const StyledImage = styled(Image);

const NormalText = styled(Text, 'font-gilroymedium leading-5');
const BoldText = styled(Text, 'font-gilroybold');
const HeadingText = styled(Text, 'font-gilroybold text-xl');
const GrayText = styled(Text, 'font-gilroymedium text-gray-400');

export default Scholarships;
