import {View, Text, Button} from 'react-native';
import {error_codes} from '../utils/bkash_error_codes';
import React from 'react';
import {PrimaryButton} from '../components/Buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PaymentFail = ({route, navigation}) => {
  // const {toPayment, code} = route.params;

  const toPayment = false;
  const code = 101;

  const failMessage =
    error_codes[code] ?? 'There was an error with your scholarship payment';

  const reRoute = () => {
    if (toPayment)
      return navigation.replace('Portal', {
        screen: 'My Scholarships',
        params: {
          screen: 'Payment',
        },
      });
    return navigation.replace('Portal', {
      screen: 'Checkout',
    });
  };

  return (
    <View className="bg-white h-screen flex-1 justify-center px-6">
      <View className="flex flex-col gap-4">
        <View className="">
          <Ionicons
            name="ios-alert-circle-outline"
            color={'red'}
            size={30}
            style={{marginLeft: -3}}
          />
          <Text className="font-gilroybold text-xl leading-5 mt-2">
            Your payment didn't go through
          </Text>
        </View>

        <Text className="font-gilroymedium leading-5">
          Here's what we got back:
          <Text className="font-gilroybold"> {failMessage}</Text>
        </Text>
        <View>
          <PrimaryButton title={'Try again'} handleFn={reRoute} />
        </View>
      </View>
      {/* <Button
        title="Click Here"
        onPress={() => navigation.navigate(toPayment ? 'Payment' : 'Checkout')}
      /> */}
    </View>
  );
};

export default PaymentFail;
