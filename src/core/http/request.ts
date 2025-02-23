import { BadRequestException } from '../app/errors'

class HttpRequest {
  public path: string
  public method: string

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
  }
}

export default HttpRequest
