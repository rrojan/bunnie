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

  get(path: string, handler: ExpressHandler) {
    this.register('GET', path, handler)
  }

  post(path: string, handler: ExpressHandler) {
    this.register('POST', path, handler)
  }

  patch(path: string, handler: ExpressHandler) {
    this.register('PATCH', path, handler)
  }

  put(path: string, handler: ExpressHandler) {
    this.register('PUT', path, handler)
  }

  delete(path: string, handler: ExpressHandler) {
    this.register('DELETE', path, handler)
  }

  listen(port: number, cb: Function) {
    serve({
      port,
      routes: this.routes,
    })
    cb()
  }
}

export default App
