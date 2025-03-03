import {
  Dimensions,
  StyleSheet,
  // View
} from 'react-native';
import React, {useState} from 'react';
import {
  Canvas,
  ColorMatrix,
  Image,
  type SkImage,
} from '@shopify/react-native-skia';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useDerivedValue,
} from 'react-native-reanimated';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {PacsSettingState} from './PacsViewer';
// import {Rounded} from '@constants/theme';

type PacsCanvasProps = {
  frames: SkImage[];
  index: SharedValue<number>;
  settings: PacsSettingState;
};

const PacsCanvas = ({frames, index, settings}: PacsCanvasProps) => {
  const {width, height} = Dimensions.get('window');
  const [scaleX, setScaleX] = useState<number>(0);
  const currentFrame = useDerivedValue(
    () =>
      frames[Math.min(Math.max(Math.floor(index.value) - 1, 0), frames.length)],
  );

  // prettier-ignore
  const colorMatrix = useDerivedValue(() => {
    const c = settings.contrast.value;
    const t = (1.0 - c) / 2.0;
    const b = settings.brightness.value;
    const v = b * c + t;

    // 5x4 matrix as single row array
    return [
      c, 0, 0, 0, v,
      0, c, 0, 0, v,
      0, 0, c, 0, v,
      0, 0, 0, 1, 0,
    ];
  });

  useAnimatedReaction(
    () => settings.flipx.value,
    curr => runOnJS(setScaleX)(curr),
  );

  return (
    <Animated.View style={styles.container}>
      <ReactNativeZoomableView
        // style={{backgroundColor: 'yellow'}}
        // disableMomentum={true}
        maxZoom={5}
        minZoom={1}
        zoomStep={1}
        // onSingleTap={toggleHandler}
        bindToBorders={true}
        visualTouchFeedbackEnabled={false}>
        <Canvas
          style={[
            {
              width: width - 40,
              height,
              transform: [{scaleX}],
            },
          ]}>
          <Image
            image={currentFrame}
            fit="contain"
            x={0}
            y={0}
            width={width - 40}
            height={height}>
            <ColorMatrix matrix={colorMatrix} />
          </Image>
        </Canvas>
      </ReactNativeZoomableView>
    </Animated.View>
  );
};

export default PacsCanvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // borderRadius: Rounded._4xl,
    // marginHorizontal: 20,
    // overflow: 'hidden',
    // paddingBottom: 200,
  },
});
