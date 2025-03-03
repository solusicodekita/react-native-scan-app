import type {Props} from './types/textInputTypes';
import {StyleSheet, View, TextInput as RNTextInput} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import {FontSize, FontWeight, Rounded, Spacing} from '@constants/theme';
import {useTheme} from '@react-navigation/native';

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

const TextInput = (props: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.containerStyle,
        {borderColor: colors.primary},
        props.containerStyle,
      ]}>
      <AnimatedTextInput
        style={[
          styles.textInput,
          {color: colors.primary},
          props.textInputStyle,
        ]}
        multiline={false}
        numberOfLines={1}
        {...props}
      />
      {props.icon}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    borderWidth: 1,
    borderRadius: Rounded['_2.5xl'],
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    fontFamily: FontWeight.Medium,
    fontSize: FontSize.lg,
    paddingVertical: Spacing['_3.5'],
    paddingHorizontal: Spacing._5,
    lineHeight: FontSize['3xl'],
  },
});
