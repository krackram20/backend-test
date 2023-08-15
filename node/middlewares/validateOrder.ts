
import { NotFoundError } from '@vtex/api'
import { json } from 'co-body'

export async function validateOrder(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { ordersClient }
  } = ctx

  const body = await json(ctx.req)
  ctx.state.orderId = body.orderId
  try {
    const order = await ordersClient.getOrder(body.orderId as string)

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
