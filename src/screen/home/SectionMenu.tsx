import {
  type GestureResponderEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Text from '@components/Text';
import {Rounded, Size, Spacing} from '@constants/theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import Button from '@components/Button';
import IconTac from '@assets/images/icons/tac.svg';
import IconRadiology from '@assets/images/icons/radiology.svg';
import IconMicroscope from '@assets/images/icons/microscope.svg';
import IconMedicineMortar from '@assets/images/icons/medicine_mortar.svg';

type ItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const Item = ({icon, title, onPress}: ItemProps) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const tileSize = width > Size._96 ? 'auto' : (width - Spacing._20) / 2;

  return (
    <Button
      containerStyle={[
        styles.button,
        {borderColor: colors.border, width: tileSize},
      ]}
      onPress={onPress}
      labelStyle={styles.buttonLabel}
      textStyle={styles.buttonText}
      contentContainerStyle={styles.buttonContent}
      icon={icon}>
      {title}
    </Button>
  );
};

const SectionMenu = () => {
  const {colors} = useTheme();
  const nav = useNavigation();

  return (
    <View>
      <Text fw="Medium" mt="_8" ml="_8" mb="_4">
        Menu
      </Text>
      <View style={styles.buttonsContainer}>
        <Item
          title="Radiologi"
          icon={
            <IconRadiology
              width={Size._12}
              height={Size._12}
              fill={colors.primary}
            />
          }
          onPress={() =>
            nav.navigate('Router', {
              screen: 'RiwayatScreen',
              params: {
                jenisPeriksa: 'Radiologi',
                endpointHasil: 'hasilRadiologi',
                endpointDetail: 'detailRadiologi',
              },
            })
          }
        />
        <Item
          title="Laboratorium"
          icon={
            <IconMicroscope
              width={Size._12}
              height={Size._12}
              fill={colors.primary}
            />
          }
          onPress={() =>
            nav.navigate('Router', {screen: 'MenuLaboratoriumScreen'})
          }
        />
        <Item
          title="Radioterapi"
          icon={
            <IconTac width={Size._12} height={Size._12} fill={colors.primary} />
          }
          onPress={() => {
            // nav.navigate('Router', {screen: 'MenuLaboratoriumScreen'})
          }}
        />
        <Item
          title="Farmasi"
          icon={
            <IconMedicineMortar
              width={Size._12}
              height={Size._12}
              fill={colors.primary}
            />
          }
          onPress={() => {
            // nav.navigate('Router', {screen: 'MenuLaboratoriumScreen'})
          }}
        />
      </View>
    </View>
  );
};

export default SectionMenu;

const styles = StyleSheet.create({
  buttonsContainer: {
    gap: Spacing._4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: Spacing._8,
    margin: 'auto',
  },
  button: {
    gap: Spacing._2,
    borderWidth: 1,
    borderRadius: Rounded._2xl,
  },
  buttonLabel: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonText: {
    gap: Spacing._2,
  },
  buttonContent: {
    padding: Spacing._4,
  },
});
