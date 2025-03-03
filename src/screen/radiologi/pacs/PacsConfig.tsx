import React, {ReactNode, useState} from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import Fps from './settings/Fps';
import MainMenu from './settings/MainMenu';
import {PacsSettingState} from './PacsViewer';
import Contrast from './settings/Contrast';
import Brightness from './settings/Brightness';

const PacsConfig = ({
  open,
  settings,
}: {
  open: SharedValue<boolean>;
  settings: PacsSettingState;
}) => {
  const initial = 'MainMenu';
  const [show, setShow] = useState<boolean>();
  const [page, setPage] = useState<SettingPage>(initial);
  const pages: Pages = {
    MainMenu: <MainMenu open={open} setPage={setPage} settings={settings} />,
    Fps: <Fps open={open} progress={settings.fps} />,
    Contrast: <Contrast open={open} progress={settings.contrast} />,
    Brightness: <Brightness open={open} progress={settings.brightness} />,
  };

  useAnimatedReaction(
    () => open.value,
    curr => {
      // console.log('open', curr);
      runOnJS(setShow)(curr);
      if (!curr) {
        runOnJS(setPage)(initial);
      }
    },
  );

  return show ? (page ? pages[page] : null) : null;
};

export default PacsConfig;

export type SettingPage =
  | 'MainMenu'
  | 'Fps'
  | 'Contrast'
  | 'Brightness'
  | undefined;
export type Pages = {[key in Exclude<SettingPage, undefined>]: ReactNode};
