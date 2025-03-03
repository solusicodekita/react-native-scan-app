import React from 'react';
import Text from '@components/Text';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Rounded, Size, Spacing} from '@constants/theme';
import Animated, {
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';

type PaginasiProps = {
  offsetX: SharedValue<number>;
};

const Paginasi = ({offsetX}: PaginasiProps) => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const opacityRange = [0.5, 1];
  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(offsetX.value, [0, width], opacityRange),
  }));
  const opacityReverse = useAnimatedStyle(() => ({
    opacity: interpolate(offsetX.value, [width, 0], opacityRange),
  }));

  return (
    <View style={styles.paginasi}>
      <Animated.View style={[styles.paginasi_item, opacityReverse]}>
        <View style={styles.paginasi_item_no}>
          <Text
            fw="SemiBold"
            fs="sm"
            align="center"
            leading="_7"
            color={colors.primary}>
            1
          </Text>
        </View>
        <Text fs="sm" fw="Medium" color="white">
          Data Diri
        </Text>
      </Animated.View>

      <Animated.View style={[styles.paginasi_item, opacity]}>
        <View style={styles.paginasi_item_no}>
          <Text
            fw="SemiBold"
            fs="sm"
            align="center"
            leading="_7"
            color={colors.primary}>
            2
          </Text>
        </View>
        <Text fs="sm" fw="Medium" color="white">
          Data Akun
        </Text>
      </Animated.View>
    </View>
  );
};

export default Paginasi;

const styles = StyleSheet.create({
  paginasi: {
    margin: 'auto',
    maxWidth: Size._96,
    flexDirection: 'row',
    gap: Spacing._4,
    padding: Spacing._4,
    paddingTop: 0,
  },
  paginasi_item: {
    flex: 1,
    gap: Spacing._2,
    alignItems: 'center',
    flexDirection: 'row',
    padding: Spacing._2,
    borderRadius: Rounded._2xl,
  },
  paginasi_item_no: {
    width: Size._8,
    height: Size._8,
    padding: Spacing._1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: Rounded.lg,
  },
});
