import type {ReactNode} from 'react';
import type {ScrollViewProps, ViewStyle} from 'react-native';

export type BasicHeaderProps = {title: String};

export type HeaderProps = BasicHeaderProps | ReactNode;

export type CoordinatorLayoutProps = {
  underlayChildren?: React.ReactNode;
  children: React.ReactNode;
  hasHeader?: boolean;
  cardStyle?: ViewStyle;
  underlayStyle?: ViewStyle;
  refreshControl?: (headerHeight: number) => ScrollViewProps['refreshControl'];
};
