export const processHolidays = (data: any) => {
  const fullDayHolidays: Record<string, string> = {};
  const halfDaysAM: Record<string, string> = {};
  const halfDaysPM: Record<string, string> = {};

  Object.keys(data).forEach((key) => {
    const date = data[key];
    if (key.startsWith("halfday_am")) halfDaysAM[date] = key;
    else if (key.startsWith("halfday_pm")) halfDaysPM[date] = key;
    else fullDayHolidays[date] = key;
  });

  return { fullDayHolidays, halfDaysAM, halfDaysPM };
};
