import { returnStatus } from "../utils/constants";

export const updateStatusData = async (
  _: any,
  {id, status, comments}: { status: string, id: string, comments: string},

  {clients: {returns: returnService} } : Context
) => {

  if (!status || !comments) {
    return { error: "status or comments missing"};
  }

  if (!Object.values(returnStatus).includes(status)) {
    return { error: "Invalid return status"}
  }
  if ( status === returnStatus.created) {
    return { error: "Status cannot be changed to creado"}
  }
    returnService.update(id, {
    status,
    comments
    })
    return { id }
}
