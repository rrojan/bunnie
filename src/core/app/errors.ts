import { HttpStatus } from "../http/constants";
import type { HttpStatusCode } from "../http/types";

export class HttpException extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    message: string,
  ) {
    super(message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(HttpStatus.NotFound, message || "Bad Request");
  }
}

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(HttpStatus.BadRequest, message || "Bad Request");
  }
}
