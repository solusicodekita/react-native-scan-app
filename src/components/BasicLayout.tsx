import type {BasicLayoutProps} from './types/basicLayoutTypes';
import {
  // StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Rounded} from '@constants/theme';
import {useAfterTransition} from '@src/hooks/useAfterTransition';
import Animated, {FadeInDown} from 'react-native-reanimated';

/**
 * Layout dengan latar belakang gambar
 * dan terdiri dari tiga view, yaitu:
 * - header
 * - underlay
 * - card
 */
const BasicLayout = ({
  children,
  cardStyle,
  underlayStyle,
  underlayChildren,
}: BasicLayoutProps) => {
  const ready = useAfterTransition();

  return !ready ? null : (
    <View style={[styles.container]}>
      {/* <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      /> */}

      {underlayChildren ? (
        <Animated.View entering={FadeInDown} style={underlayStyle}>
          {underlayChildren}
        </Animated.View>
      ) : null}

      <Animated.View entering={FadeInDown} style={[styles.card, cardStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};

export default BasicLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  card: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderTopLeftRadius: Rounded['_4.5xl'],
    borderTopRightRadius: Rounded['_4.5xl'],
  },
});
