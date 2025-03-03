import type {TextInputProps, ViewStyle} from 'react-native';
import type {AnimatedProps} from 'react-native-reanimated';

export type Props = AnimatedProps<TextInputProps> & {
  icon?: React.ReactNode;
  textInputStyle?: TextInputProps;
  containerStyle?: ViewStyle;
};
