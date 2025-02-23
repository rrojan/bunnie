import type { HttpStatus } from './constants'

export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus]

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
