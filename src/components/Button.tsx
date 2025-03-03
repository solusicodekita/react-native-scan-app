import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Text from './Text';
import {ButtonProps} from './types/buttonTypes';
import {useTheme} from '@react-navigation/native';
import {Size, Spacing} from '@constants/theme';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ButtonBase = (props: ButtonProps) => {
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = React.useState<boolean | undefined>(false);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: props.isDisabled?.value ? 0.5 : 1,
  }));

  const animatedPressableProps = useAnimatedProps<PressableProps>(() => ({
    disabled: props.isDisabled?.value || props.isLoading?.value,
  }));

  useAnimatedReaction(
    () => props.isLoading?.value,
    curr => runOnJS(setIsLoading)(curr),
  );

  return (
    <Animated.View
      style={[styles.container, props.containerStyle, animatedContainerStyle]}>
      <AnimatedPressable
        android_ripple={{
          color: colors.secondary,
          ...props.rippleConfig,
        }}
        animatedProps={animatedPressableProps}
        {...props}>
        <View style={[styles.contentContainer, props.contentContainerStyle]}>
          <View style={[styles.label, props.labelStyle]}>
            {isLoading ? <ActivityIndicator /> : props.icon}
            <View style={[styles.text, props.textStyle]}>
              {typeof props.children === 'string' ? (
                <Text
                  fw="Medium"
                  fs="sm"
                  style={[styles.text, props.textStyle]}>
                  {props.children}
                </Text>
              ) : (
                props.children
              )}
            </View>
          </View>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
};

const Button = (props: ButtonProps) => {
  const {colors} = useTheme();

  switch (props.mode) {
    case 'outlined':
      return (
        <ButtonBase
          {...props}
          containerStyle={[
            styles.border1,
            {borderColor: colors.primary},
            props.containerStyle,
          ]}
          textStyle={[{color: colors.primary}, props.textStyle]}>
          {props.children}
        </ButtonBase>
      );
    case 'contained':
      return (
        <ButtonBase
          {...props}
          containerStyle={[
            // styles.border1,
            {
              //   borderColor: colors.primary,
              backgroundColor: colors.primary,
            },
            props.containerStyle,
          ]}>
          {props.children}
        </ButtonBase>
      );
    default: // case 'text'
      return (
        <ButtonBase
          {...props}
          textStyle={[{color: colors.primary}, props.textStyle]}>
          {props.children}
        </ButtonBase>
      );
  }
};

export default Button;

const styles = StyleSheet.create({
  faint: {
    opacity: 0.5,
  },
  opaque: {
    opacity: 1,
  },
  container: {
    width: Size.auto,
    maxWidth: Size._72,
    borderRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: Spacing._4,
  },
  label: {
    gap: Spacing._2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    flexShrink: 1,
    color: 'white',
  },
  border1: {
    borderWidth: 1,
  },
});
