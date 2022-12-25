import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import WebView from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Flow} from 'react-native-animated-spinkit';

const WebContainer = ({route, navigation}) => {
  const {url} = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const handleWebViewNavigationStateChange = newNavState => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const {url, loading} = newNavState;
    if (!url) return;

    loading ? setIsLoading(true) : setIsLoading(false);

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
      if (url.includes('success=false') || url.includes('REJECTED'))
        return navigation.navigate('Portal', {
          screen: 'PaymentFail',
          params: {
            toPayment: url.includes('monthly=1') ? true : false,
          },
        });

      // else {
      //   if (props.route.params.from == 'payment') {
      //     const redirectTopay = navigation.navigate('rootHome', {
      //       step: '5',
      //       payment: true,
      //     });
      //   } else {
      //     const redirectTopay = navigation.navigate('checkout');
      //   }
      // }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View className="overflow-hidden pb-1">
        <View
          className={`flex flex-row ${
            isLoading ? 'justify-center' : 'justify-end'
          } bg-white shadow-sm px-5`}>
          {isLoading ? (
            <Flow color="#1dc468" size={38} className="my-5" />
          ) : (
            <Pressable className="my-2 p-1" onPress={() => navigation.goBack()}>
              <EvilIcons name="close" color={'#1dc468'} size={30} />
            </Pressable>
          )}
          {/* <EvilIcons name="chevron-left" color={'#1dc468'} size={40} /> */}
        </View>
      </View>

      <WebView
        source={{uri: url ?? 'https://alteryouth.com/about'}}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        androidLayerType={'hardware'}
        onLoadEnd={() => setIsLoading(false)}
      />
    </SafeAreaView>
  );
};

export default WebContainer;
