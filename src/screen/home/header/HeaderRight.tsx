import React from 'react';
import Button from '@components/Button';
import MenuIcon from '@assets/images/icons/menu.svg';
import {Size} from '@constants/theme';
import {StyleSheet} from 'react-native';
import {HomeScreenNavigation} from '../options/homeScreenOptions';

const HeaderRight = ({navigation}: {navigation: HomeScreenNavigation}) => {
  return (
    <Button
      labelStyle={styles.no_gap}
      icon={<MenuIcon width={Size._6} height={Size._6} stroke={'#fff'} />}
      onPress={() => navigation.navigate('PengaturanScreen')}
    />
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  no_gap: {
    gap: 0,
  },
});
