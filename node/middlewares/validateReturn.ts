
import { UserInputError } from '@vtex/api'
import { expectedReqProperties } from '../utils/constants'

export async function validateReturn(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { returns: returnsService },
    state: { orderId, body }
  } = ctx

  const receivedProperties = Object.keys(body);

  const invalidProperties = receivedProperties.filter(prop => !expectedReqProperties.includes(prop));
  const missingProperties = expectedReqProperties.filter(prop => !receivedProperties.includes(prop));

  if (invalidProperties.length > 0 ) {
    throw new UserInputError(`Invalid properties: ${invalidProperties.join(', ')}`)
  }
  if (missingProperties.length > 0 ) {
    throw new UserInputError(`Missing properties: ${missingProperties.join(', ')}`)
  }

  const { reason, return_method} = body

  const result = await returnsService.get(orderId, ["_all"])

    if (!result) {

      ctx.state.orderInfo = { ...ctx.state.orderInfo, reason, return_method}

    } else {
      throw new UserInputError(`return request for order ${orderId} already exists`)
    }

  await next()
}
