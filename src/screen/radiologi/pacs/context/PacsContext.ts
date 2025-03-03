import {createContext, useContext} from 'react';
import {type SharedValue} from 'react-native-reanimated';

export const FpsContext = createContext<SharedValue<number> | undefined>(
  undefined,
);
export const FlipXContext = createContext<SharedValue<number> | undefined>(
  undefined,
);
export const ContrastContext = createContext<SharedValue<number> | undefined>(
  undefined,
);
export const BrightnessContext = createContext<SharedValue<number> | undefined>(
  undefined,
);

type PacsSettingItems = {
  fps: SharedValue<number>;
  contrast: SharedValue<number>;
  brightness: SharedValue<number>;
  flipx: SharedValue<number>;
};

export const PacsSettingContext = createContext<PacsSettingItems | undefined>(
  undefined,
);

export const usePacsSettingContext = () => {
  const settings = useContext(PacsSettingContext);

  if (settings === undefined) {
    throw new Error('context not found');
  }

  return settings;
};
