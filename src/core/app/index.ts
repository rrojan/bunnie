import * as net from 'net'
import type { HttpMethod } from '../http'
import HttpRequest from '../http/request'
import { notFound } from './handlers'
import type { Handler } from './index.d'
import HttpResponse from '../http/response'
import { HttpStatus } from '../http/constants'

class App {
  private server
  private routes: Record<string, Partial<Record<HttpMethod, Handler>>> = {}
  public host = 'localhost'

  constructor() {
    this.server = net.createServer((socket) => {
      socket.on('data', (data: Buffer) => {
        this.handleRequest(socket, data)
      })
      socket.on('close', () => socket.end())
    })
  }

  private handleRequest = (socket: net.Socket, requestBuffer: Buffer) => {
    const request = new HttpRequest(requestBuffer)
    const handler =
      this.routes[request.path]?.[request.method as HttpMethod] || notFound
    const response = new HttpResponse(HttpStatus.OK)
    handler(request, response)
    socket.write(response.buildHttpResponse())
    socket.end()
  }

  private register(method: HttpMethod, path: string, handler: Handler) {
    this.routes[path] ??= {}
    this.routes[path][method] = handler
  }

  get(path: string, handler: Handler) {
    this.register('GET', path, handler)
  }

  post(path: string, handler: Handler) {
    this.register('POST', path, handler)
  }

  patch(path: string, handler: Handler) {
    this.register('PATCH', path, handler)
  }

  put(path: string, handler: Handler) {
    this.register('PUT', path, handler)
  }

  delete(path: string, handler: Handler) {
    this.register('DELETE', path, handler)
  }

  listen(port: number, cb: Function) {
    this.server.listen(port, this.host)
    cb()
  }
}

export default App
