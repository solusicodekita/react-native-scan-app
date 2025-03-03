import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import SettingLayout from './SettingLayout';
import SettingWithSlider from './SettingWithSlider';

const Brightness = ({
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
        options={[0, 0.25, 0.5, 0.75, 1]}
        min={-1}
        max={1}
        step={0.01}
      />
    </SettingLayout>
  );
};

export default Brightness;
