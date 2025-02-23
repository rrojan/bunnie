import App from './core/app'
import { HttpStatus } from './core/http/constants'
import htmlString from './index.html' with { type: 'text' }

const PORT = 8000

const app = new App()

app.get('/', (_req, res) => {
  res.html(htmlString)
})

app.get('/products', (_req, res) => {
  res.json({ data: ['Phone', 'Laptop', 'Chargers'] })
})

app.post('/products', async (req, res) => {
  let data = await req.json()
  res.status(HttpStatus.Created)
  res.json({ message: 'Created a new product', data })
})

app.put('/products/:id', async (req, res) => {
  // const { id } = req.params
  const id = 1
  const data = await req.json()
  res.json({ message: `Updated product with id ${id}`, data })
})

app.put('/products/:id', async (req, res) => {
  const data = await req.json()
  res.json({ message: `Deleted product with id ${req.url}`, data })
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
