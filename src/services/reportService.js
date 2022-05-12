import {
    todayRangeDate,
    yesterdayRangeDate,
    thisWeekRangeDate,
    lastWeekRangeDate,
    thisMonthRangeDate,
    lastMonthRangeDate,
    customRangeDate,
  } from "./dateService";


export function handleApplyFilter(range, dateFrom, dateTo) {
    var dateFilter = {};
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    if (range === "today") {
       return {dateFilter : todayRangeDate(), dateRangeLabel : "Today"}
    }
    if (range === "yesterday") {
       return {dateFilter : yesterdayRangeDate(), dateRangeLabel: "Yesterday"};
    }
    if (range === "thisWeek") {
      return {dateFilter : thisWeekRangeDate(), dateRangeLabel :"This Week"};
    }
    if (range === "lastWeek") {
      return {dateFilter: lastWeekRangeDate(), dateRangeLabel : "Last Week"};
    }
    if (range === "thisMonth") {
      return {dateFilter : thisMonthRangeDate(), dateRangeLabel : "This Month"};
    }
    if (range === "lastMonth") {
      return {dateFilter : lastMonthRangeDate(), dateRangeLabel : "Last Month"};
    }
    if (range === "customDate") {
      return{dateFilter : customRangeDate(dateFrom, dateTo),
        dateRangeLabel : "custome"};
    }
  
 
  }