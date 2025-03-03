import type {LoginScreenProps} from '@routes/auth/types';
import type {SipsResponse} from '@store/api/sips/types';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {FadeIn, useSharedValue} from 'react-native-reanimated';
import Text from '@components/Text';
import Button from '@components/Button';
import {Size, Spacing} from '@constants/theme';
import {useAppDispatch} from '@store/store';
import TextInput from '@components/TextInput';
import BasicLayout from '@components/BasicLayout';
import {useTheme} from '@react-navigation/native';
import PasswordInput from '@components/PasswordInput';
import {apiSipsAuth} from '@store/api/sips/auth/endpoints';

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const no_rekam_medik = useSharedValue('12991902');
  const password = useSharedValue('passmasteritki');
  const isLoading = useSharedValue(false);

  const submit = async () => {
    if (!no_rekam_medik.value) {
      return navigation.navigate('BottomAlert', {
        text: 'Silakan isi nomor rekam medis',
      });
    }

    if (!password.value) {
      return navigation.navigate('BottomAlert', {
        text: 'Silakan isi password',
      });
    }

    isLoading.value = true;

    const r = await dispatch(
      apiSipsAuth.endpoints.login.initiate({
        no_rekam_medik: no_rekam_medik.value,
        password: password.value,
      }),
    );

    isLoading.value = false;

    if (r.error && 'data' in r.error) {
      const errorData = r.error.data as SipsResponse;
      return navigation.navigate('BottomAlert', {
        text: errorData.metadata.message,
      });
    }
  };

  return (
    <BasicLayout
      header={{title: 'Masuk SIPS'}}
      cardStyle={styles.fillContainer}>
      <Animated.ScrollView
        entering={FadeIn}
        keyboardShouldPersistTaps={'handled'}
        style={styles.fillContainer}>
        <View style={styles.formContainer}>
          <Text fw="Medium" fs="sm" ml="_5" mb="_2">
            No. Rekam Medik
          </Text>
          <TextInput
            inputMode={'numeric'}
            returnKeyType={'next'}
            onChangeText={v => (no_rekam_medik.value = v)}
            containerStyle={styles.textInput}
          />
          <View style={styles.labelPassword}>
            <Text fw="Medium" fs="sm" style={styles.fillContainer}>
              Kata Sandi
            </Text>
            <Button
              contentContainerStyle={styles.buttonLupa}
              textStyle={{color: colors.textMuted}}>
              Lupa?
            </Button>
          </View>
          <PasswordInput
            onChangeText={v => (password.value = v)}
            containerStyle={styles.textInput}
          />
          <Button
            mode="contained"
            isLoading={isLoading}
            containerStyle={styles.buttonMasuk}
            onPress={submit}>
            Masuk
          </Button>

          <View
            style={[styles.belumDaftarContainer, {borderColor: colors.border}]}>
            <Text fs="sm" style={{color: colors.textMuted}}>
              Belum punya akun SIPS?{'\n'}Silakan daftar dulu di sini.
            </Text>
            <Button
              mode="outlined"
              containerStyle={styles.buttonDaftar}
              onPress={() => {
                navigation.replace('SignUpScreen');
              }}>
              Daftar
            </Button>
          </View>
        </View>
      </Animated.ScrollView>
    </BasicLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Size._72,
    margin: 'auto',
    marginVertical: Spacing._12,
  },
  textInput: {
    marginBottom: Spacing._4,
  },
  labelPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Spacing._5,
    marginBottom: Spacing._2,
  },
  buttonLupa: {
    padding: 0,
    paddingHorizontal: Spacing._5,
  },
  buttonMasuk: {
    marginTop: Spacing._4,
    marginBottom: Spacing._12,
  },
  buttonDaftar: {
    flex: 1,
  },
  belumDaftarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing._12,
    borderTopWidth: 1,
    gap: Spacing._2,
  },
});
