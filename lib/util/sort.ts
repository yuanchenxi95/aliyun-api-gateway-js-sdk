import _ from 'lodash'

import StringAny from '../types/StringAny'

export function sortKey (obj?: StringAny): StringAny | undefined {
  if (_.isNil(obj)) {
    return obj
  }
  const ordered: StringAny = { }
  Object.keys(obj).sort().forEach(function (key) {
    ordered[key] = obj[key]
  })
  return ordered
}
