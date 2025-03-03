import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Rounded, Size, Spacing} from '@constants/theme';
import Tile from './Tile';
import IconDoctor from '@assets/images/icons/doctor.svg';
import IconDate from '@assets/images/icons/i_schedule_school_date_time.svg';
import {formatDateIDFromDb} from '@src/helpers/datetime';
import {DetailRiwayatResponse} from '@store/api/sips/types';
import Text from '@components/Text';

type SectionInfoProps = {
  info: DetailRiwayatResponse | null;
};

const SectionInfo = ({info}: SectionInfoProps) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Tile
        icon={
          <IconDoctor
            width={Size._10}
            height={Size._10}
            fill={colors.primary}
          />
        }
        title="Dokter Perujuk"
        content={info?.nama_pegawai ? info.nama_pegawai : ''}
      />
      {/* <Tile
        icon={
          <IconDate width={Size._10} height={Size._10} fill={colors.primary} />
        }
        title="Tanggal Masuk Penunjang"
        content={
          info?.tglmasukpenunjang
            ? formatDateIDFromDb(info.tglmasukpenunjang, {showTime: true})
            : ''
        }
      /> */}
      <Tile
        icon={
          <IconDate width={Size._10} height={Size._10} fill={colors.primary} />
        }
        title="Tanggal Kirim Pasien"
        content={
          info?.tgl_kirimpasien
            ? formatDateIDFromDb(info.tgl_kirimpasien, {showTime: true})
            : ''
        }
      />
      <View style={styles.statusContainer}>
        <View style={styles.fillContainer}>
          <Text fs="sm" color={colors.textMuted}>
            {'Status\nCito'}
          </Text>
          <Text>
            {info?.kritis_rad !== undefined
              ? info.kritis_rad
                ? 'YA'
                : 'TIDAK'
              : '-'}
          </Text>
        </View>
        <View style={styles.statusNosokomial}>
          <Text fs="sm" color={colors.textMuted}>
            {'Status\nNosokomial'}
          </Text>
          <Text>
            {info?.is_nosokomial !== undefined
              ? info.is_nosokomial
                ? 'YA'
                : 'TIDAK'
              : '-'}
          </Text>
        </View>
        <View style={styles.fillContainer}>
          <Text fs="sm" color={colors.textMuted}>
            {'Pemakai Antibiotik'}
          </Text>
          <Text>TIDAK</Text>
        </View>
      </View>
    </View>
  );
};

export default SectionInfo;

const styles = StyleSheet.create({
  noflex: {
    flex: 0,
  },
  fillContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: Spacing._6,
    paddingBottom: Spacing._6,
    gap: Spacing._4,
  },
  statusContainer: {
    flexDirection: 'row',
    // gap: Spacing._2,
    padding: Spacing._4,
    backgroundColor: 'white',
    borderRadius: Rounded._3xl,
  },
  status: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
    paddingHorizontal: Spacing._2,
  },
  statusNosokomial: {
    flex: 1.2,
  },
});
