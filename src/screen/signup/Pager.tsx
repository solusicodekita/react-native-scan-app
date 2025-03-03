import React from 'react';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import {StyleSheet, useWindowDimensions} from 'react-native';
import FormDataDiri from './FormDataDiri';
import FormDataAkun from './FormDataAkun';

type PagerProps = {
  offsetX: SharedValue<number>;
};

const Pager = ({offsetX}: PagerProps) => {
  const {width} = useWindowDimensions();

  const nextPage = () => {
    offsetX.value = withTiming(width);
  };

  const prevPage = () => {
    offsetX.value = withTiming(0);
  };

  // tidak menggunakan properti translateX karena
  // tombol tidak men-trigger onPress untuk view diluar viewport
  const offset = useAnimatedStyle(() => ({
    left: -offsetX.value,
  }));

  return (
    <Animated.View
      entering={FadeIn.delay(300)}
      style={[
        StyleSheet.absoluteFill,
        styles.container,
        {width: width * 2},
        offset,
      ]}>
      <FormDataDiri nextPage={nextPage} />
      <FormDataAkun prevPage={prevPage} />
    </Animated.View>
  );
};

export default Pager;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
