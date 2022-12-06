import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-number-input';
import Counter from '../components/Counter';
import {BDT_TOTAL} from '../config';

const PhoneInputWrapper = () => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  const styles = StyleSheet.create({
    textContainerStyle: {},
    codeTextStyle: {},
    textInputStyle: {},
  });

  return (
    <PhoneInput
      ref={phoneInput}
      textContainerStyle={styles.textContainerStyle}
      textInputStyle={styles.textInputStyle}
      codeTextStyle={styles.codeTextStyle}
      defaultCode="BD"
      layout="first"
      onChangeText={text => {
        setValue(text);
      }}
      onChangeFormattedText={text => {
        setFormattedValue(text);
      }}
    />
  );
};

const Signup = ({route}) => {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const email = route.params?.email;

  return (
    <View className="bg-white h-screen px-4 py-10">
      <View className="flex gap-3">
        <View className="flex flex-row justify-center items-center text-xl pb-3">
          <Text className="font-gilroy text-xl font-bold">
            Join the{' '}
            <Text className="text-ay-green">#alteryouthrevolution</Text>
          </Text>
        </View>

        <TextInput
          className="border border-gray-200 p-4 rounded font-gilroy"
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />

        <View>
          <PhoneInputWrapper />
        </View>

        <View className="flex flex-row items-end justify-between pt-5">
          <View>
            <Text className="font-gilroy font-bold pb-4">
              Number of scholarships
            </Text>
            <Counter updateQty={setQty} />
          </View>
          <Text className="font-gilroybold text-xl leading-5">
            BDT {BDT_TOTAL * qty}/
            <Text className="font-gilroymedium">month</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Signup;
