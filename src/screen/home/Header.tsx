import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '@components/Text';
import {Rounded, Size, Spacing} from '@constants/theme';
import {useSelector} from 'react-redux';
import {selectUser} from '@store/session/selectors';
import {useNavigation} from '@react-navigation/native';
import Button from '@components/Button';
import MenuIcon from '@assets/images/icons/menu.svg';
import {getInisial} from '@src/helpers/helpers';

const Header = () => {
  const nav = useNavigation();
  const user = useSelector(selectUser);
  return (
    <View style={styles.container}>
      <Button
        icon={
          <View style={styles.icon}>
            <Text fs="xs" align="center">
              {user?.nama_pasien ? getInisial(user.nama_pasien) : ''}
            </Text>
          </View>
        }
        textStyle={styles.buttonText}
        containerStyle={styles.buttonContainer}
        onPress={() => nav.navigate('Router', {screen: 'ProfileScreen'})}>
        {user?.nama_pasien}
      </Button>
      <Button
        labelStyle={styles.no_gap}
        icon={<MenuIcon width={Size._6} height={Size._6} stroke={'#fff'} />}
        onPress={() => nav.navigate('Router', {screen: 'PengaturanScreen'})}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  no_gap: {
    gap: 0,
  },
  container: {
    marginHorizontal: Spacing._4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    // alignSelf: 'flex-start',
  },
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
