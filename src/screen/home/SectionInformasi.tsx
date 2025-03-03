import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Text from '@components/Text';
import {Rounded, Size, Spacing} from '@constants/theme';
import {useTheme} from '@react-navigation/native';

const SectionInformasi = () => {
  const {colors} = useTheme();
  const links = [
    'https://rsudrsoetomo.jatimprov.go.id/storage/images/slider/1714640519-flyer-etiprovi%20(3).png',
    'https://rsudrsoetomo.jatimprov.go.id/storage/images/slider/1715161315-flyer-RSDS-Website-Slider%20(3).png',
    'https://rsudrsoetomo.jatimprov.go.id/storage/images/slider/1728868629-flyer-RSDS-Website-Slider%20(7).png',
    'https://rsudrsoetomo.jatimprov.go.id/storage/images/slider/1725431435-flyer-Content%20Website%20ISO%202.png',
    'https://rsudrsoetomo.jatimprov.go.id/storage/images/slider/1714640922-flyer-ikm2023.png',
  ];

  return (
    <View>
      <Text fw="Medium" ml="_8" mb="_4" mt="_8">
        Informasi
      </Text>
      <FlatList
        data={links}
        keyExtractor={(item, index) => index.toString()}
        style={{marginBottom: Spacing._8}}
        contentContainerStyle={{gap: Spacing._4, paddingHorizontal: Spacing._8}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.touchable, {borderColor: colors.border}]}>
            <Image source={{uri: item}} style={styles.image} />
          </TouchableOpacity>
        )}
        horizontal={true}
      />
    </View>
  );
};

export default SectionInformasi;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: Rounded._3xl,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: Size._72,
    height: Size._36,
    resizeMode: 'cover',
  },
});
