import type {
  PressableAndroidRippleConfig,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type {SharedValue} from 'react-native-reanimated';

export type Mode = 'text' | 'contained' | 'outlined';

export type ButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  rippleConfig?: PressableAndroidRippleConfig;
  mode?: Mode;
  isLoading?: SharedValue<boolean>;
  isDisabled?: SharedValue<boolean>;
} & PressableProps;
