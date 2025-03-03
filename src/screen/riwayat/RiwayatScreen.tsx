import {RefreshControl, SectionList, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import Text from '@components/Text';
import {Spacing} from '@constants/theme';
import BasicLayout from '@components/BasicLayout';
import Bubble from './Bubble';
import DotLine from './DotLine';
import type {Item, Sections} from './types';
import {AppDispatch, useAppDispatch} from '@store/store';
import {useCache, UseCacheSignal} from '@src/hooks/useCache';
import {createUtcFromDb, formatDateID} from '@src/helpers/datetime';
import {persistCache} from '@store/cache/thunks';
import {compareDesc} from '@src/helpers/helpers';
import {RiwayatScreenProps} from '@routes/app/types';
import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import Placeholder from './Placeholder';

const RiwayatScreen = ({
  route: {
    params: {jenisPeriksa, endpointHasil, endpointDetail, refetch},
  },
}: RiwayatScreenProps) => {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [riwayat, isLoading] = useCache<Sections>(
    'timeline/' + endpointHasil,
    useCallback(
      async signal => {
        const result = await getRiwayat(
          dispatch,
          signal,
          endpointHasil,
          endpointDetail,
        );
        setRefreshing(false);
        return result;
      },
      [endpointHasil, endpointDetail, dispatch],
    ),
    refetch || refreshing,
  );

  return (
    <BasicLayout cardStyle={styles.fillContainer}>
      {isLoading ? (
        <Placeholder />
      ) : (
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
          ListEmptyComponent={
            <Text align="center">Belum ada riwayat {jenisPeriksa}</Text>
          }
          contentContainerStyle={{padding: Spacing._8}}
          sections={riwayat}
          renderItem={({item, index}) => (
            <View style={styles.container}>
              <DotLine isLastItem={index === item.length - 1} />
              <Bubble
                tglmasuk={item.tglmasuk_display}
                tindakan={item.tindakan_display}
                endpointDetail={endpointDetail}
                jenisPeriksa={jenisPeriksa}
                params_={item}
              />
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text fw="Medium">{title}</Text>
          )}
        />
      )}
    </BasicLayout>
  );
};

export default RiwayatScreen;

const styles = StyleSheet.create({
  fillContainer: {flex: 1},
  container: {flexDirection: 'row', gap: Spacing._4},
});

const getRiwayat = async (
  dispatch: AppDispatch,
  signal: UseCacheSignal,
  endpointHasilName: RiwayatScreenProps['route']['params']['endpointHasil'],
  endpointDetailName: RiwayatScreenProps['route']['params']['endpointDetail'],
) => {
  const endpointHasil = apiSipsCached.endpoints[endpointHasilName];
  const endpointDetail = apiSipsCached.endpoints[endpointDetailName];
  const result = await dispatch(
    endpointHasil.initiate(undefined, {
      subscribe: false,
    }),
  );
  if (!result.data?.response) {
    return [];
  }

  const list: Record<string, Item[]> = {};
  for (let i = 0; i < result.data.response.length; i++) {
    if (signal.abort) {
      return [];
    }

    const item = result.data.response[i];
    const dateMasuk = createUtcFromDb(item.tglmasukpenunjang);
    const tahunMasuk = dateMasuk.getFullYear();
    const pnj = item.pasienmasukpenunjang_id_encrypted;
    const param = {
      ...item,
      pasienmasukpenunjang_id_encrypted: {
        pnjid: pnj.pnjid,
        pnjiv: pnj.pnjv,
        pnjs: pnj.pnjs,
      },
    };

    const detailResult = await dispatch(
      endpointDetail.initiate(param, {
        subscribe: false,
      }),
    );
    const detail = detailResult.data?.response;

    if (!detail) {
      console.log(detailResult);
      return [];
    }

    // store cache detail
    await dispatch(
      persistCache({
        key:
          'detail/' +
          endpointDetail.name +
          param.nama_pegawai +
          param.tglmasukpenunjang,
        value: JSON.stringify(detail),
      }),
    );

    const nTindakan =
      Object.keys(
        detail.reduce((cum, cur) => {
          cum[cur.daftartindakan_nama] = null;
          return cum;
        }, {} as Record<string, null>),
      ).length - 1;

    const detailFirst = detail[0];
    const tglmasuk_display = formatDateID(dateMasuk, {monthsShort: true});
    const tindakan_display =
      detailFirst.daftartindakan_nama + (nTindakan ? ` (+${nTindakan})` : '');
    const diagnosa_display =
      detailFirst.diagnosa_kode + ' - ' + detailFirst.diagnosa_nama;

    if (!(tahunMasuk in list)) {
      list[tahunMasuk] = [];
    }

    list[tahunMasuk].push({
      length: 0,
      tglmasukpenunjang: item.tglmasukpenunjang,
      tglmasuk_display,
      tindakan_display,
      diagnosa_display,
      pnj: param.pasienmasukpenunjang_id_encrypted,
      nama_pegawai: item.nama_pegawai,
      pasienmasukpenunjang_id_encrypted:
        param.pasienmasukpenunjang_id_encrypted,
    });
  }

  // sort by year
  const sorted = Object.keys(list)
    .sort(compareDesc)
    .map(tahunMasuk => {
      list[tahunMasuk].sort((a, b) =>
        compareDesc(a.tglmasukpenunjang, b.tglmasukpenunjang),
      );

      list[tahunMasuk].forEach(v => (v.length = list[tahunMasuk].length));

      return {
        title: tahunMasuk,
        data: list[tahunMasuk],
      };
    });

  return sorted as Sections;
};
