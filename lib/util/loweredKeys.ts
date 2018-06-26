import _ from 'lodash'

import StringMap from '../types/StringMap'

export function loweredKeys (headers: StringMap = {}): StringMap {
  const lowered: StringMap = {}

  _.forEach(headers, function (value: any, key: string) {
    let lowerKey = key.toLowerCase()
    lowered[lowerKey] = value
  })

  return lowered
}
