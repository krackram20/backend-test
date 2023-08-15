

export const getReturnData = async (
  _: any,
  {id}: { id: string},
  {clients: {returns: returnService} } : Context
) => {
  try {
    return returnService.get(id, ['_all']

        )

  } catch(error) {
    return { }
  }

}
