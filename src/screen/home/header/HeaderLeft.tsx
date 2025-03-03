import React from 'react';
import Button from '@components/Button';
import {Rounded, Size, Spacing} from '@constants/theme';
import {StyleSheet, View} from 'react-native';
import Text from '@components/Text';
import {getInisial} from '@src/helpers/helpers';
import {useSelector} from 'react-redux';
import {selectUser} from '@store/session/selectors';
import {HomeScreenNavigation} from '../options/homeScreenOptions';

const HeaderLeft = ({navigation}: {navigation: HomeScreenNavigation}) => {
  const user = useSelector(selectUser);
  return (
    <Button
      icon={
        <View style={styles.icon}>
          <Text fs="xs" align="center">
            {user?.nama_pasien ? getInisial(user.nama_pasien) : ''}
          </Text>
        </View>
      }
      textStyle={styles.buttonText}
      // containerStyle={{flex: 1, backgroundColor: 'red'}}
      onPress={() => navigation.navigate('ProfileScreen')}>
      {user?.nama_pasien}
    </Button>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
  },
  pressable: {
    padding: Spacing._4,
    gap: Spacing._3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    width: Size._8,
    height: Size._8,
    backgroundColor: 'white',
    borderRadius: Rounded.xl,
  },
});
