import type { HttpMethod } from '../http'
import type { BunHandler, ExpressHandler } from './index.d'
import ExpressResponse from './response'

class App {
  private routes: Record<string, Partial<Record<HttpMethod, BunHandler>>> = {}

  private adaptHandler(handler: ExpressHandler): BunHandler {
    return async (req: Request) => {
      const res = new ExpressResponse()
      await handler(req, res)
      return res.buildResponse()
    }
  }

  private register(method: HttpMethod, path: string, handler: ExpressHandler) {
    this.routes[path] ??= {}
    this.routes[path][method] = this.adaptHandler(handler)
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
    Bun.serve({
      port,
      routes: this.routes,
    })
    cb()
  }
}

export default App
