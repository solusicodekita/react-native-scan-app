import {Platform, StatusBar} from 'react-native';

const DEFAULT_STATUS_BAR_HEIGHT = 20;
export const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios'
    ? DEFAULT_STATUS_BAR_HEIGHT
    : StatusBar.currentHeight
    ? StatusBar.currentHeight
    : DEFAULT_STATUS_BAR_HEIGHT;
