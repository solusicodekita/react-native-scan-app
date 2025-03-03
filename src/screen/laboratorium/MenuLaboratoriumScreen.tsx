import type {
  MenuLaboratoriumScreenProps,
  RiwayatScreenProps,
} from '@routes/app/types';
import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Text from '@components/Text';
import Button from '@components/Button';
import BasicLayout from '@components/BasicLayout';
import {FontSize, Size, Spacing} from '@constants/theme';
import {useTheme} from '@react-navigation/native';
import PKIcon from '@assets/images/icons/cell_nuclei.svg';
import PAIcon from '@assets/images/icons/body.svg';
import MKIcon from '@assets/images/icons/chlamydia.svg';

const MenuLaboratoriumScreen = ({navigation}: MenuLaboratoriumScreenProps) => {
  const {colors} = useTheme();
  const menu: LabMenu = [
    {
      title: 'Patologi Klinik',
      icon: (
        <PKIcon width={Size._12} height={Size._12} fill={colors.tertiary} />
      ),
      params: {
        jenisPeriksa: 'Patologi Klinik',
        endpointHasil: 'hasilPatologiKlinik',
        endpointDetail: 'detailPatologiKlinik',
      },
    },
    {
      title: 'Patologi Anatomi',
      icon: (
        <PAIcon width={Size._12} height={Size._12} fill={colors.tertiary} />
      ),
      params: {
        jenisPeriksa: 'Patologi Anatomi',
        endpointHasil: 'hasilPatologiAnatomi',
        endpointDetail: 'detailPatologiAnatomi',
      },
    },
    {
      title: 'Mikrobiologi Klinik',
      icon: (
        <MKIcon width={Size._12} height={Size._12} fill={colors.tertiary} />
      ),
      params: {
        jenisPeriksa: 'Mikrobiologi Klinik',
        endpointHasil: 'hasilMikrobiologiKlinik',
        endpointDetail: 'detailMikrobiologiKlinik',
      },
    },
  ];
  return (
    <BasicLayout
      cardStyle={styles.card}
      header={{title: 'Riwayat Laboratorium'}}>
      <Text fw="Medium" mb="_6">
        Menu
      </Text>
      <FlatList
        data={menu}
        renderItem={({item}) => (
          <Button
            mode="outlined"
            icon={item.icon}
            containerStyle={[
              styles.buttonContainer,
              {borderColor: colors.textMuted},
            ]}
            contentContainerStyle={styles.alignStart}
            labelStyle={{gap: Spacing._4}}
            textStyle={{fontSize: FontSize.base, color: colors.primary}}
            onPress={() => {
              navigation.navigate('RiwayatScreen', item.params);
            }}>
            {item.title}
          </Button>
        )}
        contentContainerStyle={{gap: Spacing._4}}
      />
    </BasicLayout>
  );
};

export default MenuLaboratoriumScreen;

const styles = StyleSheet.create({
  alignStart: {
    alignItems: 'flex-start',
  },
  card: {
    flex: 1,
    padding: Size._8,
  },
  buttonContainer: {
    maxWidth: 'auto',
  },
});

type LabMenu = {
  title: string;
  icon: React.ReactNode;
  params: RiwayatScreenProps['route']['params'];
  // route: {
  //   [Screen in keyof AppStackParamList]: undefined extends AppStackParamList[Screen]
  //     ?
  //         | [screen: Screen]
  //         | [screen: Screen, params: AppStackParamList[Screen]]
  //         | [screen: Screen, params: AppStackParamList[Screen], merge: boolean]
  //     :
  //         | [screen: Screen, params: AppStackParamList[Screen]]
  //         | [screen: Screen, params: AppStackParamList[Screen], merge: boolean];
  // }[keyof AppStackParamList];
}[];
