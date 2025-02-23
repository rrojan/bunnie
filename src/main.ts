import App from "./core/app";
import { HttpStatus } from "./core/http/constants";
import HttpResponse from "./core/http/response";

const PORT = 8000;

const app = new App();

app.get("/", (req) => {
  return new HttpResponse(HttpStatus.OK, undefined, "Hello world");
});

app.listen(PORT, () => {
  console.info(`App is listening on port ${PORT}`);
});
