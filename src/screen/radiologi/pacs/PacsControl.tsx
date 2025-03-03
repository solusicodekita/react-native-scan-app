import {StyleSheet, View} from 'react-native';
import {
  cancelAnimation,
  Easing,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
import PacsPlayButton from './PacsPlayButton';
import Button from '@components/Button';
import GearIcon from '@assets/images/icons/gear.svg';
import ForwardStepIcon from '@assets/images/icons/forward_step.svg';
import BackwardStepIcon from '@assets/images/icons/backward_step.svg';
import {Size, Spacing} from '@constants/theme';
import PacsProgress from './PacsProgress';

type PacsControlProps = {
  min: number;
  max: number;
  index: SharedValue<number>;
  open: SharedValue<boolean>;
  fps: SharedValue<number>;
};

const PacsControl = ({min, max, index, open, fps}: PacsControlProps) => {
  const duration = useDerivedValue(() => 1000 / fps.value);
  const playing = useSharedValue(false);

  /**
   * Mendapatkan nilai yang tidak melebihi rentang min dan max.
   * Ketika melebihi max, maka akan dikembalikan ke nilai min.
   * Ketika kurang dari min, maka akan dikembalikan ke nilai max.
   */
  const warp = (value: number) =>
    value < min ? max : value > max ? min : value;

  const prevFrame = () => {
    index.value = warp(index.value - 1);
  };

  const nextFrame = () => {
    index.value = warp(index.value + 1);
  };

  const play = () => {
    playing.value = true;

    const startValue = index.value === max ? min : index.value;
    index.value = startValue;
    index.value = withTiming(
      max,
      {
        duration: duration.value * (max - startValue),
        easing: Easing.linear,
      },
      () => (playing.value = false),
    );
  };

  const pause = () => {
    playing.value = false;
    cancelAnimation(index);
  };

  return (
    <View style={styles.container}>
      <PacsProgress min={min} max={max} progress={index} />
      <View style={styles.buttonsContainer}>
        <Button
          labelStyle={styles.noGap}
          icon={
            <BackwardStepIcon width={Size._6} height={Size._6} fill={'white'} />
          }
          onPress={prevFrame}
        />
        <PacsPlayButton playing={playing} play={play} pause={pause} />
        <Button
          labelStyle={styles.noGap}
          icon={
            <ForwardStepIcon width={Size._6} height={Size._6} fill={'white'} />
          }
          onPress={nextFrame}
        />
        <Button
          labelStyle={styles.noGap}
          icon={<GearIcon width={Size._6} height={Size._6} fill={'white'} />}
          onPress={() => {
            open.value = true;
          }}
        />
      </View>
    </View>
  );
};

export default PacsControl;

const styles = StyleSheet.create({
  noGap: {
    gap: 0,
  },
  container: {
    // position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    gap: Spacing._4,
    // paddingTop: Spacing._8,
    paddingBottom: Spacing._4,
    // paddingHorizontal: Spacing._8,
    // backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: Size._80,
    marginHorizontal: 'auto',
  },
});
