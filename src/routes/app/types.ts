import type {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {RouterProps} from '@routes/types';
import {
  EndpointDetailRiwayat,
  EndpointRiwayat,
  ItemResponseRiwayat,
} from '@store/api/sips/cached/types';
import {
  // DetailRiwayatResponse,
  SipsPacsNormalizedResponse,
} from '@store/api/sips/types';

export type AppStackParamList = {
  CobiApp: {x: string};

  HomeScreen: undefined;
  ProfileScreen: undefined;
  PengaturanScreen: undefined;
  MenuLaboratoriumScreen: undefined;

  // riwayat
  RiwayatScreen: {
    jenisPeriksa: string;
    endpointHasil: EndpointRiwayat;
    endpointDetail: EndpointDetailRiwayat;
    refetch?: boolean;
  };

  // detail riwayat
  DetailRiwayatScreen: {
    jenisPeriksa: string;
    endpoint: EndpointDetailRiwayat;
    params: ItemResponseRiwayat;
  };

  // pacs
  PacsScreen: {no_rontgen: string};
  PacsViewer: {
    no_rontgen: string;
    series: SipsPacsNormalizedResponse[number];
  };

  // // modal hasil periksa
  // HasilPeriksaScreen: {hasilPeriksa: DetailRiwayatResponse[] | string};
};

export type CobiAppProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'CobiApp'>,
  RouterProps
>;

export type HomeScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'HomeScreen'>,
  RouterProps
>;

export type ProfileScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'ProfileScreen'>,
  RouterProps
>;

export type PengaturanScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'PengaturanScreen'>,
  RouterProps
>;

export type MenuLaboratoriumScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'MenuLaboratoriumScreen'>,
  RouterProps
>;

export type RiwayatScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'RiwayatScreen'>,
  RouterProps
>;

export type DetailRiwayatScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'DetailRiwayatScreen'>,
  RouterProps
>;

export type PacsScreenProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'PacsScreen'>,
  RouterProps
>;

export type PacsViewerProps = CompositeScreenProps<
  StackScreenProps<AppStackParamList, 'PacsViewer'>,
  RouterProps
>;

// export type HasilPeriksaScreenProps = CompositeScreenProps<
//   StackScreenProps<AppStackParamList, 'HasilPeriksaScreen'>,
//   RouterProps
// >;
