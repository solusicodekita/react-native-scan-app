import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Animated, {
  runOnJS,
  SlideInDown,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import Slider from '@components/Slider';
import {LayoutWithSliderProps} from '@routes/pacs/types';
// import {LayoutWithSliderProps} from '@routes/app/types';

// type LayoutWithSliderComponent = ({
//   progress,
//   options,
// }: {
//   progress: SharedValue<number>;
//   options: number[];
// }) => React.JSX.Element;

const LayoutWithSlider = ({navigation, route}: LayoutWithSliderProps) => {
  const suffix = ' FPS';
  const {progress, options} = route.params;
  const min = useSharedValue(route.params.min);
  const max = useSharedValue(route.params.max);
  const label = React.useRef<TextInput>(null);

  /**
   *
   * @param {Number} value fps.value
   */
  const updateLabel = (value: string) => {
    label.current?.setNativeProps({text: value + suffix});
  };

  /**
   * Fungsi menambah fps sebanyak 1 nilai.
   */
  const increment = () => {
    const next = progress.value + 1;
    progress.value =
      next < min.value ? min.value : next > max.value ? max.value : next;
  };

  /**
   * Fungsi mengurangi fps sebanyak 1 nilai.
   */
  const decrement = () => {
    const next = progress.value - 1;
    progress.value =
      next < min.value ? min.value : next > max.value ? max.value : next;
  };

  useAnimatedReaction(
    () => progress.value,
    (curr, prev) => {
      if (curr === prev) {
        return;
      }
      if (curr < min.value) {
        return;
      }
      if (curr > max.value) {
        return;
      }

      runOnJS(updateLabel)(Math.floor(curr).toString());
    },
  );

  return (
    <View style={styles.container}>
      <Pressable style={StyleSheet.absoluteFill} onPress={navigation.goBack} />
      <Animated.View entering={SlideInDown} style={styles.card}>
        <TextInput
          ref={label}
          style={styles.label}
          textAlign="center"
          defaultValue={progress.value + suffix}
          editable={false}
          caretHidden
        />

        <View style={styles.sliderContainer}>
          <Text style={styles.sliderButton} onPress={decrement}>
            -
          </Text>
          <Slider
            min={min}
            max={max}
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
    </View>
  );
};

export default LayoutWithSlider;

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
