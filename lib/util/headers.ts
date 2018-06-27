import _ from 'lodash'
import uuid from 'uuid'

import StringMap from '../types/StringMap'

export function getSignHeaderKeys (headers: StringMap = {}, signHeaders: StringMap = {}) {
  const keys = Object.keys(headers).sort()
  const signKeys = []
  for (let ii in keys) {
    const key = keys[ii]
    // x-ca- 开头的header或者指定的header
    if (key.startsWith('x-ca-') || _.has(signHeaders, key)) {
      if (key === 'accept' || key === 'content-type' || key === 'date') {
        // skip X-Ca-Signature、X-Ca-Signature-Headers、Accept、Content-MD5、Content-Type、Date
        continue
      }
      signKeys.push(key)
    }
  }
  // 按字典序排序
  return signKeys.sort()
}

export function buildHeaders (
  headers: StringMap = {},
  signHeaders: StringMap = {},
  appKey: string,
  stage: string,
) {
  return Object.assign({
    'x-ca-timestamp': Date.now(),
    'x-ca-version': 1,
    'x-ca-key': appKey,
    'x-ca-nonce': uuid.v4(),
    'x-ca-stage': stage,
    'accept': 'application/json',
  }, headers, signHeaders)
}

export function getSignedHeadersString (signHeaders: Array<string>, headers: StringMap) {
  const list = []
  for (let ii in signHeaders) {
    const key = signHeaders[ii]
    list.push(key + ':' + headers[key])
  }

  return list.join('\n')
}
