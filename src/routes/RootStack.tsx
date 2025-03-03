import type {RootStackParamList} from './types';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import BottomAlert from '@components/BottomAlert';
import Router from './router/Router';
import theme from '@constants/theme';
import BaseLayout from '@components/BaseLayout';
import HasilPeriksaScreen from '@src/screen/hasilPeriksa/HasilPeriksa';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <NavigationContainer theme={theme as ReactNavigation.Theme}>
      <Stack.Navigator layout={BaseLayout}>
        <Stack.Screen
          name="Router"
          component={Router}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HasilPeriksaScreen"
          component={HasilPeriksaScreen}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="BottomAlert"
          component={BottomAlert}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            // cardOverlayEnabled: true,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
