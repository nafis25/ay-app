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
      <Stack.Screen name="Login" component={LoginScreen} />
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
      />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
