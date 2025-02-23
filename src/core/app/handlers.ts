import { HttpStatus } from '../http/constants'
import type HttpRequest from '../http/request'
import HttpResponse from '../http/response'
import type { Handler } from './index.d'

export const notFound: Handler = (req: HttpRequest, res: HttpResponse) => {
  return new HttpResponse(HttpStatus.NotFound)
}
