import {StyleSheet, Text as RNText} from 'react-native';
import React from 'react';
import {FontSize, FontWeight, Leading, Spacing} from '@constants/theme';
import {Props} from './types/textTypes';

const Text = ({
  mt = '_0',
  mb = '_0',
  ml = '_0',
  fw = 'Regular',
  fs = 'base',
  align = 'left',
  color,
  leading,
  style,
  children,
  ...rest
}: Props) => {
  return (
    <RNText
      style={[
        styles.text,
        {
          fontFamily: FontWeight[fw],
          fontSize: FontSize[fs],
          marginTop: Spacing[mt],
          marginLeft: Spacing[ml],
          marginBottom: Spacing[mb],
          lineHeight: leading ? Leading[leading] : leading,
          color: color,
          textAlign: align,
        },
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {},
});
