import { HttpStatus } from "../http/constants";
import HttpResponse from "../http/response";
import type { Handler } from "./index.d";

export const rootHandler: Handler = () => {
  return new HttpResponse(HttpStatus.OK, "Hello world");
};

export const notFound: Handler = () => {
  return new HttpResponse(HttpStatus.NotFound);
};
