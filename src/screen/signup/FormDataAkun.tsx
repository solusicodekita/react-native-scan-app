import React from 'react';
import Button from '@components/Button';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {Size, Spacing} from '@constants/theme';
import {useSharedValue} from 'react-native-reanimated';

type FormDataAkunProps = {
  prevPage: Function;
};

const FormDataAkun = ({prevPage}: FormDataAkunProps) => {
  const {width} = useWindowDimensions();
  const no_rekam_medik = useSharedValue('');
  const password = useSharedValue('');
  const repassword = useSharedValue('');

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={[styles.container, {width}]}>
      <View style={styles.formContainer}>
        <Text fw="Medium" fs="sm" ml="_5" mb="_2">
          Nomor Rekam Medis
        </Text>
        <TextInput
          onChangeText={v => (no_rekam_medik.value = v)}
          containerStyle={styles.textInput}
        />

        <Text fw="Medium" fs="sm" ml="_5" mb="_2">
          Password
        </Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={v => (password.value = v)}
          containerStyle={styles.textInput}
        />

        <Text fw="Medium" fs="sm" ml="_5" mb="_2">
          Ulangi Password
        </Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={v => (repassword.value = v)}
          containerStyle={styles.textInput}
        />
        <Button
          mode="contained"
          containerStyle={styles.buttonMasuk}
          onPress={() => prevPage()}>
          Daftar
        </Button>
      </View>
    </ScrollView>
  );
};

export default FormDataAkun;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Size._72,
    margin: 'auto',
    marginVertical: Spacing._12,
  },
  textInput: {
    marginBottom: Spacing._6,
  },
  buttonMasuk: {
    marginTop: Spacing._4,
    marginBottom: Spacing._12,
  },
});
