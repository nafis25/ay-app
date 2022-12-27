import React, {useEffect, useRef, useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Flow} from 'react-native-animated-spinkit';

import PhoneInput from 'react-native-phone-number-input';
import {getOtp} from '../requests/AuthRequests';
import {isEmpty} from '../utils/functions';

const EmailInputWrapper = ({setEmail}) => {
  const [email, onChangeEmail] = React.useState(null);

  useEffect(() => {
    setEmail(email);
  }, [email]);

  return (
    <TextInput
      className="border border-gray-200 focus:border-black p-4 rounded font-gilroy"
      onChangeText={onChangeEmail}
      value={email}
      placeholder="Email Address"
      keyboardType="email-address"
      autoComplete="email"
      textContentType="emailAddress"
      autoCapitalize="none"
      autoCorrect="false"
    />
  );
};

const PhoneInputWrapper = ({setPhone}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  useEffect(() => {
    const isValid = phoneInput.current?.isValidNumber(value);
    setPhone(
      isValid ? formattedValue : isEmpty(formattedValue) ? null : 'invalid',
    );
  }, [formattedValue]);

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

const Login = ({navigation}) => {
  const [methodPicked, setMethodPicked] = useState('email');
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  const validateInput = () => {
    let success = true;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const subject = methodPicked === 'email' ? email : phone;

    if (isEmpty(subject)) {
      Toast.show({
        type: 'error',
        text1: `We need your ${methodPicked} to continue`,
      });
      return (success = false);
    }

    if (methodPicked === 'email' && !subject.match(emailRegex)) {
      success = false;
      Toast.show({
        type: 'error',
        text1: `That's an invalid email address`,
      });
    } else if (methodPicked === 'phone' && subject === 'invalid') {
      success = false;
      Toast.show({
        type: 'error',
        text1: `That's an invalid phone number`,
      });
    }

    return success;
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    setIsLoading(true);

    if (!validateInput()) return setIsLoading(false);

    const _userid = methodPicked === 'email' ? email : phone;

    getOtp({userid: _userid})
      .then(async () => {
        navigation.navigate('OTP', {userid: _userid, method: methodPicked});
      })
      .catch(error => {
        console.log(error.response.data);
        error.response.data?.non_field_errors
          ? navigation.navigate('Signup', {
              userid: _userid,
              method: methodPicked,
            })
          : Toast.show({
              type: 'error',
              text1: 'OTP error!',
              text2: 'Failed to fetch an OTP 😓, try again in a bit',
            });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="bg-white h-screen px-4 py-10">
        {/* <AuthNav /> */}
        <View className="flex flex-col gap-4">
          <Text className="font-gilroybold text-xl">Log in or sign up</Text>

          <View>
            <MethodPicker setMethodPicked={setMethodPicked} />
          </View>

          <View>
            {methodPicked === 'email' ? (
              <View>
                <EmailInputWrapper setEmail={setEmail} />
              </View>
            ) : (
              <View>
                <PhoneInputWrapper setPhone={setPhone} />
              </View>
            )}
          </View>

          <Text className="font-gilroy text-xs">
            We'll send an OTP to confirm
          </Text>

          <TouchableOpacity
            className="rounded bg-ay-green flex flex-row justify-center"
            onPress={() => handleLogin()}>
            {isLoading ? (
              <Flow color="white" size={38} className="my-5" />
            ) : (
              <Text className="font-gilroy font-bold uppercase text-white text-center p-4">
                Proceed
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
