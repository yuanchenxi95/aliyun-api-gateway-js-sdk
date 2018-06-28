// Attribution: https://github.com/axios/axios/blob/master/lib/helpers/buildURL.js
import _ from 'lodash'
import StringAny from '../types/StringAny'

function encode (val: string) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']')
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray (val?: any) {
  return toString.call(val) === '[object Array]'
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate (val?: any) {
  return toString.call(val) === '[object Date]'
}

/**
 * Build a URL by appending params to the end
 *
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
export function buildParams (params: StringAny) {
  /*eslint no-param-reassign:0*/
  if (_.isNil(params)) {
    return ''
  }

  let serializedParams
  const parts: Array<string> = []
  _.forEach(params, function serialize (val, key) {
    if (val === null || typeof val === 'undefined') {
      return
    }

    if (isArray(val)) {
      key = key + '[]'
    } else {
      val = [val]
    }
    _.forEach(val, function parsevalue (v: any) {
      let newValue
      if (isDate(v)) {
        newValue = v.toString()
      } else {
        newValue = JSON.stringify(v)
      }
      parts.push(encode(key) + '=' + encode(v))
    })
  })

  serializedParams = parts.join('&')

  return serializedParams
}
