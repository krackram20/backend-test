
import { NotFoundError } from '@vtex/api'
import { json } from 'co-body'

export async function validateOrder(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { ordersClient }
  } = ctx

  const body = await json(ctx.req)
  ctx.state.orderId = body.orderId
  ctx.state.body = {...body}
  try {
    const order = await ordersClient.getOrder(String(body.orderId))
    console.log(order.clientProfileData,order.items, order.value)
    const { clientProfileData: {
      email,
      firstName,
      lastName,
    },
    items,
    value
  } = order

    ctx.state.orderInfo = {
      email,
      firstName,
      lastName,
      items,
      value,
      }

  } catch (err) {
    ctx.status = 400
    throw new NotFoundError("order doesn't exist")
  }
  await next()
}
