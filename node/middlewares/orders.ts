function getLast30DaysDateRangeString() {
  const currentDate = new Date();
  const endDate = new Date(); // Today's date
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 30); // 30 days ago

  const startDateString = startDate.toISOString();
  const endDateString = endDate.toISOString();

  const dateRangeString = `creationDate:[${startDateString} TO ${endDateString}]`;
  return dateRangeString;
}

function isDateOutOfRange(dateString: any) {
  // Extract the start and end dates from the input string
  const regex = /\[(.*?) TO (.*?)\]/;
  const [, startDateStr, endDateStr] = dateString.match(regex);

  // Convert the date strings to Date objects
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Calculate the current date minus 30 days
  const currentDateMinus30Days = new Date();
  currentDateMinus30Days.setDate(currentDateMinus30Days.getDate() - 30);

  // Compare start and end dates with currentDateMinus30Days
  if (startDate >= currentDateMinus30Days && endDate >= currentDateMinus30Days) {
    return false; // Dates are within the last 30 days
  }

  return true; // Dates are outside the last 30 days
}

export async function listOrders(ctx: Context, next: () => Promise<any>) {
  const {
    clients: {  ordersClient },
  } = ctx
const params = ctx.request.query

if (params && params.f_creationDate) {
 if( isDateOutOfRange(params.f_creationDate) ){
  ctx.status = 400
  throw new Error('date out of range')
  }
}

if (params && !params.f_creationDate) {
  params.f_creationDate = getLast30DaysDateRangeString()
 }
const client = await ordersClient.getOrders(params)
  ctx.body = { client}

  await next()
}
