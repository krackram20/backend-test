import { IOClients } from '@vtex/api'
import {  masterDataFor } from '@vtex/clients'
import Orders from './Orders'
import { ReturnsSchema } from '../typings/returns'
 import TRM  from './trmClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get ordersClient() {
    return this.getOrSet('ordersClient', Orders)
  }

  public get returns() {
    return this.getOrSet(
      'returnsTable',
      masterDataFor<ReturnsSchema>('returnsTable')
    )
  }
  public get trmClient() {
    return this.getOrSet('trmClient', TRM)
  }
}
