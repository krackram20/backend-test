import { returnStatus } from "../utils/constants"
import { UserInputError } from '@vtex/api'
export async function deleteReturn(ctx: Context) {
  const {
    clients: { returns: returnsService },
    vtex: {route: { params }}
  } = ctx

  try {

      const returnData = await returnsService.get( params.orderId as string, ['_all'])

      const { status } = returnData

      if (status !== returnStatus.rejected && status !== returnStatus.paid) {
        throw new UserInputError(`can't delete non fulfilled return orders, status: ${status}` )
      }

      const res = returnsService.delete(params.orderId as string)

      console.log(res)

        ctx.status = 201
        ctx.body = {}
      }
   catch (err) {

    throw new Error(err)
  }
}
