import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/user/routes'
import { FastifyRequest, FastifyReply } from 'fastify';

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

interface QueryParams {
  name?: string;
  excitement?: number;
}

// Defina o tipo para a resposta
interface HelloResponse {
  hello: string;
}

app.route<{ Querystring: QueryParams, Reply: HelloResponse }>({
  method: 'GET',
  url: '/',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
      },
      required: []
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: async (request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) => {
    const { name = 'world', excitement = 1 } = request.query;

    // Gere a resposta
    const response = { hello: `${name}${'!'.repeat(excitement)}` };
    
    reply.send(response);
  }
});


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