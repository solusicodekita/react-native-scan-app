import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import Text from '@components/Text';
import {Spacing} from '@constants/theme';
import CoordinatorLayout from '@components/CoordinatorLayout';
import Button from '@components/Button';
import RenderHTML from '@builder.io/react-native-render-html';
import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import {useCache} from '@src/hooks/useCache';
import {AppDispatch, useAppDispatch} from '@store/store';
import {ItemResponseRiwayat} from '@store/api/sips/cached/types';
import {useNavigation, useTheme} from '@react-navigation/native';
import SectionInfo from './SectionInfo';
import {DetailRiwayatScreenProps} from '@routes/app/types';
import CardPlaceholder from './CardPlaceholder';

const DetailRiwayatScreen = ({route}: DetailRiwayatScreenProps) => {
  const {endpoint, params} = route.params;
  const endpointDetail = apiSipsCached.endpoints[endpoint];
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [detail, isLoading] = useCache(
    'detail/' +
      endpointDetail.name +
      params.nama_pegawai +
      params.tglmasukpenunjang,
    useCallback(async () => {
      const result = await getDetail(dispatch, params);
      setRefreshing(false);
      return result;
    }, [dispatch, params]),
    refreshing,
  );

  const placeholder = React.useMemo(() => <CardPlaceholder />, []);

  const rc = React.useCallback(
    (offset: number) => (
      <RefreshControl
        progressViewOffset={offset - 40}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
      />
    ),
    [refreshing],
  );

  return (
    <CoordinatorLayout
      refreshControl={rc}
      cardStyle={{padding: Spacing._8}}
      underlayChildren={<SectionInfo info={detail ? detail[0] : null} />}>
      {isLoading ? (
        placeholder
      ) : detail ? (
        <View>
          <Text fw="SemiBold" mb="_4" color={theme.colors.primary}>
            Informasi
          </Text>
          <Text>{detail[0].catatandokterpengirim}</Text>

          <Text fw="SemiBold" mt="_8" mb="_2" color={theme.colors.primary}>
            Diagnosis Rujukan ICD-X
          </Text>
          <Text>
            {detail[0].diagnosa_kode}-{detail[0].diagnosa_nama}
          </Text>

          <Text fw="SemiBold" mt="_8" mb="_2" color={theme.colors.primary}>
            Diagnosis Rujukan Umum
          </Text>
          <Text>{detail[0].keterangandiagnosa_klinis}</Text>

          <Text fw="SemiBold" mt="_8" mb="_2" color={theme.colors.primary}>
            Tindakan
          </Text>
          <FlatList
            scrollEnabled={false}
            data={Object.keys(
              detail.reduce((cum, cur) => {
                cum[cur.daftartindakan_nama] = null;
                return cum;
              }, {} as Record<string, null>),
            )}
            renderItem={({item}) => <Text>• {'  ' + item}</Text>}
          />

          <Text fw="SemiBold" mt="_8" mb="_2" color={theme.colors.primary}>
            Hasil Pemeriksaan
          </Text>
          <Button
            containerStyle={styles.alignSelfStart}
            mode="contained"
            onPress={() => {
              if (detail) {
                // navigation.navigate('Router', {
                //   screen: 'HasilPeriksaScreen',
                //   params: {
                //     hasilPeriksa: detail[0].hasilexpertise
                //       ? detail[0].hasilexpertise
                //       : detail,
                //   },
                // });
                navigation.navigate('HasilPeriksaScreen', {
                  hasilPeriksa: detail[0].hasilexpertise
                    ? detail[0].hasilexpertise
                    : detail,
                });
              }
            }}>
            Lihat Hasil Periksa
          </Button>

          {detail[0].kesimpulan_hasilrad ? (
            <>
              <Text fw="SemiBold" mt="_8" mb="_2" color={theme.colors.primary}>
                Kesimpulan
              </Text>
              <RenderHTML
                systemFonts={['Poppins-Regular']}
                contentWidth={200}
                source={{
                  html: detail
                    ? detail[0].kesimpulan_hasilrad
                        .replace(/[\r\n]+/g, '')
                        .replace('<p></p>', '')
                    : '',
                }}
                tagsStyles={tagsStyles}
              />
            </>
          ) : null}

          {detail[0].ris_out_pacs ? (
            <>
              <Text fw="SemiBold" mt="_8" mb="_2" color={theme.colors.primary}>
                Dokumen
              </Text>
              {detail.map((r, i) => {
                if (r.ris_out_pacs) {
                  // console.log(i, r.ris_out_pacs);
                  const no_rontgen = r.ris_out_pacs.no_rontgen;
                  return (
                    <Button
                      containerStyle={styles.alignSelfStart}
                      key={i}
                      mode="contained"
                      onPress={() => {
                        navigation.navigate('Router', {
                          screen: 'PacsScreen',
                          params: {no_rontgen},
                        });
                      }}>
                      PACS
                    </Button>
                  );
                }
              })}
            </>
          ) : null}
        </View>
      ) : (
        <Text>Detail riwayat tidak ditemukan</Text>
      )}
    </CoordinatorLayout>
  );
};

export default DetailRiwayatScreen;

const styles = StyleSheet.create({
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
});

const tagsStyles = {
  p: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    paddingBottom: 20,
    lineHeight: 24,
  },
};

export const getDetail = async (
  dispatch: AppDispatch,
  params: ItemResponseRiwayat,
) => {
  //   return await new Promise(r =>
  //     setTimeout(
  //       () =>
  //         r(
  //           JSON.parse(`[
  //     {
  //         "lis_reg_no": null,
  //         "pasienkirimkeunitlain_id": 849404,
  //         "tgl_kirimpasien": "2024-04-23 10:05:04",
  //         "instalasi_asal": "Instalasi Rawat Jalan",
  //         "ruangan_asal": "Bedah Saraf",
  //         "pegawai_id": 1853,
  //         "nama_pegawai": "Heri Subianto, dr. Sp.BS(K), Subsp. NF, FINPS  ",
  //         "diagnosa_id": 10602,
  //         "diagnosa_kode": "I60",
  //         "diagnosa_nama": "Subarachnoid haemorrhage",
  //         "keterangandiagnosa_klinis": "Diagnosis :  CVA SAH e.c. Non-Aneurysmal SAH Non Communicating Hydrocephalus Post + VP Shunt MP Kocher (D) (6.3.23) + Post TFCA (11.4.23) + Hipertensi St. I Diagnosis ICD X :  I60 | Subarachnoid haemorrhage Diagnosis Banding:  I60.6 | Subarachnoid haemorrhage from other intracranial arteries",
  //         "catatandokterpengirim": "Diagnosis :  CVA SAH e.c. Non-Aneurysmal SAH Non Communicating Hydrocephalus Post + VP Shunt MP Kocher (D) (6.3.23) + Post TFCA (11.4.23) + Hipertensi St. I Diagnosis ICD X :  I60 | Subarachnoid haemorrhage Diagnosis Banding:  I60.6 | Subarachnoid haemorrhage from other intracranial arteries",
  //         "is_nosokomial": null,
  //         "lis_test_id": null,
  //         "pendaftaran_id": 1431496,
  //         "instalasi_id": 199,
  //         "hasilpemeriksaanpa_id": null,
  //         "tindakanpelayanan_id": 8790763,
  //         "tglmasukpenunjang": "2024-06-06 08:16:15",
  //         "pasien_id": 2539120,
  //         "daftartindakan_id": 20055,
  //         "daftartindakan_nama": "Mri Brain Dgn Kontras",
  //         "samplelab_nama": null,
  //         "his_test_id_order": null,
  //         "test_name": null,
  //         "result": null,
  //         "reference_value": null,
  //         "test_flag_sign": null,
  //         "test_group": null,
  //         "test_units_name": null,
  //         "result_note": null,
  //         "result_comment": null,
  //         "authorization_date": null,
  //         "dpjtm_name": null,
  //         "ppds_name": null,
  //         "hasilexpertise": "<p></p><p style='margin:0in;font-size:11.0pt'>Klinis : CVA + SAH</p><p style='margin:0in;font-size:11.0pt'>Kiriman : Poli BedahSaraf<br><span><br></span></p><p style='margin:0in;font-size:11.0pt'>TS, Yth Hasil MRIKepala irisan axial, T1FSE, T2 RFSE, FLAIR, DWI, Coronal T2RFSE, SagittalT2RFSE tanpa dan dengan kontras, MRA, FIESTA, dikerjakan pada MRI 3T :Dilakukan<br> pemberian kontras Gadolinium 10 cc secara IV, tidak didapatkan reaksialergi:</p><p style='margin:0in;font-size:11.0pt'><br>Tak tampak lesihipointense/hiperintense di brain parenchyme, yang dengan pemberian kontras taktampak abnormal contrast enhancement</p><p style='margin:0in;font-size:11.0pt'>Sulci dan gyritampak normal</p><p style='margin:0in;font-size:11.0pt'>Sistem ventrikel dancysterna tampak baik</p><p style='margin:0in;font-size:11.0pt'>Tak tampak deviasimidline struktur</p><p style='margin:0in;font-size:11.0pt'>Pons dan cerebellumtampak baik</p><p style='margin:0in;font-size:11.0pt'>Mastoid, orbita dansinus paranasal kanan kiri tampak baik</p><p style='margin:0in;font-size:11.0pt'>Tampakterpasang VP shunt dengan drain tampak di body of lateral ventricle<br>&nbsp;</p><p style='margin:0in;font-size:11.0pt'>MRAngiography : Circulus Willisi tampak patent, tak tampak aneurysma maupunvascular malformation<br></p><span id='pastemarkerend'>&nbsp;</span><br>",
  //         "kesimpulan_hasilrad": "<p style='margin:0in;font-size:11.0pt'>-Tak tampak massa, perdaraha, infarction atau proses inflamasi pada brainparenchyme<br>- Hydrocephalus sudah terkoreksi<br>- Terpasang VP shunt dengan drain tampak di body oflateral ventricle<br>&nbsp;</p><p></p><p style='margin:0in;font-size:11.0pt'><span id='pastemarkerend'>&nbsp;</span>dr. Hima/dr. Ardhin/ dr. Hammam</p>",
  //         "kritis_rad": false,
  //         "tgl_verifrad": "2024-06-08 12:55:15",
  //         "ruangan_nama": "Radiologi GDC",
  //         "dpjp_rad": "FIERLY HAYATI     ",
  //         "dokterpemeriksa1": null,
  //         "dpjtm_name_final": "FIERLY HAYATI     ",
  //         "kurang_satu_bulan": false,
  //         "pasienmasukpenunjang_id_encrypted": {
  //             "pnjid": "KexLhWWGE2zAENusZwSoxg==",
  //             "pnjv": "6759dae675e099aae6bf93db85abcfae",
  //             "pnjs": "36a739fcec6c20e5"
  //         },
  //         "ris_out_pacs": {
  //             "no_rm": 12991902,
  //             "no_register": "RJ2406060942",
  //             "no_rontgen": "8790763",
  //             "id_detail_radiologi": "1317",
  //             "kode_user_admin": "2066",
  //             "nama__user_admin": "DJOKO SANTOSO",
  //             "admin_datetime_start": "2024-06-06 08:16:15",
  //             "admin_datetime_end": "2024-06-06 08:17:40",
  //             "kode_user_radiografer": "19700529 199703 2 003",
  //             "nama_radiografer": "May Eknawati,S.ST",
  //             "radiografer_datetime_start": "2024-06-06 13:09:54",
  //             "radiografer_datetime_end": "2024-06-06 13:58:18",
  //             "kode_dokter_radiolog": "",
  //             "nama_radiolog": "",
  //             "radiolog_datetime_start": null,
  //             "radiolog_datetime_end": null,
  //             "kritis": "0",
  //             "expertise_text_finding": "",
  //             "expertise_text_conclusion": "",
  //             "expertise_html_finding": "",
  //             "expertise_html_conclusion": "",
  //             "urllink1": "http://pacs.rsudrsoetomo.jatimprov.go.id/explore_v5.asp?token=wKVWcCz2c0ZRM5Fjog5n%2F19nlDZXZOkXYhCLCgExs0has0t3PTIRdVR0m%2FItjVsxV928LTb%2B2XN6lkzh1BGzAJ7G3U5wOq4j6rdzYrPF9vGtIaM5KkrxSehEuOUW4RFtDGdvxIGezto%3D",
  //             "urllink2": "http://pacs.rsudrsoetomo.jatimprov.go.id/Synapse/WebQuery/Index?path=/Session/Working%20Studies/&winpass=true&filter=accessionnumber=8790763",
  //             "urllink3": "http://172.9.1.86:8080/launch?action=view&DicomRepository=SYNAPSE&username=admin&password=admin&AccessionNumber=8790763",
  //             "urllink4": "http://:8080/launch?action=view&DicomRepository=SYNAPSE&username=admin&password=admin&AccessionNumber=8790763",
  //             "urllink5": "",
  //             "updateSIMRS": null,
  //             "id_ris_in": 214664,
  //             "url_mobile1": "http://172.9.1.84:1111//URL.php?token=eGQvS3NudmppUTZuVzlPNE05VG0zQT09&r=Vm5XWkVGaUp5Yld5VzB5LysrMkNtUT09",
  //             "url_mobile2": "http://pacs.rsudrsoetomo.jatimprov.go.id:1111//URL.php?token=eGQvS3NudmppUTZuVzlPNE05VG0zQT09&r=Q2RIcUpIRUlNaFlkcXE4MWs3OEpyUT09",
  //             "url_mobile3": null
  //         },
  //         "pendaftaran": {
  //             "pendaftaran_id": 1431496,
  //             "tgl_pendaftaran": "2024-06-06 08:10:22"
  //         }
  //     }
  // ]`),
  //         ),
  //       3000,
  //     ),
  //   );

  const result = await dispatch(
    apiSipsCached.endpoints.detailRadiologi.initiate(params, {
      subscribe: false,
    }),
  );

  if (result.data) {
    return result.data.response;
  }
};
