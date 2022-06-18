import {
  startOfToday,
  endOfToday,
  startOfYesterday,
  endOfYesterday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  sub,
  startOfDay,
  endOfDay,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns";

export function convertToUTC(date) {
  return new Date(date).toUTCString();
}

export function todayRangeDate() {
  return { startDate: startOfToday(), endDate: endOfToday() };
}

export function yesterdayRangeDate() {
  return { startDate: startOfYesterday(), endDate: endOfYesterday() };
}

export function thisWeekRangeDate() {
  return { startDate: startOfWeek(new Date()), endDate: endOfWeek(new Date()) };
}

export function lastWeekRangeDate() {
  return {
    startDate: startOfWeek(sub(new Date(), { days: 7 })),
    endDate: endOfWeek(sub(new Date(), { days: 7 })),
  };
}

export function thisMonthRangeDate() {
  return {
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  };
}

export function lastMonthRangeDate() {
  return {
    startDate: startOfMonth(sub(new Date(), { months: 1 })),
    endDate: endOfMonth(sub(new Date(), { months: 1 })),
  };
}

export function lastSixMonthRangeDate() {
  return {
    startDate: startOfDay(sub(new Date(), { months: 6 })),
    endDate: endOfToday(),
  };
}

export function toNow() {
  return {
    startDate: startOfDay(sub(new Date(), { years: 50 })),
    endDate: endOfToday(),
  };
}

export function customRangeDate(datefrom, dateto) {
  return {
    startDate: startOfDay(sub(new Date(datefrom), { days: -1 })),
    endDate: endOfDay(sub(new Date(dateto), { days: -1 })),
  };
}

export function countInWeekDays(dateArr) {
  let days = [
    { name: "monday", sum: 0 },
    { name: "tuesday", sum: 0 },
    { name: "wednesday", sum: 0 },
    { name: "thursday", sum: 0 },
    { name: "friday", sum: 0 },
    { name: "saturday", sum: 0 },
    { name: "sunday", sum: 0 },
  ];

  dateArr.forEach((itm) => {
    if (isMonday(itm)) days[0].sum = days[0].sum + 1;
    if (isTuesday(itm)) days[1].sum = days[1].sum + 1;
    if (isWednesday(itm)) days[2].sum = days[2].sum + 1;
    if (isThursday(itm)) days[3].sum = days[3].sum + 1;
    if (isFriday(itm)) days[4].sum = days[4].sum + 1;
    if (isSaturday(itm)) days[5].sum = days[5].sum + 1;
    if (isSunday(itm)) days[6].sum = days[6].sum + 1;
  });

  return days;
}
