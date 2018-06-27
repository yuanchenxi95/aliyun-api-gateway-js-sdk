import StringMap from '../types/StringMap'

export function sortKey (obj: StringMap): StringMap {
  const ordered: StringMap = { }
  Object.keys(obj).sort().forEach(function (key) {
    ordered[key] = obj[key]
  })
  return ordered
}
