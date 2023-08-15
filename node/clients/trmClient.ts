import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'


const URL = `http://datos.gov.co/resource/32sa-8pi3.json?$limit=1`

export default class TRM extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, {...options,
      headers: {
        'X-VTEX-Use-Https': 'true',
        "Content-Type":"application/json",
        "Accept":"application/json",
        'Proxy-Authorization': context.authToken,
        'X-Vtex-Proxy-To': 'https://datos.gov.co/resource/32sa-8pi3.json?$limit=1'
      }})
  }

  public async getConversionRate(): Promise<any> {
    return this.http.get(URL,  {
    })
  }

}
