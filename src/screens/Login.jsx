import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthNav from '../components/Navbars/AuthNav';

import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';

const EmailInputWrapper = () => {
  const [number, onChangeNumber] = React.useState(null);
  return (
    <TextInput
      className="border border-gray-200 p-4 rounded font-gilroy"
      onChangeText={onChangeNumber}
      value={number}
      placeholder="Email Address"
      keyboardType="email-address"
      autoComplete="email"
      textContentType="emailAddress"
      autoCapitalize="none"
      autoCorrect="false"
    />
  );
};

const PhoneInputWrapper = () => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  const styles = StyleSheet.create({
    flagButtonStyle: {
      width: '20%',
    },
    containerStyle: {
      borderWidth: 1,
      borderColor: '#e5e7eb',
      width: '100%',
      borderRadius: 4,
      height: 50,
    },
    textContainerStyle: {
      backgroundColor: 'white',
      borderWidth: 0,
      marginRight: 1,
    },
    codeTextStyle: {
      fontFamily: 'Gilroy',
      fontWeight: '300',
    },
    textInputStyle: {fontFamily: 'Gilroy'},
  });

  return (
    <PhoneInput
      ref={phoneInput}
      // flagButtonStyle={styles.flagButtonStyle}
      // countryPickerButtonStyle={styles.countryPickerButtonStyle}
      // containerStyle={styles.containerStyle}
      // textContainerStyle={styles.textContainerStyle}
      // textInputStyle={styles.textInputStyle}
      // codeTextStyle={styles.codeTextStyle}
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

const MethodPicker = ({setMethodPicked}) => {
  const [method, setMethod] = useState('email');

  useEffect(() => {
    setMethodPicked(method);
  }, [method]);

  return (
    <View className="flex flex-row">
      <View className="flex flex-row rounded border border-gray-200 text-sm font-medium text-center">
        <Pressable
          className={`py-3 px-4 ${
            method === 'email'
              ? 'border border-ay-green rounded'
              : 'border-none'
          } `}
          onPress={() => setMethod('email')}>
          <Text
            className={`font-gilroy ${
              method === 'email'
                ? 'font-bold text-ay-green'
                : 'font-light text-gray-200'
            }`}>
            Email
          </Text>
        </Pressable>
        <Pressable
          className={`py-3 px-4 ${
            method === 'phone'
              ? 'border border-ay-green rounded'
              : 'border-none'
          }`}
          onPress={() => setMethod('phone')}>
          <Text
            className={`font-gilroy ${
              method === 'phone'
                ? 'font-bold text-ay-green'
                : 'font-light text-gray-200'
            }`}>
            Phone
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Login = () => {
  const navigation = useNavigation();
  const [methodPicked, setMethodPicked] = useState('email');
  return (
    <View className="bg-white h-screen px-4 py-10">
      {/* <AuthNav /> */}
      <View className="flex flex-col gap-4">
        <Text className="font-gilroy font-semibold text-xl">
          Log in or sign up
        </Text>

        <View>
          <MethodPicker setMethodPicked={setMethodPicked} />
        </View>

        <View>
          {methodPicked === 'email' ? (
            <View>
              <EmailInputWrapper />
            </View>
          ) : (
            <View>
              <PhoneInputWrapper />
            </View>
          )}
        </View>

        <Text className="font-gilroy text-xs">
          We'll send an OTP to confirm
        </Text>

        <TouchableOpacity
          className="rounded bg-ay-green"
          onPress={() =>
            navigation.navigate('Signup', {email: 'nfs_555@yahoo.com'})
          }>
          <Text className="font-gilroy uppercase font-bold text-white p-4 text-center">
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
