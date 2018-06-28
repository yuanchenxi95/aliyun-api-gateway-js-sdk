import StringMap from './StringMap'

declare class Options {
  url: string
  signHeaders?: StringMap
  headers?: StringMap
  params?: object
  data?: any
  timeout?: number
}

export default Options
