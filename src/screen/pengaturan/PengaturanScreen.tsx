import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import BasicLayout from '@components/BasicLayout';
import Text from '@components/Text';
import ChevronRightIcon from '@assets/images/icons/lucide_chevron_right.svg';
import {useTheme} from '@react-navigation/native';
import {Spacing} from '@constants/theme';
import {useAppDispatch} from '@store/store';
import {logout} from '@store/session/thunks';

const PengaturanScreen = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const items = [
    {
      title: 'Tema',
      badge: 'Sistem',
    },
    {
      title: 'Bahasa',
      badge: 'Indonesia',
    },
    {
      title: 'Ubah Kata Sandi',
    },
    {
      title: 'Tentang SIPS',
      badge: 'v1.0',
    },
    {
      title: 'Keluar',
      titleStyle: {color: 'red'},
      action: () => {
        dispatch(logout());
      },
    },
  ];

  return (
    <BasicLayout
      cardStyle={styles.fillContainer}
      header={{title: 'Pengaturan'}}>
      <View>
        {items.map((item, i) => (
          <View key={i}>
            <Pressable
              android_ripple={{color: colors.secondary}}
              style={[{borderColor: colors.border}, styles.pressable]}
              onPress={item.action}>
              <Text style={[styles.fillContainer, item.titleStyle]}>
                {item.title}
              </Text>

              {typeof item.badge === 'string' ? (
                <Text color={colors.textMuted}>{item.badge}</Text>
              ) : (
                item.badge
              )}
              <ChevronRightIcon stroke={colors.textMuted} />
            </Pressable>
          </View>
        ))}
      </View>
    </BasicLayout>
  );
};

export default PengaturanScreen;

const styles = StyleSheet.create({
  fillContainer: {flex: 1},
  pressable: {
    flexDirection: 'row',
    paddingHorizontal: Spacing._8,
    paddingVertical: Spacing._5,
    gap: Spacing._4,
    borderBottomWidth: 1,
    // borderColor: colors.border,
  },
});
