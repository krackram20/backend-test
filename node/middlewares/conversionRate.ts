
import { UserInputError } from '@vtex/api'
import { validReturnMethods } from '../utils/constants'

export async function conversionRate(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { trmClient: trmService },
    //@ts-ignore
    state: { orderInfo: { return_method, value } }
  } = ctx

  if (!Object.values(validReturnMethods).includes(return_method)) {
    throw new UserInputError("Invalid return method");
  }

  if (return_method === validReturnMethods.dollars) {
    try {
      const trmResponse = await trmService.getConversionRate()
      const {valor } = trmResponse[0]
      ctx.state.orderInfo = { ...ctx.state.orderInfo, conversion_rate: Number(valor), return_amount: (value/Number(valor)) }

    } catch {
      throw new Error("unable to fetch conversion rate")
    }
  }

  await next()
}
