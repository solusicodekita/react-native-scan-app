import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import {Spacing} from '@constants/theme';

const SettingLayout = ({
  open,
  children,
}: {
  open: SharedValue<boolean>;
  children: React.ReactNode;
}) => {
  return (
    <View style={[StyleSheet.absoluteFill, {justifyContent: 'flex-end'}]}>
      <Pressable
        style={[StyleSheet.absoluteFill]}
        onPress={() => {
          open.value = false;
        }}
      />
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={styles.card}>
        {children}
      </Animated.View>
    </View>
  );
};

export default SettingLayout;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    // padding: Spacing._2,
    borderRadius: 25,
    backgroundColor: '#212121',
    overflow: 'hidden',
  },
});
