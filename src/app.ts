import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/user/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '1d'
  }
})

app.register(cors, {
  origin: true,
  // origin: ['http://localhost:5173'], // Substitua pelo seu endereço de front-end
  credentials: true // Permitir credenciais
})

app.register(fastifyCookie)

app.register(usersRoutes)


app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: tratar error com logs futuros
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})