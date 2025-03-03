import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Size, Spacing} from '@constants/theme';
import {STATUS_BAR_HEIGHT} from '@constants/constants';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ImageBackground
        style={StyleSheet.absoluteFill}
        source={require('@assets/images/bg.png')}
        resizeMode="cover"
      />
      <Image
        style={styles.logo_jatimprov}
        source={require('@assets/images/logo_jatimprov_kars.png')}
        resizeMode="contain"
      />
      <View style={styles.logo_wrapper}>
        <Image
          style={styles.logo_sips}
          source={require('@assets/images/logo_sips_with_label.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing._8,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  logo_jatimprov: {
    height: Size._20,
    width: Size._80,
  },
  logo_sips: {
    height: Size._32,
    width: Size._20,
  },
  logo_wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
