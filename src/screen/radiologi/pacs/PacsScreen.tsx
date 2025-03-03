import type {SipsPacsNormalizedResponse} from '@store/api/sips/types';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {PacsScreenProps} from '@routes/app/types';
import Text from '@components/Text';
import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import {type AppDispatch, useAppDispatch} from '@store/store';
import BasicLayout from '@components/BasicLayout';
import {Rounded, Spacing} from '@constants/theme';
import {useCache, UseCacheSignal} from '@src/hooks/useCache';

const PacsScreen = ({navigation, route}: PacsScreenProps) => {
  const dispatch = useAppDispatch();
  const {no_rontgen} = route.params; // e.g.: 8790763
  const [refreshing, setRefreshing] = React.useState(false);
  const [allSeries, isLoading] = useCache(
    'allSeries',
    useCallback(
      async signal => {
        const series = await fetchAllSeries(dispatch, no_rontgen, signal);
        setRefreshing(false);
        return series ? series : [];
      },
      [dispatch, no_rontgen],
    ),
    refreshing,
  );

  return (
    <BasicLayout cardStyle={styles.fillContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
          data={allSeries}
          keyExtractor={s => s.number.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles.itemContainer}>
                <TouchableNativeFeedback
                  style={styles.itemContentWrapper}
                  onPress={() => {
                    navigation.navigate('PacsViewer', {
                      series: item,
                      no_rontgen,
                    });
                  }}>
                  <View style={styles.itemContent}>
                    <Image
                      source={{
                        uri:
                          (Platform.OS === 'android' ? 'file://' : '') +
                          item.objects[0].uri,
                      }}
                      style={styles.itemContentLeft}
                    />
                    <View style={styles.itemContentRight}>
                      <Text fw="SemiBold">{item.desc}</Text>
                      <Text>Modality: {item.modality}</Text>
                      <Text>Total: {item.objects.length}</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </View>
            );
          }}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </BasicLayout>
  );
};

export default PacsScreen;

const styles = StyleSheet.create({
  fillContainer: {
    flex: 1,
  },
  contentContainer: {
    gap: Spacing._5,
    padding: Spacing._5,
  },
  itemContainer: {
    overflow: 'hidden',
    borderRadius: Rounded._4xl,
  },
  itemContentWrapper: {
    borderWidth: 1,
    borderColor: 'white',
    padding: Spacing._5,
    flexDirection: 'row',
    gap: Spacing._5,
  },
  itemContent: {
    flexDirection: 'row',
    gap: Spacing._5,
    padding: 10,
    alignItems: 'center',
  },
  itemContentLeft: {
    width: 110,
    height: 110,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  itemContentRight: {
    flex: 1,
  },
});

/**
 * Mengambil hasil rontgen dari server dalam bentuk json.
 *
 * @param {string} no_rontgen
 */
export const fetchAllSeries = async (
  dispatch: AppDispatch,
  no_rontgen: string,
  signal: UseCacheSignal,
) => {
  const pacsStudies = await dispatch(
    apiSipsCached.endpoints.pacsStudies.initiate(no_rontgen, {
      subscribe: false,
    }),
  );
  if (!pacsStudies.data) {
    return;
  }

  const study = pacsStudies.data.response?.study;
  if (!study) {
    return;
  }

  const allSeries: SipsPacsNormalizedResponse = [];
  for (let i = 0; i < study.series.length; i++) {
    console.log('series i:', i);
    if (signal.abort) {
      return;
    }

    const series = study.series[i];
    const objects: SipsPacsNormalizedResponse[any]['objects'] = series.objects
      .map(o => ({
        number: o.dicomMetadata.instanceNumber,
        uid: o.dicomMetadata.sopInstanceUid,
        uri: '',
      }))
      .sort((a, b) => a.number - b.number);

    // fetch thumbnail
    const result = await dispatch(
      apiSipsCached.endpoints.pacsImage.initiate(
        {
          no_rontgen,
          seriesUid: series.dicomMetadata.SeriesInstanceUID,
          objectUid: series.objects[0].dicomMetadata.sopInstanceUid,
        },
        {subscribe: false},
      ),
    );

    if (result.data) {
      objects[0] = {
        ...objects[0],
        uri: result.data.cachePath,
      };
    }

    allSeries[i] = {
      modality: series.dicomMetadata.modality,
      number: series.dicomMetadata.SeriesNumber,
      desc: series.dicomMetadata.SeriesDescription,
      uid: series.dicomMetadata.SeriesInstanceUID,
      objects,
    };
  }

  return allSeries.sort((a, b) => a.number - b.number);
};
