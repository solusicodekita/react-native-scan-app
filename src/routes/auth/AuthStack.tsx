import type {AuthStackParamList} from './types';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@src/screen/login/LoginScreen';
import WelcomeScreen from '@src/screen/welcome/WelcomeScreen';
import SignUpScreen from '@src/screen/signup/SignUpScreen';
import {FontSize} from '@constants/theme';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTitleStyle: {fontSize: FontSize.lg},
        headerStyle: {backgroundColor: 'transparent'},
      }}>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Masuk SIPS'}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{title: 'Buat Akun SIPS'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
