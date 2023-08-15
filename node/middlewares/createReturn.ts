import { returnStatus } from '../utils/constants'

export async function createReturn(ctx: Context) {
  const {
    clients: { returns: returnsService },
    state: { orderId }
  } = ctx

  try {
      const create = await returnsService.saveOrUpdate({
        ...ctx.state.orderInfo,
        status: returnStatus.created,
        id: orderId
      })

      if (create){
        ctx.status = 201
        ctx.body = {
        orderId: orderId,
        status: returnStatus.created
      }
      }
    }

   catch (err) {

    throw new Error(err)
  }
}
