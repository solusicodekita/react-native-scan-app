import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useAfterTransition} from '@src/hooks/useAfterTransition';
import Text from '@components/Text';
import {useTheme} from '@react-navigation/native';
import {Size, Spacing} from '@constants/theme';
import {DetailRiwayatResponse} from '@store/api/sips/types';
import Item from './Item';
import RenderHTML from '@builder.io/react-native-render-html';
import {HasilPeriksaScreenProps} from '@routes/types';

/**
 * Screen untuk menampilkan hasil periksa dari detail riwayat.
 * Output berupa list untuk pemeriksaan selain radiologi.
 * Output berupa render html untuk pemeriksaan radiologi.
 */
const HasilPeriksaScreen = ({route}: HasilPeriksaScreenProps) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const {hasilPeriksa} = route.params;
  const jumlah = hasilPeriksa.length;
  const ready = useAfterTransition();
  const renderItem = ({
    item,
    index,
  }: {
    item: DetailRiwayatResponse;
    index: number;
  }) => <Item key={index} item={item} index={index} jumlah={jumlah} />;
  const keyExtractor = (item: DetailRiwayatResponse, index: number) =>
    index.toString();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text fs="lg" fw="SemiBold" style={styles.header}>
          Hasil Pemeriksaan
        </Text>
        {ready ? (
          typeof hasilPeriksa === 'string' || hasilPeriksa instanceof String ? (
            <ScrollView contentContainerStyle={{padding: Size._5}}>
              <RenderHTML
                systemFonts={['Poppins-Regular']}
                contentWidth={width}
                source={{
                  html: hasilPeriksa
                    .replace(/[\r\n]+/g, '')
                    .replace('<p></p>', ''),
                }}
                tagsStyles={tagsStyles}
              />
            </ScrollView>
          ) : (
            <FlatList
              data={hasilPeriksa}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          )
        ) : (
          <ActivityIndicator color={colors.tertiary} size={'large'} />
        )}
      </View>
    </View>
  );
};

export default HasilPeriksaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing._16,
    paddingHorizontal: Spacing._5,
    backgroundColor: '#00000078',
  },
  card: {
    flex: 1,
    width: '100%',
    // maxWidth: Size._80,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'white',
    // marginHorizontal: 'auto',
  },
  header: {
    padding: Spacing._4,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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
