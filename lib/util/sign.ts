import _ from 'lodash'
import queryString from 'query-string'
import parse from 'url-parse'

import StringMap from '../types/StringMap'
import { CONTENT_TYPE_FORM } from '../constants/contentTypes'

function buildUrl (url: string, data?: any): string {
  const parsedUrl = parse(url, true)
  let params: string = queryString.stringify(parsedUrl.query)
  if (_.isNil(data)) {
    if (params === '') {
      return parsedUrl.pathname
    } else {
      return parsedUrl.pathname + '?' + params
    }
  }
  console.log(parsedUrl)
  let dataString = JSON.stringify(data)
  if (params === '') {
    return parsedUrl.pathname + '?' + dataString
  } else {
    return parsedUrl.pathname + '?' + params + '&' + dataString
  }
}

export function buildStringToSign (
  method: string,
  headers: StringMap,
  signedHeaders: string,
  url: string,
  data?: any,
): string {
  const lf = '\n'
  const list = [method, lf]

  const accept = headers['accept']
  if (!_.isNil(accept)) {
    list.push(accept)
  }
  list.push(lf)

  const contentMD5 = headers['content-md5']
  if (contentMD5) {
    list.push(contentMD5)
  }
  list.push(lf)

  const contentType = headers['content-type'] || ''
  if (contentType) {
    list.push(contentType)
  }
  list.push(lf)

  const date = headers['date']
  if (date) {
    list.push(date)
  }
  list.push(lf)

  if (signedHeaders) {
    list.push(signedHeaders)
    list.push(lf)
  }

  if (contentType.startsWith(CONTENT_TYPE_FORM) && !_.isNil(data)) {
    list.push(buildUrl(url, data))
  } else {
    list.push(buildUrl(url))
  }

  console.log(list)
  return list.join('')
}
