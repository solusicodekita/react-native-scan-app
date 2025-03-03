import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import Button from '@components/Button';
import Text from '@components/Text';
import CoordinatorLayout from '@components/CoordinatorLayout';
import {sipsApiAuth} from '@store/sipsApi/auth';
import {useAppDispatch} from '@store/store';

/**
 *
 * Harus tahu tinggi area yg dioverlay
 */
const CobiApp = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text>CobiApp</Text>
    </View>
  );
};

export default CobiApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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
  behind: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 32,
    backgroundColor: 'blue',
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
