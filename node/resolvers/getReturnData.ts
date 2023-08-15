

export const getReturnData = async (
  _: any,
  {id}: { id: string},
  {clients: {returns: returnService} } : Context
) => {

    return returnService.get(id, ['_all'])

}
