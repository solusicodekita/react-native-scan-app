import type {CobiProps} from '@routes/types';
import {Button, Text, View} from 'react-native';
import React from 'react';

const Cobi = ({navigation}: CobiProps) => {
  return (
    <View>
      <Text>Cobi</Text>
      <Button
        title="login"
        onPress={() => {
          navigation.navigate('BottomAlert', {text: 'bisa'});
        }}
      />
    </View>
  );
};

export default Cobi;

// const styles = StyleSheet.create({});
