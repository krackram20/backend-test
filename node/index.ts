import type { ClientsConfig, ServiceContext, RecorderState, ParamsContext } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'
import { Clients } from './clients'
import { listOrders } from './middlewares/orders'
import { createReturn } from './middlewares/createReturn'
import { validateOrder } from './middlewares/validateOrder'
import { conversionRate } from './middlewares/conversionRate'
import { validateReturn } from './middlewares/validateReturn'
import { getReturn } from './middlewares/getReturn'
import { updateReturn } from './middlewares/updateReturn'
import { partialReturn } from './middlewares/partialReturn'
import { deleteReturn } from './middlewares/deleteReturn'
import { getReturnData } from './resolvers/getReturnData'
import { deleteReturnData } from './resolvers/deleteReturnData'
import { updateStatusData } from './resolvers/updateStatusData'
import { ReturnsSchema } from './typings/returns'

const TIMEOUT_MS = 10000

// Create a LRU memory cache for the Status client.
// The 'max' parameter sets the size of the cache.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
// Note that the response from the API being called must include an 'etag' header
// or a 'cache-control' header with a 'max-age' value. If neither exist, the response will not be cached.
// To force responses to be cached, consider adding the `forceMaxAge` option to your client methods.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)
const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS
    },
    orders: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    orderInfo: ReturnsSchema,
    orderId: string,
    body: any
  }
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  routes: {
    //@ts-ignore
    orders: method({
      GET: [listOrders],
    }),
    //@ts-ignore
    returns: method({
      GET: [getReturn],
      PUT: [updateReturn],
      DELETE: [deleteReturn]
    }),
    //@ts-ignore
    createReturn: method({
      POST: [validateOrder, validateReturn, partialReturn, conversionRate, createReturn],
    }),
  },

  graphql: {
    resolvers: {
      Query: {
        //@ts-ignore
        getReturnData,
      },
      Mutation: {
        //@ts-ignore
        updateStatusData,
        //@ts-ignore
        deleteReturnData
      }
    }
  }
})
