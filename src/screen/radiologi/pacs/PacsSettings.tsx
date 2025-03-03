import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
// import {PacsSettingsProps} from '@routes/app/types';
import Animated, {SlideInDown} from 'react-native-reanimated';
import Button from '@components/Button';
import {PacsSettingsProps} from '@routes/pacs/types';
// import Text from '@components/Text';
import {usePacsSettingContext} from './context/PacsContext';

const PacsSettings = ({
  navigation,
}: // route
PacsSettingsProps) => {
  const settings = usePacsSettingContext();
  // if (settings) {
  //   return <Text fs="4xl">Hello: {settings.fps.value}</Text>;
  // } else {
  //   return <Text fs="4xl">Belum ada setting</Text>;
  // }
  // const ready = useAfterTransition();
  console.log(Date.now(), 'setting rendered');
  return (
    <View style={styles.container}>
      {/* <Text color={'white'}>PacsSettings</Text> */}
      <Pressable style={StyleSheet.absoluteFill} onPress={navigation.goBack} />
      <Animated.View style={styles.card}>
        <Button
          contentContainerStyle={{alignItems: 'flex-start'}}
          textStyle={{color: 'white'}}
          // onPress={() => {
          //   navigation.replace('Fps', {fps: settings.fps});
          // }}
        >
          FPS
        </Button>
        <Button
          contentContainerStyle={{alignItems: 'flex-start'}}
          textStyle={{color: 'white'}}
          onPress={() => {
            navigation.replace('LayoutWithSlider', {
              progress: settings.contrast,
              options: [0, 0.25, 0.5, 0.75, 1],
              min: 0,
              max: 2,
            });
          }}>
          Contrast
        </Button>
        <Button
          contentContainerStyle={{alignItems: 'flex-start'}}
          textStyle={{color: 'white'}}
          onPress={() => {
            navigation.replace('LayoutWithSlider', {
              progress: settings.brightness,
              options: [0, 0.25, 0.5, 0.75, 1],
              min: -1,
              max: 1,
            });
          }}>
          Brightness
        </Button>
        <Button
          contentContainerStyle={{alignItems: 'flex-start'}}
          textStyle={{color: 'white'}}
          // onPress={() => {
          //   navigation.replace('LayoutWithSlider', {
          //     progress: settings.flipx,
          //     options: [],
          //     min: 0,
          //     max: 1,
          //   });
          // }}
        >
          Flip Horizontal
        </Button>
        {/* {ready ? <Text>Pacs Setting</Text> : null} */}
      </Animated.View>
    </View>
  );
};

export default PacsSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrapper: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  card: {
    // gap: 30,
    margin: 10,
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#212121',
  },
});
