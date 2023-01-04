import {
  View,
  Text,
  ScrollView as RNScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {removeInitRoute} from '../requests/TokenHandler';
import {Tooltip} from '@rneui/base';
import {AuthContext} from '../contexts/AuthContext';
import Counter from '../components/Counter';
import {firstName} from '../utils/functions';
import {usePortal, useSiteData} from '../requests/queries';

import {BDT_SCHOLARSHIP_AMOUNT, BDT_SERVICE_CHARGE, USD_TOTAL} from '../config';
import {styled} from 'nativewind';
import PaymentOptions from '../components/PaymentOptions';

const Checkout = ({navigation}) => {
  const {data: statResponse, status: statStatus} = useSiteData();

  const {data: portalResponse} = usePortal();

  const {user} = useContext(AuthContext);

  const [qty, setQty] = useState(1);
  const [stopAt, setStopAt] = useState(10);
  let trans_amount = qty * BDT_SCHOLARSHIP_AMOUNT;
  let service_charge = qty * BDT_SERVICE_CHARGE;
  let total = (trans_amount + service_charge).toLocaleString();

  let stripe_total = (qty * USD_TOTAL).toFixed(2);

  useEffect(() => {
    removeInitRoute();
  }, []);

  useEffect(() => {
    if (statStatus === 'success')
      setStopAt(
        statResponse.data.stock < 10 && statResponse.data.stock > 0
          ? statResponse.data.stock
          : 10,
      );
  }, [statResponse, statStatus, qty]);

  return (
    <ScrollView className="bg-white" contentContainerStyle="px-4 pt-6 pb-10">
      <View className="flex flex-col gap-6">
        <TouchableOpacity
          className="flex justify-center items-center bg-gray-100 rounded-full h-8 w-8"
          onPress={() => navigation.navigate('My Scholarships')}>
          <EvilIcons name="chevron-left" size={30} />
        </TouchableOpacity>
        <View className="flex flex-row justify-between items-center border-black">
          <Text className="font-gilroybold text-base">
            Hey {firstName(user?.name)}, you're starting {'\n'}
            {qty} Literacy Scholarship
            {qty > 1 ? 's' : ''}{' '}
            <EvilIcons name="question" size={15} color="black" />
          </Text>
          <Counter updateQty={setQty} small />
        </View>

        <View className="p-5 border border-gray-200 rounded-lg">
          <View className="flex flex-col gap-6 ">
            <View className="flex flex-row justify-between">
              <AyText>
                Student's Scholarship Amount x {qty} {'\n\n'}
                <Text className="font-gilroymedium text-gray-300">
                  Transferred via bKash
                </Text>
              </AyText>
              <AyText>BDT {trans_amount.toLocaleString()}</AyText>
            </View>
            <View className="flex flex-row justify-between pb-6 border-b border-b-gray-200 ">
              <AyText>Scholarship Service Fee x {qty}</AyText>
              <AyText>BDT {service_charge.toLocaleString()}</AyText>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-gilroybold">Monthly Payable</Text>
              <Text className="font-gilroybold">BDT {total}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="font-gilroybold text-lg my-4">
            Please select your payment method
          </Text>
          <PaymentOptions
            bdtTotal={total}
            intlTotal={stripe_total}
            qty={qty}
            forType="checkout"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const AyText = styled(Text, 'font-gilroymedium');
const ScrollView = styled(RNScrollView, {
  props: {
    contentContainerStyle: true,
  },
});

export default Checkout;
