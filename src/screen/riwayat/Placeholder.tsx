import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import DotLine from './DotLine';
import BubblePlaceholder from './BubblePlaceholder';
import React, {useEffect} from 'react';
import {FontSize, Leading, Size, Spacing} from '@constants/theme';

const Placeholder = () => {
  const len = 3;
  const item = [];
  const opacity = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({opacity: opacity.value}));

  for (let i = 0; i < len; i++) {
    item.push(
      <View key={i}>
        <View style={styles.container}>
          <DotLine isLastItem={i === len - 1} />
          <BubblePlaceholder />
        </View>
      </View>,
    );
  }

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.3, {duration: 1000}), 0, true);
  }, [opacity]);

  return (
    <Animated.View style={[{padding: Spacing._8}, animStyle]}>
      <View style={styles.sectionTitle} />
      {item}
      <View style={styles.sectionTitle} />
      {item}
    </Animated.View>
  );
};

export default Placeholder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing._4,
  },
  sectionTitle: {
    width: Size._12,
    height: FontSize.base + Leading.normal,
    backgroundColor: 'black',
  },
});
