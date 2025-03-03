import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '@components/Text';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Rounded, Spacing} from '@constants/theme';
import type {
  EndpointDetailRiwayat,
  ItemResponseRiwayat,
} from '@store/api/sips/cached/types';
// import type {TimelineRiwayatProps} from './Timeline';

export type BubbleProps = {
  tglmasuk: string;
  tindakan: string;
  jenisPeriksa: string;
  endpointDetail: EndpointDetailRiwayat;
  params_: ItemResponseRiwayat;
};

const Bubble = ({
  tglmasuk,
  tindakan,
  jenisPeriksa,
  endpointDetail,
  params_,
}: BubbleProps) => {
  const {colors} = useTheme();
  const nav = useNavigation();

  return (
    <View style={[styles.itemContainer, {borderColor: colors.border}]}>
      <Pressable
        onPress={() =>
          nav.navigate('Router', {
            screen: 'DetailRiwayatScreen',
            params: {
              jenisPeriksa: jenisPeriksa,
              endpoint: endpointDetail,
              params: params_,
            },
          })
        }
        android_ripple={{
          color: colors.secondary,
        }}>
        <View style={{padding: Spacing._4}}>
          <Text fs="sm" color={colors.textMuted}>
            {tglmasuk}
          </Text>
          <Text fw="Medium" fs="base" color={colors.primary}>
            {tindakan}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginBottom: Spacing._4,
    borderWidth: 1,
    borderRadius: Rounded._3xl,
    overflow: 'hidden',
  },
});
