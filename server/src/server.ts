import fastify from 'fastify'
import { memoriresRoutes } from './routes/memories'

const app = fastify()

app.register(memoriresRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on port 3333')
  })
