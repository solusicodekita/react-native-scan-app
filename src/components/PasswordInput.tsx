import React, {useState} from 'react';
import {Size} from '@constants/theme';
import {Props} from './types/textInputTypes';
import TextInput from './TextInput';
import Button from './Button';
import Eye from '@assets/images/icons/eye.svg';
import EyeOff from '@assets/images/icons/eye_off.svg';
import {useTheme} from '@react-navigation/native';

const PasswordInput = (props: Props) => {
  const {colors} = useTheme();
  const [secure, setSecure] = useState(true);
  return (
    <TextInput
      secureTextEntry={secure}
      icon={
        <Button onPress={() => setSecure(!secure)}>
          {secure ? (
            <Eye width={Size._6} height={Size._6} stroke={colors.primary} />
          ) : (
            <EyeOff width={Size._6} height={Size._6} stroke={colors.primary} />
          )}
        </Button>
      }
      {...props}
    />
  );
};

export default PasswordInput;
