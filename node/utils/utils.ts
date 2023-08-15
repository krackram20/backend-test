export function getLast30DaysDateRangeString() {
  const currentDate = new Date();
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 30);

  const startDateString = startDate.toISOString();
  const endDateString = endDate.toISOString();

  const dateRangeString = `creationDate:[${startDateString} TO ${endDateString}]`;
  return dateRangeString;
}

export function isDateOutOfRange(dateString: any) {
  const regex = /\[(.*?) TO (.*?)\]/;
  const [, startDateStr, endDateStr] = dateString.match(regex);

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const currentDateMinus30Days = new Date();
  currentDateMinus30Days.setDate(currentDateMinus30Days.getDate() - 30);

  if (startDate >= currentDateMinus30Days && endDate >= currentDateMinus30Days) {
    return false;
  }

  return true;
}
