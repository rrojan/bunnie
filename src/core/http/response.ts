import { CRLF, HttpStatus } from './constants'

export const statusLines: Partial<Record<HttpStatus, string>> = {
  [HttpStatus.OK]: 'HTTP/1.1 200 OK',
  [HttpStatus.NotFound]: 'HTTP/1.1 404 NOT FOUND',
  [HttpStatus.BadRequest]: 'HTTP/1.1 500 BAD REQUEST',
}

class HttpResponse {
  constructor(
    public status: HttpStatus,
    public body: string = '',
    public headers: Record<string, string> = {}
  ) {}

  buildHttpResponse(): string {
    let response = ``
    // Build status line
    response += statusLines[this.status] || statusLines[HttpStatus.BadRequest]
    response += CRLF
    // Build headers
    console.log(this.headers)
    for (const key of Object.keys(this.headers)) {
      response += `${key}: ${this.headers[key]}${CRLF}`
    }
    response += CRLF
    // Build body
    response += this.body || ''
    return response
  }

  json(body: Object) {
    this.headers['Content-Type'] = 'application/json'
    this.body = JSON.stringify(body)
  }

  send(body: string) {
    this.headers['Content-Type'] = 'text/plain'
    this.body = body
  }

  html(body: string) {
    this.headers['Content-Type'] = 'text/html'
    this.body = body
  }
}

export default HttpResponse
