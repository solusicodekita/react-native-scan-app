import {ItemResponseRiwayat} from '@store/api/sips/cached/types';
import type {Pnj} from '@store/sipsApi/types';
import type {SectionListData} from 'react-native';

export type Item = {
  length: number;
  tglmasukpenunjang: string;
  tglmasuk_display: string;
  tindakan_display: string;
  diagnosa_display: string;
  pnj: Pnj;
} & ItemResponseRiwayat;

export type Section = {
  title: string;
  data: Item[];
};

export type Sections = SectionListData<Item, Section>[];

export type SetRiwayat = React.Dispatch<React.SetStateAction<Sections>>;

export type SetIsLoading = React.Dispatch<React.SetStateAction<boolean>>;

export type DotLineProps = {isLastItem: boolean};
