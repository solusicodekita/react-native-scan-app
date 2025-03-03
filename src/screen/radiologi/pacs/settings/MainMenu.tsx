import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import SettingLayout from './SettingLayout';
import {SettingPage} from '../PacsConfig';
import Text from '@components/Text';
import {Spacing} from '@constants/theme';
import {useTheme} from '@react-navigation/native';
import {PacsSettingState} from '../PacsViewer';

type ItemProps = {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  value?: SharedValue<number>;
  badge?: (val: number | undefined) => ReactNode;
};

const Item = ({title, badge, value, onPress}: ItemProps) => {
  const {colors} = useTheme();
  const [val, setVal] = useState<number>();

  useAnimatedReaction(
    () => value?.value,
    curr => runOnJS(setVal)(curr),
  );

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: colors.secondary}}
      style={styles.pressable}>
      <Text color="white" style={styles.fillContainer}>
        {title}
      </Text>
      {value === undefined ? null : (
        <Text color="white" align="right">
          {val}
        </Text>
      )}
      {badge ? badge(val) : null}
    </Pressable>
  );
};

const SwitchItem = ({title, value}: ItemProps) => {
  const {colors} = useTheme();
  const [val, setVal] = useState<boolean>();

  useAnimatedReaction(
    () => value?.value,
    curr => (curr ? runOnJS(setVal)(curr > 0) : null),
  );

  return (
    <Pressable
      onPress={() => {
        if (value) {
          value.value = value.value > 0 ? -1 : 1;
        }
      }}
      android_ripple={{color: colors.secondary}}
      style={styles.pressable}>
      <Text color="white" style={styles.fillContainer}>
        {title}
      </Text>
      {value === undefined ? null : (
        <Text color="white" align="right">
          {val}
        </Text>
      )}
      {/* {badge ? badge(val) : null} */}
      <Switch
        pointerEvents="none"
        disabled={true}
        // onValueChange={() => {
        //   if (value) {
        //     value.value = value.value > 0 ? -1 : 1;
        //   }
        // }}
        thumbColor="white"
        value={val}
      />
    </Pressable>
  );
};

const MainMenu = ({
  open,
  setPage,
  settings,
}: {
  open: SharedValue<boolean>;
  setPage: React.Dispatch<React.SetStateAction<SettingPage>>;
  settings: PacsSettingState;
}) => {
  return (
    <SettingLayout open={open}>
      <View>
        <Item title="FPS" value={settings.fps} onPress={() => setPage('Fps')} />
        <Item
          title="Contrast"
          value={settings.contrast}
          onPress={() => setPage('Contrast')}
        />
        <Item
          title="Brightness"
          value={settings.brightness}
          onPress={() => setPage('Brightness')}
        />
        {/* <Item
          title="Flip Horizontal"
          value={settings.flipx}
          badge={() => <Switch onValueChange={setFlipX} value={flipx} />}
          onPress={() => setFlipX(!flipx)}
        /> */}
        <SwitchItem title="Flip Horizontal" value={settings.flipx} />
      </View>
    </SettingLayout>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  pressable: {
    padding: Spacing._4,
    paddingHorizontal: Spacing._8,
    borderColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
