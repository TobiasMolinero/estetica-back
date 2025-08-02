if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
import express, { json, NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import { routerAuth } from './routes/auth'
import { authenticateAccessToken, AuthenticatedRequest } from './middlewares/auth'

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

app.use((req: Request, res: Response, next: NextFunction) => {
  const publicsPaths = ['/auth/login', '/auth/logout']
  if(publicsPaths.includes(req.path)){
    return next
  }

  return authenticateAccessToken(req as AuthenticatedRequest, res, next)
})

app.use('/auth', routerAuth)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Corriendo en el puerto 3000')
})
