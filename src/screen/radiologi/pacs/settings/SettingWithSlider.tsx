import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Animated, {
  runOnJS,
  SharedValue,
  SlideInDown,
  SlideOutDown,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import Slider from '@components/Slider';

const SettingWithSlider = ({
  min,
  max,
  progress,
  options,
  suffix,
  step = 1,
}: {
  min: number;
  max: number;
  progress: SharedValue<number>;
  options: number[];
  suffix?: string;
  step?: number;
}) => {
  const _min = useSharedValue(min);
  const _max = useSharedValue(max);
  const label = React.useRef<TextInput>(null);

  /**
   *
   * @param {Number} value fps.value
   */
  const updateLabel = (value: string) => {
    label.current?.setNativeProps({text: value + (suffix ? ' ' + suffix : '')});
  };

  /**
   * Fungsi menambah fps sebanyak 1 nilai.
   */
  const increment = () => {
    const next = progress.value + step;
    progress.value =
      next < _min.value ? _min.value : next > _max.value ? _max.value : next;
  };

  /**
   * Fungsi mengurangi fps sebanyak 1 nilai.
   */
  const decrement = () => {
    const next = progress.value - step;
    progress.value =
      next < _min.value ? _min.value : next > _max.value ? _max.value : next;
  };

  useAnimatedReaction(
    () => progress.value,
    (curr, prev) => {
      if (curr === prev) {
        return;
      }
      if (curr < _min.value) {
        return;
      }
      if (curr > _max.value) {
        return;
      }

      runOnJS(updateLabel)(Math.floor(curr).toString());
    },
  );

  return (
    // <View style={styles.container}>
    // {/* <Pressable style={StyleSheet.absoluteFill} onPress={navigation.goBack} /> */}
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={styles.card}>
      <TextInput
        ref={label}
        style={styles.label}
        textAlign="center"
        defaultValue={progress.value + (suffix ? ' ' + suffix : '')}
        editable={false}
        caretHidden
      />

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderButton} onPress={decrement}>
          -
        </Text>
        <Slider
          min={_min}
          max={_max}
          progress={progress}
          style={styles.fillContainer}
        />
        <Text style={styles.sliderButton} onPress={increment}>
          +
        </Text>
      </View>

      <View style={styles.buttons}>
        {options.map((value, index) => (
          <Text
            key={index}
            style={styles.button}
            onPress={() => (progress.value = value)}>
            {value}
          </Text>
        ))}
      </View>
    </Animated.View>
    // </View>
  );
};

export default SettingWithSlider;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    gap: 30,
    margin: 10,
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#212121',
  },
  label: {
    padding: 0,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  sliderContainer: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderButton: {
    width: 40,
    height: 40,
    fontSize: 30,
    lineHeight: 41,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: 'white',
    borderRadius: 100,
    backgroundColor: '#383838',
  },
  buttons: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    // minWidth: 50,
    paddingTop: 7,
    paddingBottom: 5,
    borderRadius: 25,
    backgroundColor: '#383838',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});
