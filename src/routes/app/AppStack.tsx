import type {AppStackParamList} from './types';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import CobiApp from '@src/screen/CobiApp';
import HomeScreen from '@src/screen/home/HomeScreen';
import PacsScreen from '@src/screen/radiologi/pacs/PacsScreen';
import PacsViewer from '@src/screen/radiologi/pacs/PacsViewer';
import ProfileScreen from '@src/screen/profile/ProfileScreen';
import MenuLaboratoriumScreen from '@src/screen/laboratorium/MenuLaboratoriumScreen';
import DetailRiwayatScreen from '@src/screen/detailRiwayat/DetailRiwayatScreen';
import RiwayatScreen from '@src/screen/riwayat/RiwayatScreen';
import PengaturanScreen from '@src/screen/pengaturan/PengaturanScreen';
import homeScreenOptions from '@src/screen/home/options/homeScreenOptions';
import {FontSize} from '@constants/theme';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTitleStyle: {fontSize: FontSize.lg},
        headerStyle: {backgroundColor: 'transparent'},
      }}>
      {/* <Stack.Screen name="CobiApp" component={CobiApp} /> */}

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Data Pasien'}}
      />
      <Stack.Screen
        name="PengaturanScreen"
        component={PengaturanScreen}
        options={{title: 'Pengaturan'}}
      />
      <Stack.Screen
        name="MenuLaboratoriumScreen"
        component={MenuLaboratoriumScreen}
        options={{title: 'Menu Laboratorium'}}
      />

      {/*Screen Hasil Riwayat*/}
      <Stack.Screen
        name="RiwayatScreen"
        component={RiwayatScreen}
        options={({route}) => ({
          title: 'Riwayat ' + route.params.jenisPeriksa,
        })}
      />

      {/* Screen Detail Riwayat */}
      <Stack.Screen
        name="DetailRiwayatScreen"
        component={DetailRiwayatScreen}
        options={({route}) => ({
          title: 'Detail ' + route.params.jenisPeriksa,
        })}
      />

      {/* Screen PACS */}
      <Stack.Screen
        name="PacsScreen"
        component={PacsScreen}
        options={{title: 'PACS'}}
      />
      <Stack.Screen
        name="PacsViewer"
        component={PacsViewer}
        options={({route}) => ({
          title: route.params.series.desc,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
