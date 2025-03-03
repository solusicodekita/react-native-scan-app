import {STATUS_BAR_HEIGHT} from '@constants/constants';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: -STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const BACKGROUND_IMAGE = (
  <ImageBackground
    style={styles.bg}
    source={require('@assets/images/bg.png')}
    resizeMode="cover"
  />
);

export default BACKGROUND_IMAGE;
