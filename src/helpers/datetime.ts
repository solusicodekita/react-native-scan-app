import {BULAN_ID} from '@constants/date';
import {FormatDateIDFromDbType, FormatDateIDType} from './types';

/**
 * Membuat object Date dari offset tertentu.
 * Object Date secara internal menyimpan data dalam format UTC.
 * @param strdate e.g 2024-01-18T00:00:00.000+07:00 (dari timezone indonesia)
 */
export const createUtc = (
  date: string,
  time = '00:00:00',
  offset = '+07:00',
) => {
  return new Date(`${date}T${time}.000${offset}`);
};

/**
 * Parsing tanggal dari database sips (offset UTC+7).
 * Fungsi ini bertujuan agar mendapatkan nilai tanggal yang sesuai
 * ketika timezone user diset selain indonesia.
 * @param datetime e.g. 2025-01-18 05:00:00
 */
export const createUtcFromDb = (datetime: string, offset = '+07:00') => {
  const parts = datetime.split(' ');
  return createUtc(parts[0], parts[1], offset);
};

export const formatDateID: FormatDateIDType = (date, config = {}) => {
  let monthName = BULAN_ID[date.getMonth()];
  monthName = config.monthsShort ? monthName.substring(0, 3) : monthName;

  let time = config.showTime
    ? ' ' +
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0')
    : '';

  return (
    date.getDate().toString().padStart(2, '0') +
    ' ' +
    monthName +
    ' ' +
    date.getFullYear() +
    time
  );
};

export const formatDateDB = (date: Date) => {
  const bulan = String(date.getMonth()).padStart(2, '0');
  const tgl = String(date.getDate()).padStart(2, '0');
  return date.getFullYear() + '-' + bulan + '-' + tgl;
};

export const formatDateIDFromDb: FormatDateIDFromDbType = (
  strdate,
  config = {},
) => {
  const date = createUtcFromDb(strdate);
  let monthName = BULAN_ID[date.getMonth()];
  monthName = config.monthsShort ? monthName.substring(0, 3) : monthName;

  let time = config.showTime
    ? ' ' +
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0')
    : '';

  return (
    date.getDate().toString().padStart(2, '0') +
    ' ' +
    monthName +
    ' ' +
    date.getFullYear() +
    time
  );
};

/**
 * Calculates the exact age for a given birthdate with JavaScript.
 *
 * @link https://www.kevinleary.net/blog/javascript-age-birthdate-mm-dd-yyyy/
 */
export const exactAge = (birthdate: Date) => {
  const startDate = birthdate;
  const startYear = startDate.getFullYear();

  // Leap years
  const february =
    (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
      ? 29
      : 28;
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const endDate = new Date();
  let yearDiff = endDate.getFullYear() - startYear;
  let monthDiff = endDate.getMonth() - startDate.getMonth();
  let dayDiff = endDate.getDate() - startDate.getDate();

  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }

  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--;
    } else {
      yearDiff--;
      monthDiff = 11;
    }
    dayDiff += daysInMonth[startDate.getMonth()];
  }

  return {
    years: yearDiff,
    months: monthDiff,
    days: dayDiff,
  };
};
