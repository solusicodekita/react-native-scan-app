import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '@components/Text';
import Button from '@components/Button';
import {useTheme} from '@react-navigation/native';
import {Size, Spacing} from '@constants/theme';
import {WelcomeScreenProps} from '@routes/auth/types';
import BasicLayout from '@components/BasicLayout';

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  const {colors} = useTheme();

  return (
    <BasicLayout
      underlayStyle={styles.fillContainer}
      underlayChildren={
        <View style={styles.underlay}>
          <Image
            style={styles.logo_jatimprov}
            source={require('@assets/images/logo_jatimprov_kars.png')}
            resizeMode="contain"
          />
          <View style={styles.logo_sips_container}>
            <Image
              style={styles.logo_sips}
              source={require('@assets/images/logo_sips_with_label.png')}
              resizeMode="contain"
            />
          </View>
        </View>
      }>
      <View style={styles.card}>
        <Text fs="xl" fw="SemiBold" align="center" mb="_4">
          Selamat Datang 👋
        </Text>
        <Text
          fs="base"
          fw="Regular"
          align="center"
          mb="_8"
          style={{color: colors.primary}}>
          Sistem Informasi Pasien (SIPS)
          {'\n'} Rumah Sakit Umum Daerah Dr. Soetomo
          {'\n'} Pemerintah Provinsi Jawa Timur.
        </Text>
        <Button
          mode="contained"
          containerStyle={styles.btn_masuk}
          onPress={() => navigation.navigate('LoginScreen')}>
          Masuk
        </Button>
        <Button
          mode="outlined"
          containerStyle={styles.btn_daftar}
          onPress={() => navigation.navigate('SignUpScreen')}>
          Buat Akun
        </Button>
        <Text fs="sm" style={{color: colors.textMuted}}>
          SIPS Versi 1.0
        </Text>
      </View>
    </BasicLayout>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  underlay: {
    flex: 1,
    alignItems: 'center',
  },
  logo_jatimprov: {
    height: Size._20,
    width: Size._80,
  },
  logo_sips_container: {
    flex: 1,
    justifyContent: 'center',
  },
  logo_sips: {
    height: Size._32,
    width: Size._20,
  },
  btn_masuk: {
    width: Size.full,
    marginBottom: Spacing._4,
  },
  btn_daftar: {
    width: Size.full,
    marginBottom: Spacing._8,
  },
  card: {
    padding: Spacing._7,
    alignItems: 'center',
  },
});
