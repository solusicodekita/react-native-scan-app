import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Spacing} from '@constants/theme';
import Word from './Word';

const Paragraph = ({wordCount = 10}: {wordCount?: number}) => {
  const words = [];

  for (let i = 0; i < wordCount; i++) {
    words.push(<Word key={i} />);
  }

  return <View style={styles.container}>{words}</View>;
};

export default Paragraph;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing._2,
    flexWrap: 'wrap',
  },
});
