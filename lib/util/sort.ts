import StringAny from '../types/StringAny'

export function sortKey (obj: StringAny): StringAny {
  const ordered: StringAny = { }
  Object.keys(obj).sort().forEach(function (key) {
    ordered[key] = obj[key]
  })
  return ordered
}
