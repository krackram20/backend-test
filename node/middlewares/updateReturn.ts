import { returnStatus } from "../utils/constants"
import { json } from 'co-body'
import { UserInputError } from "@vtex/api"

export async function updateReturn(ctx: Context) {
  const {
    clients: { returns: returnsService },
    vtex: {route: { params }}
  } = ctx

  const body = await json(ctx.req)
  const {status, comments} = body

  if (!status || !comments) {
    throw new UserInputError("status or comments missing");
  }

  if (!Object.values(returnStatus).includes(status)) {
    throw new UserInputError("Invalid return status");
  }
  if ( status === returnStatus.created) {
    throw new UserInputError("Status cannot be changed to creado");
  }


  try {
       await returnsService.update( params.orderId as string, {
        status,
        comments
      })

        ctx.status =  201
        ctx.body = {
        orderId: params.orderId,
        status,
        comments: params.comments
      }
      }
   catch (err) {

    throw new Error(err)
  }
}
