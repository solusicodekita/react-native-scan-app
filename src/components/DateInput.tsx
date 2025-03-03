import type {AndroidMode} from './types/dateInputTypes';
import {StyleSheet} from 'react-native';
import React from 'react';
import {
  type DateTimePickerEvent,
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import Button from './Button';
import {ButtonProps} from './types/buttonTypes';
import {FontSize, Spacing} from '@constants/theme';
import {formatDateDB, formatDateID} from '@src/helpers/datetime';

type DateInputProps = ButtonProps & {
  label?: string;
  onChangeText: (date: string) => void;
};

const DateInput = (props: DateInputProps) => {
  const [date, setDate] = React.useState<Date | undefined>();

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (event.type === 'set') {
      setDate(selectedDate); // untuk internal state

      if (selectedDate) {
        props.onChangeText(formatDateDB(selectedDate)); // untuk form
      }
    }
  };

  const showMode = (currentMode: AndroidMode) => {
    DateTimePickerAndroid.open({
      value: date ? date : new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => showMode('date');

  return (
    <Button
      mode="outlined"
      onPress={showDatepicker}
      contentContainerStyle={styles.content}
      labelStyle={styles.label}
      textStyle={styles.text}
      {...props}>
      {date ? formatDateID(date) : props.label ? props.label : ' '}
    </Button>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing._5,
    paddingVertical: Spacing['_3.5'],
  },
  label: {
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: FontSize.lg,
  },
});
