import {StyleSheet, View, type ViewStyle} from 'react-native';
import React from 'react';
import {randomInt} from '@src/helpers/helpers';
import {FontSize, Leading, Rounded, Size} from '@constants/theme';

const Word = ({
  style,
  min = Size._10,
  max = Size._28,
  fs = 'base',
}: {
  style?: ViewStyle;
  min?: number;
  max?: number;
  fs?: keyof typeof FontSize;
}) => {
  return (
    <View
      style={[
        {
          width: randomInt(min, max),
          height: FontSize[fs],
        },
        styles.word,
        style,
      ]}
    />
  );
};

export default Word;

const styles = StyleSheet.create({
  word: {
    height: FontSize.base + Leading.normal,
    backgroundColor: 'black',
    borderRadius: Rounded.md,
  },
});
