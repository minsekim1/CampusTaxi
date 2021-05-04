import { format } from "date-fns";

export const DateToTime = (date: Date) => format(new Date(date), "HH:mm");
export const DateToDay = (date: Date) => format(new Date(date), "MM/dd");
export const DateToDayTime = (date: Date) =>
  format(new Date(date), "yyyy/MM/dd HH:mm");

// 날짜 또는 시간으로 표기함
export const DateToRecently = (date: Date) =>
  new Date(date).getDate() == new Date().getDate() &&
  new Date(date).getMonth() == new Date().getMonth()
    ? DateToTime(date)
    : DateToDay(date);

// 날짜 + 시간으로 표기함
function DateToRecentlyDayTime(date: Date) {
  const today = new Date();
  if (date.getMonth() == today.getMonth() && date.getDate() == today.getDate())
    return "오늘 " + DateToTime(date);
  else if (
    date.getMonth() == today.getMonth() &&
    date.getDate() == today.getDate() + 1
  )
    return "내일 " + DateToTime(date);
  else if (
    date.getMonth() == today.getMonth() &&
    date.getDate() == today.getDate() - 1
  )
    return "어제 " + DateToTime(date);
  return DateToDayTime(date);
}
export function Boarding_dtmToDate(string?: string) {
  if (!string) return new Date();
  const sYear = Number(string.substring(0, 4));
  const sMonth = Number(string.substring(5, 7)) - 1;
  const sDate = Number(string.substring(8, 10));
  const sHour = Number(string.substring(11, 13));
  const sMin = Number(string.substring(14, 16));
  if (is_valid_date(sYear, sMonth, sDate, sHour, sMin))
    return new Date(sYear, sMonth, sDate, sHour, sMin);
  else return new Date(1970,1,1);
}

export function Boarding_dtmToRecently(string?: string) {
  if (!string) return "";
  return DateToRecentlyDayTime(Boarding_dtmToDate(string));
}

export function is_valid_date(
  sYear: number,
  sMonth: number,
  sDate: number,
  sHour: number,
  sMin: number
) {
  if (
    sYear < 2100 &&
    sYear > 2020 &&
    sMonth > -1 &&
    sMonth < 12 &&
    sDate > -1 &&
    sDate < 32 &&
    sHour > -1 &&
    sHour < 25 &&
    sMin > -1 &&
    sMin < 61
  )
    return true;
  else return false;
}
