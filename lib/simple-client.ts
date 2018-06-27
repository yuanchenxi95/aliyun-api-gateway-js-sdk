import axios from 'axios'

import Base from './base'
import Options from './types/Options'

export class SimpleClient extends Base {
  request (method: string, opts: Options): Promise<any> {
    let { url, headers, data, timeout } = opts
    let config = {
      method,
      url,
      headers,
      data,
      timeout: timeout || 2000,
    }

    return axios(config)
  }

}
