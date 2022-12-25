import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {styled} from 'nativewind';
import {SheetManager} from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';

import Images from '@assets/paths';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const PaymentOptions = ({
  containerClass,
  bdtTotal,
  intlTotal,
  qty,
  forType,
}) => {
  const navigation = useNavigation();
  const handleMethod = async method => {
    try {
      const {success, url: _url} = await SheetManager.show('payment-sheet', {
        payload: {method: method, qty: qty, type: forType},
      });

      if (success) {
        navigation.navigate('WebContainer', {
          url: _url,
        });
      } else {
        Toast.show({
          position: 'top',
          type: 'error',
          text1: 'Payment Error!',
          text2: 'We ran into an error, try again',
        });
      }
    } catch (error) {
      console.log(error, 'wtf man');
    }
  };

  return (
    <View className={`flex flex-col gap-4 ${containerClass ?? ''}`}>
      <Pressable
        className="rounded-lg border px-4 py-5"
        onPress={() => handleMethod('card')}>
        <View className="flex flex-col gap-6">
          <View className="flex flex-row justify-between">
            <View className="flex flex-col">
              <Text className="font-gilroybold mb-3">Bangladeshi Card</Text>
              <AyText>BDT {bdtTotal}/month</AyText>
            </View>
            <View className="flex justify-center items-center bg-gray-100 rounded-full h-8 w-8">
              <EvilIcons name="chevron-right" size={30} color={'#1dc468'} />
            </View>
          </View>
          <View className="flex flex-col">
            <AyText className="text-xs text-gray-300 mb-2">
              Accepted cards for monthly payments
            </AyText>
            <View className="flex flex-row gap-1">
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.scb}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.ucb}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.brac}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.ebl}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.prime}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.ific}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.hsbc}
              />
            </View>
          </View>
          <View className="flex flex-row items-center">
            <Ionicons name="shield-checkmark" size={25} color={'#1dc468'} />
            <AyText className="text-xs ml-2">
              Secured payments with Portwallet,{'\n'}
              the payment processor for Robi Axiata Limited
            </AyText>
          </View>
        </View>
      </Pressable>
      <Pressable
        className="rounded-lg border px-4 py-5"
        onPress={() => handleMethod('stripe')}>
        <View className="flex flex-col gap-6">
          <View className="flex flex-row justify-between">
            <View className="flex flex-col">
              <Text className="font-gilroybold mb-3">International Card</Text>
              <AyText>USD {intlTotal}/month</AyText>
            </View>
            <View className="flex justify-center items-center bg-gray-100 rounded-full h-8 w-8">
              <EvilIcons name="chevron-right" size={30} color={'#1dc468'} />
            </View>
          </View>
          <View className="flex flex-col">
            <AyText className="text-xs text-gray-300 mb-2">
              Accepted cards for monthly payments
            </AyText>
            <View className="flex flex-row gap-1">
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.scb}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.ucb}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.brac}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.ebl}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.prime}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.ific}
              />
              <Image
                style={{
                  width: 40,
                  aspectRatio: 3 / 2,
                  resizeMode: 'contain',
                }}
                source={Images.hsbc}
              />
            </View>
          </View>
          <View className="flex flex-row items-center">
            <Ionicons name="shield-checkmark" size={25} color={'#1dc468'} />
            <AyText className="text-xs ml-2">
              Secured payments with Stripe,{'\n'}
              the payment processor for Amazon
            </AyText>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const AyText = styled(Text, 'font-gilroymedium');

export default PaymentOptions;
