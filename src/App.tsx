import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@store/store';
import RootStack from '@routes/RootStack';
import SplashScreen from './screen/splash/SplashScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <GestureHandlerRootView>
          <RootStack />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
