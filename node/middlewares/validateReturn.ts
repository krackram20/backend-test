import { json } from 'co-body'
import { UserInputError } from '@vtex/api'
import { expectedReqProperties } from '../utils/constants'

export async function validateReturn(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { returns: returnsService },
    vtex: {route: { params }}
  } = ctx

  const body = await json(ctx.req)

  const receivedProperties = Object.keys(body);

  const invalidProperties = receivedProperties.filter(prop => !expectedReqProperties.includes(prop));
  const missingProperties = expectedReqProperties.filter(prop => !receivedProperties.includes(prop));

  if (invalidProperties.length > 0 ) {
    throw new UserInputError(`Invalid properties: ${invalidProperties.join(', ')}`)
  }
  if (missingProperties.length > 0 ) {
    throw new UserInputError(`Missing properties: ${missingProperties.join(', ')}`)
  }

  const result = await returnsService.get(params.orderId as string, ["_all"])

    if (!result) {

      ctx.state.orderInfo = { ...ctx.state.orderInfo, ...body}

    } else {
      throw new UserInputError(`return request for order ${params.orderId} already exists`)
    }

  await next()
}
