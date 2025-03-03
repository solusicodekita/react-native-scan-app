import type {DetailRiwayatResponse} from '@store/api/sips/types';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Pressable, StyleSheet, View, type ViewStyle} from 'react-native';
import Text from '@components/Text';
import {Spacing} from '@constants/theme';

const Item = ({
  item,
  index,
  jumlah,
}: {
  item: DetailRiwayatResponse;
  index: number;
  jumlah: number;
}) => {
  const {colors} = useTheme();
  const borderBottomWidth = jumlah > 0 && index < jumlah - 1 ? 1 : 0;

  const height = useSharedValue<ViewStyle['height']>(0);
  const animatedStyle = useAnimatedStyle(() => ({height: height.value}));
  const toggleExpand = () => {
    height.value = height.value === 0 ? 'auto' : 0;
  };

  return (
    <View
      key={index}
      style={{
        borderBottomWidth,
        borderColor: colors.border,
      }}>
      <Pressable
        style={styles.pressable}
        android_ripple={{color: colors.secondary}}
        onPress={toggleExpand}>
        <Text style={styles.fillContainer}>{item.test_name}</Text>
        <View style={{}}>
          <Text fw="SemiBold" color={colors.primary} align="right">
            {item.result}
          </Text>
          <Text fs="sm" align="right" color={colors.textMuted}>
            {item.test_units_name}
          </Text>
        </View>
      </Pressable>

      <Animated.View style={[styles.descriptionContainer, animatedStyle]}>
        <View style={[{borderColor: colors.border}, styles.descriptionItem]}>
          <Text color={colors.textMuted}>Nilai Rujukan</Text>
          <Text fw="SemiBold" align="right">
            {item.reference_value ? item.reference_value : '-'}
          </Text>
        </View>
        <View style={[{borderColor: colors.border}, styles.descriptionItem]}>
          <Text color={colors.textMuted}>Status</Text>
          <Text align="right">-</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  pressable: {
    padding: Spacing._4,
    paddingHorizontal: Spacing._6,
    flexDirection: 'row',
  },
  descriptionContainer: {
    paddingLeft: Spacing._6,
    paddingRight: Spacing._4,
  },
  descriptionItem: {
    marginBottom: Spacing._2,
    paddingHorizontal: Spacing._3,
    borderLeftWidth: 4,
  },
});
