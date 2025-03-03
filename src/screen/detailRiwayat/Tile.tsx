import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Rounded, Spacing} from '@constants/theme';
import {useTheme} from '@react-navigation/native';
import type {TileProps} from './types';
import Text from '@components/Text';

const Tile = ({icon, title, content, style, textContainerStyle}: TileProps) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, style]}>
      {icon}
      <View style={[styles.fillContainer, textContainerStyle]}>
        <Text fs="sm" color={colors.textMuted}>
          {title}
        </Text>
        <Text>{content}</Text>
      </View>
    </View>
  );
};

export default Tile;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing._4,
    padding: Spacing._4,
    backgroundColor: 'white',
    borderRadius: Rounded._3xl,
  },
});
