import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Rounded, Size, Spacing} from '@constants/theme';
import {useTheme} from '@react-navigation/native';
import {DotLineProps} from './types';

const DotLine = ({isLastItem}: DotLineProps) => {
  const {colors} = useTheme();
  const height = isLastItem ? Spacing._12 : 'auto';

  return (
    <View style={[styles.dotContainer, {height, borderColor: colors.border}]}>
      <View style={[styles.dot, {backgroundColor: colors.primary}]} />
    </View>
  );
};

export default DotLine;

const styles = StyleSheet.create({
  dotContainer: {
    marginLeft: Spacing._4,
    borderLeftWidth: 1,
  },
  dot: {
    width: Size._3,
    height: Size._3,
    marginLeft: -Size._3 / 2 - 0.5,
    marginTop: Spacing._12,
    borderRadius: Rounded.lg,
  },
});
