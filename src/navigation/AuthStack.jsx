import React from 'react';
import {
  createNativeStackNavigator,
  TransitionPresets,
} from '@react-navigation/native-stack';
import {
  LoginScreen,
  OnboardingScreen,
  SignupScreen,
  OtpScreen,
  OnboardingCompleteScreen,
} from '../screens';
import AYWhiteLogo from '../../assets/svgs/logos/alteryouth_white.svg';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#1dc468',
        headerTitle: () => <AYWhiteLogo width={150} fill={'#1dc468'} />,
      }}>
      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="OTP"
        component={OtpScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
          ...(Platform.OS === 'android' &&
            TransitionPresets.ModalPresentationIOS),
        }}
      /> */}
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen
          name="OnboardingComplete"
          component={OnboardingCompleteScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;
