import axios from 'axios'

import Base from './base'
import StringMap from './types/StringMap'
import Options from './types/Options'
import { buildHeaders, getSignedHeadersString, getSignHeaderKeys } from './util/headers'
import { CONTENT_TYPE_FORM } from './constants/contentTypes'
import { md5, hmacsha256 } from './util/crypto'
import { buildStringToSign } from './util/sign'

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
    const requestContentType = headers['content-type'] || ''

    if ((method === 'POST' || method === 'PUT')
      && !requestContentType.startsWith(CONTENT_TYPE_FORM)) {
      headers['content-md5'] = md5(opts.data)
    }

    const signHeaderKeys = getSignHeaderKeys(headers, signHeaders)
    headers['x-ca-signature-headers'] = signHeaderKeys.join(',')
    const signedHeadersStr = getSignedHeadersString(signHeaderKeys, headers)

    const stringToSign = buildStringToSign(method, headers, signedHeadersStr, opts.url, opts.data)
    console.log(stringToSign)
    headers['x-ca-signature'] = hmacsha256(stringToSign, this.appSecret)
    headers['user-agent'] = 'api-gateway-js-sdk'

    let config = {
      method,
      url: opts.url,
      headers,
      data: opts.data,
      timeout: opts.timeout || 2000,
    }

    console.log(config)

    return axios(config)
  }
}
