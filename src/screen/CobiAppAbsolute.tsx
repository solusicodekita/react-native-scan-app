import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Button from '@components/Button';
import {useAppDispatch} from '@store/store';
import {sipsApiAuth} from '@store/sipsApi/auth';
import Text from '@components/Text';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const CobiApp = () => {
  const dispatch = useAppDispatch();
  const {width, height} = useWindowDimensions();

  // const scrollRef = useAnimatedRef<Animated.ScrollView>();
  // const scrollOffset = useScrollViewOffset(scrollRef);
  // const IMG_HEIGHT = 400;

  // const imageAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: interpolate(
  //           scrollOffset.value,
  //           [-IMG_HEIGHT, 0, IMG_HEIGHT],
  //           [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
  //         ),
  //       },
  //       // {
  //       //   scale: interpolate(
  //       //     scrollOffset.value,
  //       //     [-IMG_HEIGHT, 0, IMG_HEIGHT],
  //       //     [2, 1, 1],
  //       //   ),
  //       // },
  //     ],
  //   };
  // });

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

      <View
        style={[
          {alignItems: 'center', gap: 32 * 1, zIndex: 1},
          // imageAnimatedStyle,
        ]}>
        <Image
          style={styles.logo_jatimprov}
          source={require('@assets/images/logo_jatimprov_kars.png')}
          resizeMode="cover"
        />
        {/* <View style={styles.logo_wrapper}> */}
        <Image
          style={styles.logo}
          source={require('@assets/images/logo_sips_with_label.png')}
          resizeMode="cover"
        />
        {/* </View> */}
        <Button
          onPress={() => {
            console.log('pressed');
          }}
          contentContainerStyle={{
            padding: 20,
            backgroundColor: 'white',
          }}>
          Cobi
        </Button>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[StyleSheet.absoluteFill]}>
        <View style={[styles.card, {marginTop: 400, height}]}>
          <Text fs="xl" fw="SemiBold">
            Selamat Datang 👋
          </Text>
          <Text fs="base" fw="Regular">
            Aplikasi Sistem Informasi Pasien RSUD Dr. Soetomo Pemerintah
            Provinsi Jawa Timur.
          </Text>
          <Button
            onPress={() => {}}
            contentContainerStyle={{padding: 20, backgroundColor: '#0B4041'}}
            textStyle={{color: 'white'}}>
            Masuk
          </Button>
          <Button
            onPress={() => {}}
            containerStyle={{borderWidth: 1, borderColor: '#0B4041'}}
            contentContainerStyle={{
              padding: 20,
              backgroundColor: 'white',
            }}
            textStyle={{color: '#0B4041'}}>
            Masuk
          </Button>
        </View>
      </ScrollView>
      {/* <View style={[StyleSheet.absoluteFill, {backgroundColor: 'red'}]}>
        <ScrollView style={{backgroundColor: 'green'}}>
          <View style={{backgroundColor: 'blue'}}></View>
        </ScrollView>
      </View> */}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>CobiApp</Text>
  //     <Button
  //       onPress={async () => {
  //         await dispatch(sipsApiAuth.endpoints.logout.initiate());
  //       }}>
  //       Logout
  //     </Button>
  //   </View>
  // );
};

export default CobiApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'stretch',
    // padding: 23,
    // paddingTop: 39,
    // paddingBottom: 0,
  },
  bg: {
    flex: 1,
    position: 'absolute',
  },
  logo_jatimprov: {
    // position: 'absolute',
    top: StatusBar.currentHeight,
    // left: 0,
    // right: 0,
    // flex: 1,
    height: 52.444,
    width: 313.6,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  logo: {
    height: 98.36 * 1.3,
    width: 60.12 * 1.3,
  },
  logo_wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    // flex: 1,
    // marginTop: 400,
    // height: 710,
    // flex: 1,
    gap: 16,
    padding: 23,
    backgroundColor: 'white',
    borderTopLeftRadius: 12 * 2.5,
    borderTopRightRadius: 12 * 2.5,
  },
});
