import express, { json } from 'express'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'

const app = express()

app.use(json())
app.use(compression())
app.use(morgan('dev'))
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Corriendo en el puerto 3000')
})
