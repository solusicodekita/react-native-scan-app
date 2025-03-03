import type {CoordinatorLayoutProps} from './types/coordinatorLayoutTypes';
import {
  View,
  // StatusBar,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Rounded} from '@constants/theme';
import {useAfterTransition} from '@src/hooks/useAfterTransition';

const CoordinatorLayout = ({
  underlayChildren,
  children,
  underlayStyle,
  cardStyle,
  refreshControl,
}: CoordinatorLayoutProps) => {
  const {height} = useWindowDimensions();
  const ready = useAfterTransition();
  const [headerHeight, setHeaderHeight] = useState<number | undefined>();
  const offsetY = useSharedValue(0);
  const animatedHeaderZIndex = useAnimatedStyle(() => ({
    zIndex: offsetY.value > 0 ? 0 : 1,
  }));
  const animatedSVZIndex = useAnimatedStyle(() => ({
    zIndex: offsetY.value > 0 ? 1 : 0,
  }));

  /**
   * Mendapatkan tinggi dari underlaying component
   */
  const onUnderlayLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  return !ready ? null : (
    <View style={[styles.fillContainer, styles.roundedTop]}>
      {/* <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      /> */}

      <Animated.View
        entering={FadeInDown}
        onLayout={onUnderlayLayout}
        style={[styles.absoluteTop, animatedHeaderZIndex, underlayStyle]}>
        {underlayChildren}
      </Animated.View>

      {/* muncul ketika layout sudah terkomputasi */}
      {headerHeight === undefined ? null : (
        <Animated.ScrollView
          refreshControl={
            refreshControl ? refreshControl(headerHeight) : undefined
          }
          style={animatedSVZIndex}
          entering={FadeInDown}
          snapToOffsets={[headerHeight]}
          snapToEnd={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: headerHeight}}
          onScroll={e => (offsetY.value = e.nativeEvent.contentOffset.y)}>
          <View
            style={[
              {minHeight: height},
              styles.roundedTop,
              styles.card,
              cardStyle,
            ]}>
            {children}
          </View>
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default CoordinatorLayout;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  absoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  roundedTop: {
    overflow: 'hidden',
    borderTopLeftRadius: Rounded['_4.5xl'],
    borderTopRightRadius: Rounded['_4.5xl'],
  },
  card: {
    backgroundColor: 'white',
  },
});
