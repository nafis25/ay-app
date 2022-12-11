import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import Counter from '../components/Counter';
import {BDT_TOTAL} from '../config';
import {Flow} from 'react-native-animated-spinkit';
import {getOtp, userCreate} from '../requests/AuthRequests';
import Toast from 'react-native-toast-message';
import {isEmpty} from '../utils/functions';
import {useNavigation} from '@react-navigation/native';
import {setInitRoute} from '../requests/TokenHandler';

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

const Signup = ({route}) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const method = route.params?.method;
  const userid = route.params?.userid;

  const [qty, setQty] = useState(1);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const validateInput = () => {
    let success = true;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const methodPicked = method === 'email' ? 'phone' : 'email';
    const subject = methodPicked === 'email' ? email : phone;

    if (isEmpty(subject) || isEmpty(name)) {
      Toast.show({
        type: 'error',
        text1: `We need your name & ${methodPicked} to continue`,
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

  const handleSignup = () => {
    Keyboard.dismiss();
    setIsLoading(true);

    if (!validateInput()) return setIsLoading(false);

    let payload = {};

    payload.name = name;
    payload.email = method === 'email' ? userid : email;
    payload.phone = method === 'phone' ? userid : phone;
    payload.number_of_students = qty;
    payload.invite_code = 'first700';

    console.log('sending this', payload);

    userCreate(payload)
      .then(response => {
        if (response.status === 201) {
          getOtp({userid: userid})
            .then(async () => {
              await setInitRoute('Checkout');
              navigation.navigate('OTP', {userid: userid, method: method});
            })
            .catch(error => {
              console.error(error);
              Toast.show({
                type: 'error',
                text1: 'OTP error!',
                text2: 'Failed to fetch an OTP 😓, try again in a bit',
              });
            });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Signup error!',
            text2: 'Failed to create your account 😓',
          });
        }
      })
      .catch(error => {
        console.error(error.response?.data);

        Toast.show({
          type: 'error',
          text1: 'Signup error!',
          text2: `Looks like that ${
            error.response?.data?.email ? 'email' : 'phone number'
          } is already taken 😧`,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="bg-white h-screen px-4 py-10">
        <View className="flex gap-3">
          <View className="flex flex-row justify-center items-center text-xl pb-3">
            <Text className="font-gilroy text-xl font-bold">
              Join the{' '}
              <Text className="text-ay-green">#alteryouthrevolution</Text>
            </Text>
          </View>

          <TextInput
            className="border border-gray-200 focus:border-black p-4 rounded font-gilroy"
            onChangeText={setName}
            value={name}
            placeholder="Name"
            autoCapitalize="words"
            autoComplete="name"
            autoCorrect={false}
            textContentType="name"
          />

          <View>
            {method === 'email' ? (
              <View>
                <PhoneInputWrapper setPhone={setPhone} />
              </View>
            ) : (
              <View>
                <EmailInputWrapper setEmail={setEmail} />
              </View>
            )}
          </View>

          <View className="flex flex-row items-end justify-between py-3">
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

          <TouchableOpacity
            className="rounded bg-ay-green flex flex-row justify-center"
            onPress={() => handleSignup()}>
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

export default Signup;
