import App from './core/app'
import { HttpStatus } from './core/http/constants'
import htmlString from './index.html' with { type: 'text' }

const PORT = 8000

const app = new App()

app.get('/', (_req, res) => {
  res.html(htmlString)
})

app.get('/health-check', (_req, res) => {
  res.json({ message: 'Seems to be running... for now' })
})

app.post('/products', (req, res) => {
  const data = req.json()
  console.log('Created new data: ', data)
  res.status = HttpStatus.Created
  res.json({ message: 'Created product' })
})

app.put('/products/1', (req, res) => {
  const data = req.json()
  console.log('Updating existing data with', data)
  res.json({ message: 'Updated product' })
})

app.listen(PORT, () => {
  console.info(`App is listening on port ${PORT}`)
})
