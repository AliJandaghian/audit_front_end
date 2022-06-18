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

  if (range === "today") {
    return { dateFilter: todayRangeDate(), dateRangeLabel: "Today" };
  }
  if (range === "yesterday") {
    return { dateFilter: yesterdayRangeDate(), dateRangeLabel: "Yesterday" };
  }
  if (range === "thisWeek") {
    return { dateFilter: thisWeekRangeDate(), dateRangeLabel: "This Week" };
  }
  if (range === "lastWeek") {
    return { dateFilter: lastWeekRangeDate(), dateRangeLabel: "Last Week" };
  }
  if (range === "thisMonth") {
    return { dateFilter: thisMonthRangeDate(), dateRangeLabel: "This Month" };
  }
  if (range === "lastMonth") {
    return { dateFilter: lastMonthRangeDate(), dateRangeLabel: "Last Month" };
  }
  if (range === "customDate") {
    return {
      dateFilter: customRangeDate(dateFrom, dateTo),
      dateRangeLabel: `From ${dateFrom} to ${dateTo}`,
    };
  }
}

export function countBasedOnResults(audits) {
  let resultsCount = [0, 0];

  audits.forEach((itm) => {
    if (itm.defects.length !== 0) resultsCount[1]++;
    else resultsCount[0]++;
  });
  return resultsCount;
}

export function countDefects(audits, labels) {
  let defectsCount = [];
  labels.forEach((label, index) => {
    audits.forEach((itm) => {
      if (itm.defects) {
        itm.defects.forEach((defect) => {
          if (defect._id === label._id)
            defectsCount[index] = (defectsCount[index] || 0) + 1;
        });
      }
    });
  });
  return defectsCount;
}

export function countMachineResults(audits, labels) {
  let machineResultsCount = [];
  let machineCount = [];
  labels.forEach((label, index) => {
    audits.forEach((itm) => {
      if (itm.machine._id === label._id)
        machineCount[index] = (machineCount[index] || 0) + 1;
      if (itm.defects.length === 0) {
        if (itm.machine._id === label._id)
          machineResultsCount[index] = (machineResultsCount[index] || 0) + 1;
      }
    });
  });
  machineResultsCount.forEach((itm, inx) => {
    machineResultsCount[inx] = (itm * 100) / machineCount[inx];
  });

  return machineResultsCount;
}
