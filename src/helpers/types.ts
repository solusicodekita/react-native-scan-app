export type FormatDateIDType = (
  date: Date,
  config?: {monthsShort?: boolean; showTime?: boolean},
) => string;

export type FormatDateIDFromDbType = (
  strdate: string,
  config?: {monthsShort?: boolean; showTime?: boolean},
) => string;
