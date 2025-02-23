import { HttpStatus } from '../http/constants'

type ExpressResponseType = 'json' | 'text' | 'html'

class ExpressResponse {
  public type: ExpressResponseType = 'text'
  public body: string | object = ''

  constructor(public status: number = HttpStatus.OK) {}

  text(body: string) {
    this.type = 'text'
    this.body = body
  }

  json(body: object) {
    this.type = 'json'
    this.body = body
  }

  html(body: string) {
    this.type = 'html'
    this.body = body
  }

  buildResponse(): Response {
    switch (this.type) {
      case 'json':
        return Response.json(this.body as object, {
          headers: { 'Content-Type': 'application/json' },
        })
      case 'html':
        return new Response(this.body as string, {
          headers: { 'Content-Type': 'text/html' },
        })
      case 'text':
      default:
        return new Response(this.body as string, {
          headers: { 'Content-Type': 'text/plain' },
        })
    }
  }
}

export default ExpressResponse
