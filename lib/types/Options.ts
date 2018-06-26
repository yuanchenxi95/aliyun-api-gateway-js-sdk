import StringMap from './StringMap'

declare class Options {
  url: string
  signHeaders?: StringMap
  headers?: StringMap
  data?: any
  timeout?: number
}

export default Options
