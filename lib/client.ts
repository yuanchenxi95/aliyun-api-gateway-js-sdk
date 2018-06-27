import axios from 'axios'

import Base from './base'
import Options from './types/Options'
import { buildHeaders, getSignedHeadersString, getSignHeaderKeys } from './util/headers'
import { CONTENT_TYPE_FORM } from './constants/contentTypes'
import { ua } from './constants/ua'
import { md5, hmacsha256 } from './util/crypto'
import { buildStringToSign } from './util/sign'
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
    const requestContentType = headers['content-type'] || ''

    opts.data = sortKey(opts.data)
    if ((method === 'POST' || method === 'PUT')
      && !requestContentType.startsWith(CONTENT_TYPE_FORM)) {
      let stringifyData = JSON.stringify(opts.data)
      headers['content-md5'] = md5(stringifyData)
    }

    const signHeaderKeys = getSignHeaderKeys(headers, signHeaders)
    headers['x-ca-signature-headers'] = signHeaderKeys.join(',')
    const signedHeadersStr = getSignedHeadersString(signHeaderKeys, headers)

    const stringToSign = buildStringToSign(method, headers, signedHeadersStr, opts.url, opts.data)
    headers['x-ca-signature'] = hmacsha256(stringToSign, this.appSecret)
    headers['user-agent'] = ua

    let config = {
      method,
      url: opts.url,
      headers,
      data: opts.data,
      timeout: opts.timeout || 2000,
    }

    return axios(config)
  }
}
