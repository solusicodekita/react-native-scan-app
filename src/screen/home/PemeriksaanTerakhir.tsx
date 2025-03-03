import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Rounded, Size, Spacing} from '@constants/theme';
import Text from '@components/Text';
// import {usePemeriksaanTerakhirQuery} from '@store/sipsApi/client';
import {createUtcFromDb, formatDateID} from '@src/helpers/datetime';
import {AppDispatch, useAppDispatch} from '@store/store';
import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import {Targets} from './types';
// import {SipsResponse} from '@store/sipsApi/types';

type PemeriksaanTerakhirType =
  | {
      jenis?: string;
      tindakan?: string;
      tgl?: string;
      error?: any;
    }
  | undefined;

const getDetail = async (
  dispatch: AppDispatch,
  endpoints: Targets,
  latest: any,
) => {
  // get detail
  const endpoint = endpoints[latest.i];
  const pnj = latest.item.pasienmasukpenunjang_id_encrypted;
  const promise = dispatch(
    endpoint.detail.initiate({
      ...latest.item,
      pasienmasukpenunjang_id_encrypted: {
        pnjid: pnj.pnjid,
        pnjiv: pnj.pnjv,
        pnjs: pnj.pnjs,
      },
    }),
  );
  const result = await promise;

  promise.unsubscribe();

  if (result.isError) {
    throw result.error;
  }

  if (result.data && 'response' in result.data) {
    const response = result.data.response;
    const nTindakan = response.length;
    const first = response[0];
    const tindakanNama = first.daftartindakan_nama as string;

    return {
      jenis: endpoint.jenis,
      tindakan: `${tindakanNama} +${nTindakan}`,
      tgl: first.tglmasukpenunjang,
    };
  }
};

/**
 *
 * @throws error string
 */
const getPemeriksaanTerakhir = async (
  dispatch: AppDispatch,
  endpoints: Targets,
) => {
  const latest: {i: number; item: any} = {
    i: -1,
    item: {tglmasukpenunjang: ''},
  };
  for (let i = 0; i < endpoints.length; i++) {
    // ambil list riwayat periksa
    const endpoint = endpoints[i];
    const promise = dispatch(endpoint.hasil.initiate());
    const result = await promise;

    // stop jika menemukan error
    if (result.isError) {
      throw result.error;
    }

    if (result.data && 'response' in result.data && result.data.response) {
      // skip jika tidak ada riwayat
      if (result.data.response.length === 0) {
        continue;
      }

      // bandingkan tgl masuk dengan riwayat sebelumnya
      const response = result.data.response;
      const last = response[response.length - 1];
      if (latest.item.tglmasukpenunjang < last.tglmasukpenunjang) {
        latest.i = i;
        latest.item = last;
      }
    }

    promise.unsubscribe();
  }

  if (latest.i === -1) {
    throw 'Belum ada pemeriksaan';
  }

  return latest;
};

const PemeriksaanTerakhir = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const IMG_W = Size._20 * 1.3;
  const IMG_H = Size._32 * 1.3;

  // const {data, isLoading, isSuccess, isError} = usePemeriksaanTerakhirQuery();
  const [hasilPeriksa, setHasilPeriksa] = useState<PemeriksaanTerakhirType>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);

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

        const terakhir = await getPemeriksaanTerakhir(dispatch, endpoints);

        const detail = await getDetail(dispatch, endpoints, terakhir);

        if (detail) {
          setIsLoading(false);
          setHasilPeriksa(detail);
        }
      } catch (err) {
        setIsLoading(false);
        setHasilPeriksa({...hasilPeriksa, error: err});
      }
    };

    init();
  }, [dispatch, hasilPeriksa]);

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
            onPress={() => {}}></Pressable>
        </View>
      </View>

      <Image
        source={require('@assets/images/doctor.png')}
        style={[styles.underlayFigure, {width: IMG_W, height: IMG_H}]}
      />
    </View>
  );
};

export default PemeriksaanTerakhir;

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
    bottom: 0,
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
