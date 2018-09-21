import axios from 'axios'

import Base from './base'
import Options from './types/Options'
import { buildHeaders, getSignedHeadersString, getSignHeaderKeys } from './util/headers'
import { CONTENT_TYPE_FORM } from './constants/contentTypes'
import { myMd5, myHmacsha256 } from './util/myCrypto'
import { buildStringToSign } from './util/sign'
import { encodeData } from './util/encodeData'
import { sortKey } from './util/sort'

export class Client extends Base {
  public appKey: string
  public appSecret: string
  public stage: string

  constructor (key: string, secret: string, stage = 'RELEASE') {
    super()
    this.appKey = key
    this.appSecret = secret
    this.stage = stage
  }

  async request (method: string, opts: Options) {
    const signHeaders = opts.signHeaders
    const headers = buildHeaders(opts.headers, signHeaders, this.appKey, this.stage)
    delete headers['accept']
    delete headers['Accept']
    // use axios default headers
    headers['accept'] = 'application/json, text/plain, */*'
    const requestContentType = headers['content-type'] || ''

    if (method === 'POST' || method === 'PUT') {
      if (!requestContentType.startsWith(CONTENT_TYPE_FORM)) {
        let stringifyData = JSON.stringify(opts.data)
        headers['content-md5'] = myMd5(stringifyData)
      } else {
        opts.data = sortKey(opts.data)
      }
    }

    const signHeaderKeys = getSignHeaderKeys(headers, signHeaders)
    headers['x-ca-signature-headers'] = signHeaderKeys.join(',')
    const signedHeadersStr = getSignedHeadersString(signHeaderKeys, headers)

    const stringToSign = buildStringToSign(method, headers, signedHeadersStr, opts.url, opts.data, opts.params)
    headers['x-ca-signature'] = myHmacsha256(stringToSign, this.appSecret)

    if (method === 'POST' || method === 'PUT') {
      if (requestContentType.startsWith(CONTENT_TYPE_FORM)) {
        // opts.data = encodeURIComponent(JSON.stringify(opts.data))
        opts.data = encodeData(opts.data)
      }
    }

    let config = {
      method,
      url: opts.url,
      headers,
      data: opts.data,
      params: opts.params,
      timeout: opts.timeout || 5000,
    }

    return axios(config)
  }
}
