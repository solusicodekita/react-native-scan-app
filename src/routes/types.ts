import {NavigatorScreenParams} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamList} from './app/types';
import {AuthStackParamList} from './auth/types';
import {DetailRiwayatResponse} from '@store/api/sips/types';

export type RootStackParamList = {
  Router:
    | NavigatorScreenParams<AuthStackParamList>
    | NavigatorScreenParams<AppStackParamList>;
  // modal hasil periksa
  HasilPeriksaScreen: {hasilPeriksa: DetailRiwayatResponse[] | string};
  BottomAlert: {text: String};
};

/**
 * default types for useNavigation, Link, ref, etc...
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouterProps = StackScreenProps<RootStackParamList, 'Router'>;

export type HasilPeriksaScreenProps = StackScreenProps<
  RootStackParamList,
  'HasilPeriksaScreen'
>;

export type BottomAlertProps = StackScreenProps<
  RootStackParamList,
  'BottomAlert'
>;
