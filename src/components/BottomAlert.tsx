import type {BottomAlertProps} from '@routes/types';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const BottomAlert = ({route, navigation}: BottomAlertProps) => {
  const {text} = route.params;
  return (
    <View style={styles.container}>
      <Pressable style={StyleSheet.absoluteFill} onPress={navigation.goBack} />
      <View style={styles.wrapper}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default BottomAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrapper: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});
