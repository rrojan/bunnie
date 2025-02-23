import { BadRequestException } from '../app/errors'
import type { HttpStatus } from './constants'

class HttpRequest {
  public path: string
  public method: string
  public body: string

  constructor(rawRequest: Buffer) {
    const request = rawRequest.toString()
    if (!request)
      throw new BadRequestException('Unable to parse request buffer')

    const [requestLine, headers, body] = request.split('\r\n')?.[0]
    if (!requestLine)
      throw new BadRequestException('Unable to parse request-line')

    const [method, path] = request.split(' ')

    this.method = method
    this.path = path
    this.body = body
  }

  json() {
    return JSON.parse(this.body)
  }
}

export default HttpRequest
