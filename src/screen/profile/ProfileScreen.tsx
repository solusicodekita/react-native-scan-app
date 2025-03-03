import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '@store/session/selectors';
import Text from '@components/Text';
import CoordinatorLayout from '@components/CoordinatorLayout';
import {useTheme} from '@react-navigation/native';
import {Rounded, Size, Spacing} from '@constants/theme';
import {getInisial, usiaYMD} from '@src/helpers/helpers';
import {createUtcFromDb, formatDateID} from '@src/helpers/datetime';
import {useAppDispatch} from '@store/store';
import {logout} from '@store/session/thunks';

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  if (user === undefined) {
    dispatch(logout());
    return;
  }

  const fields = [
    {label: 'No. ID-Card / KTP', value: user.no_ktp},
    {
      label: 'Tanggal Lahir',
      value: formatDateID(createUtcFromDb(user.tanggal_lahir)),
    },
    {
      label: 'Usia',
      value: usiaYMD(createUtcFromDb(user.tanggal_lahir)),
    },
    {label: 'Tempat Lahir', value: user.tempat_lahir},
    {
      label: 'Alamat',
      value: [
        {label: 'Jalan', value: user.alamat_pasien},
        {label: 'Kelurahan', value: user.kelurahan?.kelurahan_nama},
        {label: 'Kecamatan', value: user.kecamatan?.kecamatan_nama},
        {label: 'Kabupaten / Kota', value: user.kabupaten?.kabupaten_nama},
        {label: 'Provinsi', value: user.provinsi?.propinsi_nama},
      ],
    },
    {label: 'Alamat Domisili', value: user.alamat_domisili_pasien},
    {label: 'Nomor Telepon', value: user.no_telepon_pasien},
    {label: 'Nomor Mobile Pasien', value: user.no_mobile_pasien},
    {label: 'Status Kawin', value: user.statusperkawinan},
    {
      label: 'Kewarganegaraan',
      value: [
        {label: 'Suku', value: user.suku?.suku_nama},
        {label: 'Bangsa', value: user.warga_negara},
        {label: 'Bahasa', value: user.bahasa?.bahasa_nama},
      ],
    },
    {label: 'Agama', value: user.agama},
    {label: 'Pendidikan Terakhir', value: user.pendidikan?.pendidikan_nama},
    {label: 'Pekerjaan', value: user.pekerjaan?.pekerjaan_nama},
    {label: 'Nama Ayah', value: user.nama_ayah},
    {label: 'Nama Ibu', value: user.nama_ibu},
  ];

  return (
    <CoordinatorLayout
      panEnabled={true}
      header={{title: 'Profil Pasien'}}
      underlayChildren={
        <View style={styles.underlayContainer}>
          <View style={styles.initial}>
            <Text fw="Medium" fs="3xl" align="center" color={colors.primary}>
              {getInisial(user.nama_pasien)}
            </Text>
          </View>
          <Text fw="SemiBold" fs="xl" align="center" color="white">
            {user.namadepan} {user.nama_pasien}
          </Text>
          <View style={styles.noRmContainer}>
            <Text color="white">No. Rekam Medis:</Text>
            <Text fw="SemiBold" style={styles.noRm}>
              {user.no_rekam_medik}
            </Text>
          </View>
        </View>
      }>
      <View style={{padding: Spacing._8, gap: Spacing._4}}>
        {fields.map((f, i) => {
          return (
            <View key={i}>
              <Text mb="_2" fw="SemiBold" color={colors.primary}>
                {f.label}
              </Text>
              {Array.isArray(f.value) ? (
                f.value.map((v, j) => (
                  <View key={j}>
                    <Text ml="_4" color={colors.textMuted}>
                      {v.label}
                    </Text>
                    <Text
                      mb="_4"
                      style={[
                        {borderColor: colors.border},
                        styles.valueContainer,
                      ]}>
                      {v.value ? v.value : '-'}
                    </Text>
                  </View>
                ))
              ) : (
                <Text
                  mb="_4"
                  style={[{borderColor: colors.border}, styles.valueContainer]}>
                  {f.value ? f.value : '-'}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </CoordinatorLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  fillContainer: {flex: 1},
  underlayContainer: {
    alignItems: 'center',
    paddingTop: Spacing._4,
    paddingBottom: Spacing._12,
  },
  initial: {
    width: Size._20,
    height: Size._20,
    marginBottom: Spacing._4,
    justifyContent: 'center',
    borderRadius: Rounded._3xl,
    backgroundColor: 'white',
  },
  noRmContainer: {
    alignItems: 'center',
    padding: 1,
    gap: Spacing._2,
  },
  noRm: {
    paddingVertical: Spacing._1,
    paddingHorizontal: Spacing._4,
    backgroundColor: 'white',
    borderRadius: Rounded.full,
  },
  valueContainer: {
    padding: Spacing._4,
    borderWidth: 1,
    borderRadius: Rounded['_2.5xl'],
  },
});
