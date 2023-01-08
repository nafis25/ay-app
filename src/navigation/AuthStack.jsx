import React, {useContext, useEffect} from 'react';
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
import {ActivityIndicator, Platform, View} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {checkOnboarding, hasOnboarded, onboardLoading} =
    useContext(AuthContext);

  useEffect(() => {
    checkOnboarding();
  }, []);

  console.log(hasOnboarded);

  if (onboardLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#1dc468',
        headerTitle: () => <AYWhiteLogo width={150} fill={'#1dc468'} />,
      }}>
      {hasOnboarded ? (
        <>
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
        </>
      ) : (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name="OnboardingComplete"
            component={OnboardingCompleteScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
