import { getLast30DaysDateRangeString, isDateOutOfRange } from "../utils/utils"

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
