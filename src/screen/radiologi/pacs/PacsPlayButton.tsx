import React, {useState} from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import Button from '@components/Button';
import PlayIcon from '@assets/images/icons/play.svg';
import PauseIcon from '@assets/images/icons/pause.svg';
import {Size} from '@constants/theme';
import {StyleSheet} from 'react-native';

type PacsPlayButtonProps = {
  playing: SharedValue<boolean>;
  play: Function;
  pause: Function;
};

const PacsPlayButton = ({playing, play, pause}: PacsPlayButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useAnimatedReaction(
    () => playing.value,
    curr => runOnJS(setIsPlaying)(curr),
  );

  return (
    <Button
      labelStyle={styles.noGap}
      icon={
        isPlaying ? (
          <PauseIcon width={Size._6} height={Size._6} fill={'white'} />
        ) : (
          <PlayIcon width={Size._6} height={Size._6} fill={'white'} />
        )
      }
      onPress={() => (isPlaying ? pause() : play())}
    />
  );
};

export default PacsPlayButton;

const styles = StyleSheet.create({
  noGap: {
    gap: 0,
  },
});
