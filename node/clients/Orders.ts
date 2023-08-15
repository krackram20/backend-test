import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'


const URL = '/api/oms/pvt/orders'

export default class Orders extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
    })
  }

  public async getOrders(params?: object): Promise<string> {

    return this.http.get(URL,  {
      headers: {
        VtexIdClientAutCookie: this.context.authToken,
      },
      params: params ? params : {}
    })
  }
  public async getOrder(orderId:string): Promise<any> {
    console.log(typeof orderId, orderId)
    return this.http.get(String(`/api/oms/pvt/orders/${orderId}`),  {
      headers: {
        VtexIdClientAutCookie: this.context.authToken,
      }
    })
  }

}
