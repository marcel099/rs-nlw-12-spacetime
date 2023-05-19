import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import { memoriresRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { auth } from './config/auth'
import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: auth.token_secret,
})
app.register(multipart)

app.register(memoriresRoutes)
app.register(authRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on port 3333')
  })
