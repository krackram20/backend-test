
export async function getReturn(ctx: Context) {
  const {
    clients: { returns: returnsService },
    vtex: {route: { params }}
  } = ctx

  try {

      const returnData = await returnsService.get( params.orderId as string, ['_all'])

      if (returnData){
        ctx.status = 200
        ctx.body = {
        ...returnData
      }
      }
    }

   catch (err) {

    throw new Error(err)
  }
}
