import {apiSipsCached} from '@store/api/sips/cached/endpoints';
import type {ItemRiwayat} from '@store/api/sips/types';

type Endpoints = typeof apiSipsCached.endpoints;

type Target = {
  jenis: string;
  hasil: Endpoints[
    | 'hasilRadiologi'
    | 'hasilPatologiKlinik'
    | 'hasilPatologiAnatomi'
    | 'hasilMikrobiologiKlinik'];
  detail: Endpoints[
    | 'detailRadiologi'
    | 'detailPatologiKlinik'
    | 'detailPatologiAnatomi'
    | 'detailMikrobiologiKlinik'];
};
export type Targets = Target[];

export type HasilCariRiwayatTerakhir = {endpoint: Target; item: ItemRiwayat};
// | undefined;

export type RiwayatTerakhirDisplay = {
  jenis?: string;
  tindakan?: string;
  tgl?: string;
  error?: any;
};

export type RiwayatTerakhirDisplay2 =
  | {
      jenis: string;
      tindakan: string;
      tgl: string;
      item: ItemRiwayat;
    }
  | {error: string};
