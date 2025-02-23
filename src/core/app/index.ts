import { serve } from 'bun'
import type { HttpMethod } from '../http'
import type { BunHandler, ExpressHandler } from './index.d'
import ExpressResponse from './response'

class App {
  private routes: Record<string, Partial<Record<HttpMethod, BunHandler>>> = {}

  private register(method: HttpMethod, path: string, handler: ExpressHandler) {
    this.routes[path] ??= {}
    this.routes[path][method] = (req: Request) => {
      const res = new ExpressResponse()
      handler(req, res)
      return res.buildResponse()
    }
  }

  private registerFactory(method: HttpMethod) {
    return (path: string, handler: ExpressHandler) => {
      this.register(method, path, handler)
    }
  }

  get = this.registerFactory('GET')
  post = this.registerFactory('POST')
  put = this.registerFactory('PUT')
  patch = this.registerFactory('PATCH')
  delete = this.registerFactory('DELETE')

  listen(port: number, cb: Function) {
    serve({ port, routes: this.routes })
    cb()
  }
}

export default App
