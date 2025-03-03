import React, {type ReactNode, useEffect} from 'react';
import {ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const Container = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) => {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({opacity: opacity.value}));

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.3, {duration: 1000}), 0, true);
  }, [opacity]);

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export default Container;
