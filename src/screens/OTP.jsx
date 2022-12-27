import {Text, TouchableOpacity, View} from 'react-native';
import AntD from 'react-native-vector-icons/AntDesign';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useContext, useEffect, useState} from 'react';
import {verifyOtp} from '../requests/AuthRequests';
import {AuthContext} from '../contexts/AuthContext';
import Toast from 'react-native-toast-message';

const OTP = ({route, navigation}) => {
  const {login} = useContext(AuthContext);

  const method = route.params?.method;
  const userid = route.params?.userid;

  const [counter, setCounter] = useState(59);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleOTP = code => {
    let data = {otp: code, userid: userid};

    verifyOtp(data)
      .then(async response => {
        try {
          await login(response.data);
        } catch (err) {
          Toast.show({
            type: 'error',
            text1: 'OTP Error',
            text2: 'Try requesting another code',
          });
        }
      })
      .catch(error => setErrored(true));
  };
  const handleResend = () => {};
  return (
    <SafeAreaView className="bg-white h-screen px-5">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4 ">
        <AntD name="close" color={'black'} size={25} />
      </TouchableOpacity>
      <View className="">
        <Text className="font-gilroybold text-xl text-center mb-4">
          Is this really you?
        </Text>

        <Text className="font-gilroymedium leading-5 mb-3">
          Enter the code we've sent via {method} to {userid}
        </Text>

        <View className="flex flex-row justify-center mb-6">
          <OTPInputView
            style={{width: '60%', height: 50}}
            codeInputFieldStyle={{
              borderRadius: 7,
              color: 'black',
              borderColor: errored ? '#FF0000' : '#F1F2F3',
            }}
            onCodeChanged={() => setErrored(false)}
            codeInputHighlightStyle={{borderColor: '#1dc468'}}
            pinCount={4}
            onCodeFilled={code => handleOTP(code)}
          />
        </View>
        <Text className="font-gilroymedium">
          Haven't received {method === 'phone' ? 'a text' : 'an email'} yet?{' '}
          {counter === 0 ? (
            <Text className="font-gilroybold underline text-ay-green">
              Send again
            </Text>
          ) : (
            <Text>
              Try again in 00:{counter < 10 ? '0' : ''}
              {counter}
            </Text>
          )}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OTP;
