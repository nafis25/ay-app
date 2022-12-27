import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import WebView from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Flow} from 'react-native-animated-spinkit';

const WebContainer = ({route, navigation}) => {
  const {url} = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const testUrls = {
    checkoutSuccess:
      'https://alteryouth.com/payment?success=true&status=ACCEPTED&monthly=0',
    checkoutFail:
      'https://alteryouth.com/payment?success=false&status=REJECTED&monthly=0',
    monthlySuccess:
      'https://alteryouth.com/payment?success=true&status=ACCEPTED&monthly=1',
    monthlyFail:
      'https://alteryouth.com/payment?success=false&status=REJECTED&monthly=1',
  };

  const handleWebViewNavigationStateChange = newNavState => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const {url} = newNavState;
    if (!url) return;

    if (url.includes('alteryouth')) {
      if (url.includes('success=true') || url.includes('ACCEPTED')) {
        if (url.includes('monthly=1'))
          return navigation.navigate('Portal', {
            screen: 'My Scholarships',
            params: {
              screen: 'Payment',
            },
          });

        return navigation.navigate('Portal', {
          screen: 'Congratulations',
        });
      }
      if (url.includes('success=false') || url.includes('REJECTED')) {
        const searchParams = new URL(url).searchParams;
        return navigation.navigate('Portal', {
          screen: 'PaymentFail',
          params: {
            toPayment: url.includes('monthly=1') ? true : false,
            errorCode: searchParams.get(code) ?? null,
          },
        });
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View className="overflow-hidden pb-1">
        {isLoading ? (
          <View className="flex flex-row justify-center bg-white shadow-sm px-5">
            <Flow color="#1dc468" size={38} className="my-5" />
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between bg-white shadow-sm px-5">
            <Text className="font-gilroymedium text-lg pt-1">Make Payment</Text>
            <Pressable className="my-2 p-1" onPress={() => navigation.goBack()}>
              <EvilIcons name="close" color={'#1dc468'} size={30} />
            </Pressable>
          </View>
        )}
      </View>

      <WebView
        source={{uri: url ?? 'https://alteryouth.com'}}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        androidLayerType={'hardware'}
        onLoadEnd={() => setIsLoading(false)}
      />
    </SafeAreaView>
  );
};

export default WebContainer;
