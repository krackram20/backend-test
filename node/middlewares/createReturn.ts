import { returnStatus } from '../utils/constants'

export async function createReturn(ctx: Context) {
  const {
    clients: { returns: returnsService },
    vtex: {route: { params }}
  } = ctx

  try {
      const create = await returnsService.saveOrUpdate({
        ...ctx.state.orderInfo,
        status: returnStatus.created,
        id: params.orderId as string
      })

      if (create){
        ctx.status = 201
        ctx.body = {
        orderId: params.orderId,
        status: returnStatus.created
      }
      }
    }

   catch (err) {

    throw new Error(err)
  }
}
