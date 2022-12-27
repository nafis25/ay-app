import {View, Text, Button} from 'react-native';
import {error_codes} from '../utils/bkash_error_codes';
import React from 'react';
import {PrimaryButton} from '../components/Buttons';

const PaymentFail = ({route, navigation}) => {
  // const {code} = route.params;

  const failMessage =
    error_codes[null] ?? 'There was an error with your scholarship payment';

  return (
    <View className="bg-white h-screen flex-1 justify-center px-4">
      <View className="flex flex-col gap-4">
        <Text className="font-gilroybold text-xl leading-5">
          Your payment didn't go through
        </Text>
        <Text className="font-gilroymedium leading-5">
          Here's what we got back: {failMessage}
        </Text>
        <View>
          <PrimaryButton />
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
