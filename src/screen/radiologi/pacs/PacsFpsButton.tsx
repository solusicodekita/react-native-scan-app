import {View} from 'react-native';
import React from 'react';
import {Menu} from 'react-native-paper';
import PacsIconButton from './PacsIconButton';
import {SharedValue} from 'react-native-reanimated';

/**
 *
 * @param {{fps: SharedValue}} props
 * @returns React.JSX.Element
 */
const PacsFpsButton = ({fps}) => {
  const [visible, setVisible] = React.useState(false);
  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);
  const setFps = speed => (fps.value = speed);
  const fpsOptions = [1, 5, 10, 25, 30, 60];

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={hideMenu}
        anchor={<PacsIconButton name="gauge" onPress={showMenu} />}>
        {fpsOptions.map((speed, index) => (
          <Menu.Item
            key={index}
            onPress={() => {
              setFps(speed);
              hideMenu();
            }}
            title={speed + ' fps'}
          />
        ))}
      </Menu>
    </View>
  );
};

export default PacsFpsButton;
