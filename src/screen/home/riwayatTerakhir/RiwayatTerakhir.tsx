import type {
  HasilCariRiwayatTerakhir,
  // RiwayatTerakhirDisplay,
  RiwayatTerakhirDisplay2,
  Targets,
} from './types';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Rounded, Size, Spacing} from '@constants/theme';
import Text from '@components/Text';
import {createUtcFromDb, formatDateID} from '@src/helpers/datetime';
import {AppDispatch, useAppDispatch} from '@store/store';
import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import {useCache} from '@src/hooks/useCache';
import Placeholder from './Placeholder';

const RiwayatTerakhir = ({
  refetch,
  onDoneLoading,
}: {
  refetch?: boolean;
  onDoneLoading?: () => void;
}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const IMG_W = Size._20 * 1.3;
  const IMG_H = Size._32 * 1.3;
  const [riwayat, isLoading] = useCache(
    'riwayatTerakhir',
    useCallback(async () => {
      const result = await fetchRiwayatTerakhir(dispatch);
      onDoneLoading ? onDoneLoading() : null;
      return result;
    }, [dispatch, onDoneLoading]),
    refetch,
  );

  const placeholder = React.useMemo(() => <Placeholder />, []);

  return (
    <View style={[styles.underlay, {minHeight: IMG_H}]}>
      <View style={styles.fillContainer}>
        <Text
          fs="sm"
          color={colors.textMuted}
          style={{paddingLeft: IMG_W + Spacing._4}}>
          Pemeriksaan Terakhir
        </Text>
        <View style={styles.underlayContentWrapper}>
          <Pressable
            android_ripple={{color: colors.secondary}}
            style={styles.underlayPressable}
            onPress={() => {
              if ('item' in riwayat) {
                const item = riwayat.item;
                const pnj = item.pasienmasukpenunjang_id_encrypted;
                nav.navigate('Router', {
                  screen: 'DetailRiwayatScreen',
                  params: {
                    jenisPeriksa: 'Radiologi',
                    endpoint: 'detailRadiologi',
                    params: {
                      ...item,
                      pasienmasukpenunjang_id_encrypted: {
                        ...pnj,
                        pnjiv: pnj.pnjv,
                      },
                    },
                  },
                });
              }
            }}>
            <View
              style={{
                padding: Spacing._4,
                paddingLeft: IMG_W + Spacing._4,
              }}>
              {isLoading ? (
                placeholder
              ) : 'error' in riwayat ? (
                <>
                  <Text fs="sm" color={colors.textMuted}>
                    Terjadi kendala saat mengunduh data...
                  </Text>
                </>
              ) : (
                <>
                  <Text fs="sm" color={colors.textMuted}>
                    {riwayat.jenis}
                  </Text>
                  <Text
                    fs="lg"
                    fw="Medium"
                    numberOfLines={2}
                    color={colors.primary}>
                    {riwayat.tindakan}
                  </Text>
                  <Text fs="sm" color={colors.textMuted}>
                    {riwayat.tgl
                      ? formatDateID(createUtcFromDb(riwayat.tgl))
                      : ''}
                  </Text>
                </>
              )}
            </View>
          </Pressable>
        </View>
      </View>

      <Image
        source={require('@assets/images/doctor.png')}
        style={[styles.underlayFigure, {width: IMG_W, height: IMG_H}]}
      />
    </View>
  );
};

export default RiwayatTerakhir;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  underlay: {
    gap: Spacing._4,
    maxWidth: Size._80,
    marginBottom: Spacing._8,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  underlayFigure: {
    position: 'absolute',
    resizeMode: 'contain',
    left: Spacing._2,
    bottom: -1,
  },
  underlayContentWrapper: {
    borderRadius: Rounded._3xl,
    overflow: 'hidden',
  },
  underlayPressable: {
    backgroundColor: 'white',
  },
  underlayBg: {
    padding: Spacing._4,
    borderRadius: Rounded._3xl,
  },
});

const getDetail = async (
  dispatch: AppDispatch,
  riwayatTerakhir: HasilCariRiwayatTerakhir,
) => {
  // api call detail pemeriksaan
  const pnj = riwayatTerakhir.item.pasienmasukpenunjang_id_encrypted;
  const {data, error} = await dispatch(
    riwayatTerakhir.endpoint.detail.initiate(
      {
        ...riwayatTerakhir.item,
        pasienmasukpenunjang_id_encrypted: {
          pnjid: pnj.pnjid,
          pnjiv: pnj.pnjv,
          pnjs: pnj.pnjs,
        },
      },
      {subscribe: false},
    ),
  );

  // handle error or undefined
  if (error) {
    throw JSON.stringify(error);
  } else if (!data || !data.response) {
    throw 'Terjadi kendala saat mengambil data';
  }

  const detail = data.response;
  const nTindakan = detail.length;
  const first = detail[0];
  const tindakanNama = first.daftartindakan_nama;

  return {
    jenis: riwayatTerakhir.endpoint.jenis,
    tindakan: `${tindakanNama} +${nTindakan}`,
    tgl: first.tglmasukpenunjang,
    item: riwayatTerakhir.item,
  } as RiwayatTerakhirDisplay2;
};

/**
 *
 * @throws error string
 */
const getRiwayatTerakhir = async (
  dispatch: AppDispatch,
  endpoints: Targets,
) => {
  let riwayatTerakhir: HasilCariRiwayatTerakhir | undefined;

  // loop setiap jenis pemeriksaan
  for (let i = 0; i < endpoints.length; i++) {
    // call api hasil periksa
    const endpoint = endpoints[i];
    const {data, error} = await dispatch(
      endpoint.hasil.initiate(undefined, {subscribe: false}),
    );

    // handle error or undefined
    if (error) {
      throw JSON.stringify(error);
    } else if (!data || !data.response) {
      throw 'Terjadi kendala saat mengambil data';
    }

    const itemRiwayat = data.response;

    // skip jika tidak ada riwayat
    if (itemRiwayat.length === 0) {
      continue;
    }

    // bandingkan tgl masuk dengan riwayat sebelumnya
    // const response = result.data.response;
    const last = itemRiwayat[itemRiwayat.length - 1];

    if (!riwayatTerakhir) {
      riwayatTerakhir = {endpoint, item: last};
    } else if (
      riwayatTerakhir?.item.tglmasukpenunjang < last.tglmasukpenunjang
    ) {
      riwayatTerakhir.endpoint = endpoint;
      riwayatTerakhir.item = last;
    }
  }

  if (!riwayatTerakhir) {
    throw 'Belum ada pemeriksaan';
  }

  return riwayatTerakhir;
};

const fetchRiwayatTerakhir = async (dispatch: AppDispatch) => {
  const endpoints: Targets = [
    {
      jenis: 'Radiologi',
      hasil: apiSipsCached.endpoints.hasilRadiologi,
      detail: apiSipsCached.endpoints.detailRadiologi,
    },
    {
      jenis: 'Patologi Klinik',
      hasil: apiSipsCached.endpoints.hasilPatologiKlinik,
      detail: apiSipsCached.endpoints.detailPatologiKlinik,
    },
    {
      jenis: 'Patologi Anatomi',
      hasil: apiSipsCached.endpoints.hasilPatologiAnatomi,
      detail: apiSipsCached.endpoints.detailPatologiAnatomi,
    },
    {
      jenis: 'Mikrobiologi Klinik',
      hasil: apiSipsCached.endpoints.hasilMikrobiologiKlinik,
      detail: apiSipsCached.endpoints.detailMikrobiologiKlinik,
    },
  ];

  try {
    const terakhir = await getRiwayatTerakhir(dispatch, endpoints);
    const detail = await getDetail(dispatch, terakhir);
    return detail;
  } catch (error) {
    return {error};
  }
};
