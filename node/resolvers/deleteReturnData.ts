import { returnStatus } from "../utils/constants"

export const deleteReturnData = async (
  _: any,
  {id}: { id: string},
  {clients: {returns: returnService} } : Context
) => {
  const returnData = await returnService.get( id, ['_all'])

  const { status } = returnData

  if (status !== returnStatus.rejected && status !== returnStatus.paid) {
    return {
      error: "can't delete non fulfilled return"
    }
  }
    returnService.delete(id)
    return {id}
}
