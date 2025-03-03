import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import SettingLayout from './SettingLayout';
import SettingWithSlider from './SettingWithSlider';

const Fps = ({
  open,
  progress,
}: {
  open: SharedValue<boolean>;
  progress: SharedValue<number>;
}) => {
  return (
    <SettingLayout open={open}>
      <SettingWithSlider
        progress={progress}
        options={[1, 10, 25, 30, 60]}
        min={1}
        max={100}
        suffix="FPS"
      />
    </SettingLayout>
  );
};

export default Fps;
