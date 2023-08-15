
import { NotFoundError } from '@vtex/api'

export async function validateOrder(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { ordersClient },
    vtex: {route: { params }}
  } = ctx

  try {
    const order = await ordersClient.getOrder(params.orderId as string)

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
