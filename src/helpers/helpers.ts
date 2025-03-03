import {exactAge} from './datetime';

export const compareDesc = (a: string, b: string) =>
  a > b ? -1 : a < b ? 1 : 0;

export const getInisial = (nama: string) =>
  nama.replaceAll(/\b(\w)\w*\s*/g, '$1').substring(0, 2);

export const usiaYMD = (tglLahir: Date) => {
  const age = exactAge(tglLahir);
  return `${age.years} Tahun ${age.months} Bulan ${age.days} Hari`;
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
