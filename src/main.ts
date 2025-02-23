import App from './core/app'

const PORT = 8000

const app = new App()

app.get('/', (_req, res) => {
  res.json({ message: 'Hello world' })
})

app.get('/text', (_req, res) => {
  res.text('Hello world!')
})

app.get('/html', (_req, res) => {
  res.html('<h1>Hello world!</h1>')
})

app.listen(PORT, () => {
  console.info('Listening on port ' + PORT)
})
