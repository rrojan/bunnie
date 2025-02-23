import App from "./core/app";

const PORT = 8000;

const app = new App();
app.listen(8000, () => {
  console.info(`App is listening on port ${PORT}`);
});
