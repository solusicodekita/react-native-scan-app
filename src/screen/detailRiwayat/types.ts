import type {ReactNode} from 'react';
import type {ViewStyle} from 'react-native';

export type TileProps = {
  icon: ReactNode;
  title: string;
  content: string;
  style?: ViewStyle;
  textContainerStyle?: ViewStyle;
};
