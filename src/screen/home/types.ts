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

export type RiwayatTerakhir =
  | {endpointIndex: number; item: ItemRiwayat}
  | undefined;
