import {SharedValue} from 'react-native-reanimated';

export type PacsSettings = {
  fps: SharedValue<number>;
  flipx: SharedValue<number>;
  contrast: SharedValue<number>;
  brightness: SharedValue<number>;
};
export type PacsSettings2 = {
  fps: number;
  flipx: number;
  contrast: number;
  brightness: number;
};
