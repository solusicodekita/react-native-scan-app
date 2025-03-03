import type {ViewStyle} from 'react-native';
// import type {HeaderProps} from './basicHeaderTypes';

export type BasicLayoutProps = {
  children: React.ReactNode;
  underlayChildren?: React.ReactNode;
  // header?: HeaderProps;
  cardStyle?: ViewStyle;
  underlayStyle?: ViewStyle;
};
