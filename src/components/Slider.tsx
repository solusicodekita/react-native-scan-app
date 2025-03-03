import React from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

type SliderProps = {
  min: SharedValue<number>;
  max: SharedValue<number>;
  progress: SharedValue<number>;
  style?: ViewStyle;
};

const Slider = ({min, max, progress, style}: SliderProps) => {
  const w = useSharedValue(0); // panjang track dalam satuan unit
  const diff = useDerivedValue(() => max.value - min.value);
  const isPanning = useSharedValue(false); // tanda gesture sedang aktif
  const offset = useSharedValue(0); // nilai offset realtime
  const last = useSharedValue(0); // nilai offset sebelumnya

  /**
   * Mendapatkan panjang dari track
   */
  const onLayout = (event: LayoutChangeEvent) =>
    (w.value = event.nativeEvent.layout.width);

  /**
   * Kalkulasi posisi slider thumb
   */
  const pan = Gesture.Pan()
    .onBegin(() => (isPanning.value = true))
    .onChange(event => {
      const next = last.value + event.translationX;
      offset.value = next < 0 ? 0 : next > w.value ? w.value : next;
      progress.value = (offset.value / w.value) * diff.value + min.value;
    })
    .onEnd(() => {
      last.value = offset.value;
      isPanning.value = false;
    });

  /**
   * Mengatur posisi slider thumb melalui style transform.translateX
   */
  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value - SLIDER_THUMB_SIZE_HALF}],
  }));

  const traceStyle = useAnimatedStyle(() => ({
    width: offset.value,
  }));

  // update thumb ketika progress diubah dari luar komponen ini.
  useAnimatedReaction(
    () => progress.value,
    curr => {
      // mencegah circular update.
      // hanya update offset.value untuk event selain panning
      if (isPanning.value) {
        return;
      }

      // abaikan progress di luar rentang
      if (curr < min.value || curr > max.value) {
        return;
      }

      // konversi nilai progress ke nilai offset
      offset.value = ((curr - min.value) / diff.value) * w.value;

      // update last value untuk perhitungan offset ketika gesture panning
      last.value = offset.value;
    },
  );

  useAnimatedReaction(
    () => w.value,
    curr => {
      offset.value = ((progress.value - min.value) / diff.value) * curr;
      last.value = offset.value;
    },
  );

  return (
    <View style={style}>
      <View onLayout={onLayout} style={styles.track}>
        <Animated.View style={[styles.trackHighlight, traceStyle]} />
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.sliderHandle, sliderStyle]} />
        </GestureDetector>
      </View>
    </View>
  );
};

export default Slider;

const SLIDER_THUMB_SIZE = 15;
const SLIDER_THUMB_SIZE_HALF = SLIDER_THUMB_SIZE / 2;
const TRACK_HEIGHT = 1.5;

const styles = StyleSheet.create({
  track: {
    // padding: TRACK_HEIGHT,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#383838',
  },
  trackHighlight: {
    padding: TRACK_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  sliderHandle: {
    position: 'absolute',
    width: SLIDER_THUMB_SIZE,
    height: SLIDER_THUMB_SIZE,
    borderRadius: SLIDER_THUMB_SIZE,
    backgroundColor: 'white',
  },
});
