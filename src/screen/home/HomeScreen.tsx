import {
  RefreshControl,
  // View
} from 'react-native';
import React, {useEffect} from 'react';
import CoordinatorLayout from '@components/CoordinatorLayout';
import SectionMenu from './SectionMenu';
import SectionInformasi from './SectionInformasi';
import // store,
// useAppDispatch,
'@store/store';
import RiwayatTerakhir from './riwayatTerakhir/RiwayatTerakhir';
import {HomeScreenProps} from '@routes/app/types';
// import Header from './Header';
// import Button from '@components/Button';
// import {apiSipsAuth} from '@store/api/sips/auth/endpoints';
// import {useSelector} from 'react-redux';
// import {apiSipsCached} from '@store/api/sips/cached/endpoints';
// import {logout} from '@store/session/thunks';
// import Text from '@components/Text';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  // const dispatch = useAppDispatch();
  // const a = useSelector(s => s[apiSipsCached.reducerPath]);
  // const c = useSelector(s => s.blobCache);
  // const l = useSelector(s => s);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const init = async () => {
      navigation;
      // const p = dispatch(apiSipsCached.endpoints.hasilRadiologi.initiate());
      // const r = await p;
      // p.unsubscribe();
      // if (r.data) {
      //   const d = r.data;
      //   console.log(d.response);
      // }
      // const r = await dispatch(
      //   apiSipsCached.endpoints.detailRadiologi.initiate(
      //     {
      //       tglmasukpenunjang: '2023-02-26 11:06:43',
      //       nama_pegawai: 'ACHMAD FAHMI, dr  ',
      //       pasienmasukpenunjang_id_encrypted: {
      //         pnjid: 'ZuIA8HDshCVlRGn9Dzu5Yw==',
      //         pnjiv: 'c48a8e4f83fe2e899520d197ccaf5d18',
      //         pnjs: '7d12c27531c524ff',
      //       },
      //     },
      //     {subscribe: false},
      //   ),
      // );
      // const r = await p;
      // p.unsubscribe();
      // console.log('r', 'done');
      // if (r.data) {
      //   const d = r.data;
      //   console.log('r', d.response);
      // }
      // const p = dispatch(
      //   apiSipsCached.endpoints.pacsImage.initiate({
      //     no_rontgen: '8790763',
      //     seriesUid:
      //       '1.3.12.2.1107.5.2.19.145381.2024060614262711586108873.0.0.0',
      //     objectUid: '1.3.12.2.1107.5.2.19.145381.2024060614262994236108958',
      //   }),
      // );
      // try {
      //   const r = await p;
      //   p.unsubscribe();
      //   console.log('img', r.data?.cacheKey);
      // } catch (err) {
      //   console.error('init err', err);
      // }
    };
    init();
  });

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
      underlayChildren={
        <RiwayatTerakhir
          refetch={refreshing}
          onDoneLoading={() => setRefreshing(false)}
        />
      }>
      {/* <Button
        onPress={async () => {
          navigation.navigate('CobiApp', {x: ''});
        }}>
        Cobi
      </Button> */}

      {/* <Button
        onPress={async () => {
          await dispatch(logout());
        }}>
        Logout
      </Button> */}

      {/* <Button
        onPress={async () => {
          // console.log(l);
          const s = store.getState();
          console.log({
            // _persist: s._persist,
            // session: s.session.user,
            // 'api/sips/auth': s['api/sips/auth'],
            // 'api/sips/cached': s['api/sips/cached'],
            blobCache: s.blobCache,
          });
        }}>
        Cache
      </Button> */}

      <SectionMenu />
      <SectionInformasi />
    </CoordinatorLayout>
  );
};

export default HomeScreen;
