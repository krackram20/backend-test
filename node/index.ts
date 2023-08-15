import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'
import { Clients } from './clients'
import { listOrders } from './middlewares/orders'
import { createReturn } from './middlewares/createReturn'
import { validateOrder } from './middlewares/validateOrder'
import { conversionRate } from './middlewares/conversionRate'
import { validateReturn } from './middlewares/validateReturn'
import { getReturn } from './middlewares/getReturn'
import { updateReturn } from './middlewares/updateReturn'

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
    orderInfo: object
  }
}

export default new Service({
  clients,
  routes: {
    orders: method({
      GET: [listOrders],
    }),
    returns: method({
      POST: [validateOrder, validateReturn, conversionRate, createReturn],
      GET: [getReturn],
      PUT: [updateReturn]
    }),
  },
})
