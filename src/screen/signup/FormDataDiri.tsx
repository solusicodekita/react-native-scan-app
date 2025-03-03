import React from 'react';
import Button from '@components/Button';
import Text from '@components/Text';
import TextInput from '@components/TextInput';
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native';
import {Size, Spacing} from '@constants/theme';
import DateInput from '@components/DateInput';
import {useSharedValue} from 'react-native-reanimated';

type FormDataDiriProps = {
  nextPage: Function;
};

const FormDataDiri = ({nextPage}: FormDataDiriProps) => {
  const {width} = useWindowDimensions();
  const nama_lengkap = useSharedValue('');
  const tanggal_lahir = useSharedValue('');
  const no_ktp = useSharedValue('');
  const email = useSharedValue('');
  const no_telp = useSharedValue('');

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={[styles.container, {width}]}>
      <View style={styles.formContainer}>
        <Text fw="Medium" fs="sm" ml="_5" mb="_2">
          Nama Lengkap
        </Text>
        <TextInput
          onChangeText={v => (nama_lengkap.value = v)}
          containerStyle={styles.textInput}
        />

        <Text fw="Medium" fs="sm" ml="_5" mb="_2">
          Tanggal Lahir
        </Text>
        <DateInput
          containerStyle={styles.textInput}
          onChangeText={v => (tanggal_lahir.value = v)}>
          {''}
        </DateInput>

        <Text fw="Medium" fs="sm" ml="_5" mb="_2">
          Nomor KTP / Identitas Lain
        </Text>
        <TextInput
          inputMode={'numeric'}
          onChangeText={v => (no_ktp.value = v)}
          containerStyle={styles.textInput}
        />

        <Text fw="Medium" fs="sm" ml="_5" mb="_2">
          Email
        </Text>
        <TextInput
          inputMode={'email'}
          onChangeText={v => (email.value = v)}
          containerStyle={styles.textInput}
        />

        <Text fw="Medium" fs="sm" ml="_5" mb="_2">
          Nomor Telepon
        </Text>
        <TextInput
          inputMode={'numeric'}
          onChangeText={v => (no_telp.value = v)}
          containerStyle={styles.textInput}
        />

        <Button
          mode="contained"
          containerStyle={styles.buttonMasuk}
          onPress={() => {
            nextPage();
          }}>
          Selanjutnya
        </Button>
      </View>
    </ScrollView>
  );
};

export default FormDataDiri;

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
