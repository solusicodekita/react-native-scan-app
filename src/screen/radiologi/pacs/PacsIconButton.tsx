import React from 'react';
import {IconButton, Tooltip} from 'react-native-paper';
import FA from 'react-native-vector-icons/FontAwesome6';

const PacsIconButton = ({name, onPress, title}) => {
  return (
    <Tooltip title={title}>
      <IconButton
        icon={({size, color}) => <FA name={name} size={25} color={color} />}
        iconColor="white"
        size={50}
        onPress={onPress}
      />
    </Tooltip>
  );
};

export default PacsIconButton;
