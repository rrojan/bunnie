export type BunHandler = (request: Request) => Response | Promise<Response>
export type ExpressHandler = (
  request: Request,
  response: any
) => void | Promise<void>
