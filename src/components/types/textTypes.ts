import type {FontSize, FontWeight, Leading, Spacing} from '@constants/theme';
import type {ColorValue, StyleProp, TextProps, TextStyle} from 'react-native';

export type Props = TextProps & {
  fw?: keyof typeof FontWeight;
  fs?: keyof typeof FontSize;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  mt?: keyof typeof Spacing;
  mb?: keyof typeof Spacing;
  ml?: keyof typeof Spacing;
  color?: ColorValue | undefined;
  leading?: keyof typeof Leading;
  style?: StyleProp<TextStyle> | undefined;
};
