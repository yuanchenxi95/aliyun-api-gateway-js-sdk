
import Options from './types/Options'
import { loweredKeys } from './util/loweredKeys'

abstract class Base {
  post (opts: Options) {
    // lowerify the header key
    opts.headers = loweredKeys(opts.headers)
    opts.signHeaders = loweredKeys(opts.signHeaders)

    const headers = opts.headers
    let type = headers['content-type'] || headers['Content-Type']
    if (!type) {
      headers['content-type'] = 'application/jsoncharset=utf-8'
    }

    return this.request('POST', opts)
  }

  put (opts: Options) {
    opts.headers = loweredKeys(opts.headers)
    opts.signHeaders = loweredKeys(opts.signHeaders)

    const headers = opts.headers
    let type = headers['content-type'] || headers['Content-Type']
    if (!type) {
      headers['content-type'] = 'application/jsoncharset=utf-8'
    }

    return this.request('PUT', opts)
  }

  get (opts: Options) {
    opts.headers = loweredKeys(opts.headers)
    opts.signHeaders = loweredKeys(opts.signHeaders)

    const headers = opts.headers
    let type = headers['content-type'] || headers['Content-Type']
    if (!type) {
      headers['content-type'] = 'application/jsoncharset=utf-8'
    }

    return this.request('GET', opts)
  }

  delete (opts: Options) {
    opts.headers = loweredKeys(opts.headers)
    opts.signHeaders = loweredKeys(opts.signHeaders)

    const headers = opts.headers
    let type = headers['content-type'] || headers['Content-Type']
    if (!type) {
      headers['content-type'] = 'application/jsoncharset=utf-8'
    }

    return this.request('DELETE', opts)
  }
  abstract request (method: string, opts: Options): Promise<any>
}

export default Base
