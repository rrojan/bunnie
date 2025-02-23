import App from './core/app'

const PORT = 8000

const app = new App()

app.get('/', (_req, res) => {
  res.json({ message: 'Hello world!' })
})

app.listen(PORT, () => {
  console.info(`App is listening on port ${PORT}`)
})
