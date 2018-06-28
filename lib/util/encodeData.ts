import _ from 'lodash'

function encode (val: string) {
  // return encodeURIComponent(val)
  //   .replace(/%40/gi, '@')
  //   .replace(/%3A/gi, ':')
  //   .replace(/%24/g, '$')
  //   .replace(/%2C/gi, ',')
  //   .replace(/%20/g, '+')
  //   .replace(/%5B/gi, '[')
  //   .replace(/%5D/gi, ']')
  return val
    .replace(/\+/g, encodeURIComponent('+'))
    .replace(/&/g, encodeURIComponent('&'))
}

export function encodeData (data?: any) {
  if (_.isNil(data)) {
    return data
  } else if (typeof data === 'string') {
    return encode(data)
  } else if (typeof data === 'object') {
    const encodedData: any = { }
    Object.keys(data).sort().forEach(function (key) {
      encodedData[encode(key)] = encodeData(data[key])
    })
    return encodedData
  } else {
    return data
  }
}
