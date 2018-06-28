// Attribution: https://github.com/axios/axios/blob/master/lib/helpers/buildURL.js
import _ from 'lodash'
import StringAny from '../types/StringAny'

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
    _.forEach(val, function parseValue (v: any) {
      let newValue = v
      if (isDate(v)) {
        newValue = v.toString()
      }
      if (newValue === '') {
        parts.push(key)
      } else {
        parts.push(key + '=' + newValue)
      }
    })
  })

  serializedParams = parts.join('&')

  return serializedParams
}
