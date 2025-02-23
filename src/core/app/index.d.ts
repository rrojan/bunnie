import type HttpRequest from '../http/request'
import type HttpResponse from '../http/response'

export type Handler = (request: HttpRequest, response: HttpResponse) => unknown
