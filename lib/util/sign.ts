import _ from 'lodash'
import parse from 'url-parse'

import StringMap from '../types/StringMap'
import { CONTENT_TYPE_FORM } from '../constants/contentTypes'
import { buildParams } from './buildURL'
import { sortKey } from './sort'

function buildUrl (url: string, params?: object, data?: any): string {
  // @ts-ignore
  const parsedUrl = parse(url, true)
  let newParams = sortKey(Object.assign({}, parsedUrl.query, params))
  let paramsString: string = buildParams(newParams)
  if (_.isNil(data)) {
    if (paramsString === '') {
      return parsedUrl.pathname
    } else {
      return parsedUrl.pathname + '?' + paramsString
    }
  }
  let dataString = JSON.stringify(data)
  if (paramsString === '') {
    return parsedUrl.pathname + '?' + dataString
  } else {
    return parsedUrl.pathname + '?' + paramsString + '&' + dataString
  }
}

export function buildStringToSign (
  method: string,
  headers: StringMap,
  signedHeaders: string,
  url: string,
  data?: any,
  params?: object,
): string {
  const lf = '\n'
  const list = [method, lf]

  // const accept = headers['accept']
  // if (!_.isNil(accept)) {
  //   list.push(accept)
  // }

  // use axios default headers
  list.push('application/json, text/plain, */*')
  list.push(lf)

  const contentMD5 = headers['content-md5']
  if (contentMD5) {
    list.push(contentMD5)
  }
  list.push(lf)

  const contentType = headers['content-type'] || ''
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node push content Type
    list.push(contentType)
  }
  // else if (typeof XMLHttpRequest !== 'undefined') {
  //
  // }

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
    list.push(buildUrl(url, params, data))
  } else {
    list.push(buildUrl(url, params))
  }

  return list.join('')
}
