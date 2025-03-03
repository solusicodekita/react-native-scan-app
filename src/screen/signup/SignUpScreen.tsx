import React from 'react';
import {StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import BasicLayout from '@components/BasicLayout';
import Paginasi from './Paginasi';
import Pager from './Pager';

const SignUpScreen = () => {
  const offsetX = useSharedValue(0);

  return (
    <BasicLayout
      header={{title: 'Buat Akun SIPS'}}
      cardStyle={styles.fillContainer}
      underlayChildren={<Paginasi offsetX={offsetX} />}>
      <Pager offsetX={offsetX} />
    </BasicLayout>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
});
