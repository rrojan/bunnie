import { CRLF, HttpStatus } from './constants'

export const statusLines: Partial<Record<HttpStatus, string>> = {
  [HttpStatus.OK]: 'HTTP/1.1 200 OK',
  [HttpStatus.NotFound]: 'HTTP/1.1 404 NOT FOUND',
  [HttpStatus.BadRequest]: 'HTTP/1.1 500 BAD REQUEST',
}

class HttpResponse {
  constructor(
    public status: HttpStatus,
    public headers?: string,
    public body?: string
  ) {}

  buildHttpResponse(): string {
    let response = ``
    // Build status line
    response += statusLines[this.status] || statusLines[HttpStatus.BadRequest]
    response += CRLF
    // Build headers
    response += this.headers || ''
    response += CRLF
    // Build body
    response += this.body || ''
    return response
  }
}

export default HttpResponse
