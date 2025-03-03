import type {BasicHeaderProps} from './types/basicHeaderTypes';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from './Text';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {Size, Spacing} from '@constants/theme';
import ChevronLeft from '@assets/images/icons/chevron_left_solid.svg';

const BasicHeader = ({title}: BasicHeaderProps) => {
  const nav = useNavigation();

  return (
    <View style={styles.basicHeader}>
      <Text fs="lg" fw="Medium" style={styles.basicHeaderTitle}>
        {title}
      </Text>
      <Button
        containerStyle={styles.basicHeaderBackButton}
        textStyle={styles.basicHeaderBackButtonText}
        onPress={() => (nav.canGoBack() ? nav.goBack() : null)}>
        <ChevronLeft width={Size._5} height={Size._5} stroke={'#fff'} />
      </Button>
    </View>
  );
};

export default BasicHeader;

const styles = StyleSheet.create({
  basicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  basicHeaderBackButton: {
    position: 'absolute',
    top: Spacing._5,
    left: Spacing._2,
  },
  basicHeaderBackButtonText: {
    color: 'white',
  },
  basicHeaderTitle: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    padding: Spacing._8,
  },
});
