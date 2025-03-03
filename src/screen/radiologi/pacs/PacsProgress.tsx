import Slider from '@components/Slider';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

const ProgressBar = ({
  min,
  max,
  progress,
}: {
  min: number;
  max: number;
  progress: SharedValue<number>;
}) => {
  const minimumValue = useSharedValue(min);
  const maximumValue = useSharedValue(max);
  const label = React.useRef<TextInput>(null);
  const updateLabel = (text: string) => {
    label.current?.setNativeProps({text});
  };

  // update label hanya ketika nilai progress adalah bilangan bulat
  useAnimatedReaction(
    () => Math.floor(progress.value),
    (curr, prev) => {
      if (curr !== prev && curr >= min && curr <= max) {
        runOnJS(updateLabel)(curr.toString());
      }
    },
  );

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <TextInput
          ref={label}
          style={styles.label}
          textAlign="center"
          defaultValue={min.toString()}
          editable={false}
          caretHidden
        />
        <TextInput
          style={styles.label}
          textAlign="center"
          defaultValue={max.toString()}
          editable={false}
          caretHidden
        />
      </View>
      <Slider
        style={{overflow: 'visible'}}
        // theme={{
        //   minimumTrackTintColor: 'white',
        //   maximumTrackTintColor: '#ffffff80',
        // }}
        progress={progress}
        min={minimumValue}
        max={maximumValue}
        // thumbWidth={20}
        // renderBubble={() => {}}
      />
    </View>
  );
};

export default React.memo(ProgressBar);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  labelContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: 'white',
    padding: 0,
    minWidth: 20,
  },
});
