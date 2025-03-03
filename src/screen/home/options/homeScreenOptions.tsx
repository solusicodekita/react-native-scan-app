import React from 'react';
import {RouteProp} from '@react-navigation/native';
import type {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import type {AppStackParamList} from '@routes/app/types';
import HeaderLeft from '@src/screen/home/header/HeaderLeft';
import HeaderRight from '../header/HeaderRight';

const homeScreenOptions: HomeScreenOptions = ({navigation}) => ({
  title: '',
  headerTitleAlign: undefined,
  headerStyle: {backgroundColor: 'transparent'},
  headerLeft: () => <HeaderLeft navigation={navigation} />,
  headerRight: () => <HeaderRight navigation={navigation} />,
  headerShadowVisible: false,
});

export default homeScreenOptions;

export type HomeScreenNavigation = StackNavigationProp<
  AppStackParamList,
  'HomeScreen',
  undefined
>;

export type HomeScreenOptions =
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<AppStackParamList, 'HomeScreen'>;
      navigation: HomeScreenNavigation;
      theme: ReactNavigation.Theme;
    }) => StackNavigationOptions)
  | undefined;
