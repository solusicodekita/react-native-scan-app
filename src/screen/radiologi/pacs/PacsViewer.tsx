import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import type {PacsViewerProps} from '@routes/app/types';
import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import {AppDispatch, useAppDispatch} from '@store/store';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Skia, type SkImage} from '@shopify/react-native-skia';
import {
  // Animated,
  type SharedValue,
  useSharedValue,
} from 'react-native-reanimated';
import PacsCanvas from './PacsCanvas';
import PacsControl from './PacsControl';
import {UseCacheSignal, useCacheWithTransform} from '@src/hooks/useCache';
import {SipsPacsNormalizedResponse} from '@store/api/sips/types';
import Text from '@components/Text';
import PacsConfig from './PacsConfig';
import {Rounded} from '@constants/theme';
import BasicLayout from '@components/BasicLayout';

const PacsViewer = ({route}: PacsViewerProps) => {
  const dispatch = useAppDispatch();
  const {no_rontgen, series} = route.params;
  const index = useSharedValue(1);
  const [frames, isLoading] = useCacheWithTransform(
    'frames' + series.uid,
    useCallback(
      signal => fetchImages(dispatch, no_rontgen, series, signal),
      [dispatch, no_rontgen, series],
    ),
    createSkImages,
  );
  const open = useSharedValue(false);
  const settings: PacsSettingState = {
    fps: useSharedValue<number>(1),
    contrast: useSharedValue<number>(1),
    brightness: useSharedValue<number>(0),
    flipx: useSharedValue<number>(1),
  };

  return (
    <BasicLayout cardStyle={{backgroundColor: undefined, flex: 1}}>
      <View style={styles.canvas}>
        {!frames || !frames.length || isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="white" />
            <Text align="center" color="white">
              Sedang memuat gambar
            </Text>
          </View>
        ) : (
          <>
            <PacsCanvas frames={frames} index={index} settings={settings} />
          </>
        )}
      </View>
      {!frames || !frames.length || isLoading ? null : (
        <>
          <PacsControl
            min={1}
            max={frames.length}
            index={index}
            open={open}
            fps={settings.fps}
          />
          <PacsConfig open={open} settings={settings} />
        </>
      )}
    </BasicLayout>
  );

  // return (
  //   <View style={styles.container}>
  //     {frames && frames.length ? (
  //       <>

  //       </>
  //     ) : (
  //       <Text>Frame gagal dimuat</Text>
  //     )}
  //   </View>
  // );
};

export default PacsViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  canvas: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: Rounded._4xl,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
});

const fetchImages = async (
  dispatch: AppDispatch,
  no_rontgen: string,
  series: SipsPacsNormalizedResponse[number],
  signal: UseCacheSignal,
) => {
  const objects = [];
  try {
    for (let i = 0; i < series.objects.length; i++) {
      // hentikan loop jika ada sinyal abort
      if (signal.abort) {
        throw 'aborted';
      }

      const object = series.objects[i];
      let uri = object.uri;

      const result = await dispatch(
        apiSipsCached.endpoints.pacsImage.initiate(
          {
            no_rontgen,
            seriesUid: series.uid,
            objectUid: object.uid,
          },
          {subscribe: false},
        ),
      );

      if (!result.data) {
        throw result.error;
      }

      uri = result.data.cachePath;
      objects[i] = {...object, uri};
    }
  } catch (err) {
    console.log('kesalahan', err);
  }

  return objects;
};

const createSkImages = async (
  objects: SipsPacsNormalizedResponse[number]['objects'] | undefined,
) => {
  const images: SkImage[] = [];
  try {
    if (!objects) {
      return images;
    }

    for (let i = 0; i < objects.length; i++) {
      const base64 = await ReactNativeBlobUtil.fs.readFile(
        objects[i].uri,
        'base64',
      );
      const skiaData = Skia.Data.fromBase64(base64);
      const skiaImage = Skia.Image.MakeImageFromEncoded(skiaData);

      if (!skiaImage) {
        break;
      }

      images.push(skiaImage);
    }
  } catch (err) {
    console.info('gagal', err);
  }
  return images;
};

export type PacsSettingState = {
  fps: SharedValue<number>;
  contrast: SharedValue<number>;
  brightness: SharedValue<number>;
  flipx: SharedValue<number>;
};
