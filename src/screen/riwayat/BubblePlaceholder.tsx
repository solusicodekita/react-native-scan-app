import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FontSize, Leading, Rounded, Size, Spacing} from '@constants/theme';

const BubblePlaceholder = () => {
  return (
    <View style={[styles.itemContainer]}>
      <View style={{padding: Spacing._4, gap: Spacing._3}}>
        <View style={styles.bubbleTitle} />
        <View style={[styles.bubbleSubtitle]} />
      </View>
    </View>
  );
};

export default BubblePlaceholder;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginBottom: Spacing._4,
    borderWidth: 1,
    borderRadius: Rounded._3xl,
    overflow: 'hidden',
    borderColor: 'black',
  },
  bubbleTitle: {
    width: Size._32,
    height: FontSize.sm + Leading.normal,
    backgroundColor: 'black',
  },
  bubbleSubtitle: {
    width: [Size._44, Size._52, Size._40, Size._48][
      Math.floor(Math.random() * 3)
    ],
    height: FontSize.base + Leading.normal,
    backgroundColor: 'black',
  },
});
