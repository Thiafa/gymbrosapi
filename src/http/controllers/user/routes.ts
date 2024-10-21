import { type FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { CreateUser } from './create-users'
// import { GetUser } from './get-user'
// import { UpdateUser } from './update-user'
// import { DeleteUser } from './delete-user'
// import { refresh } from './refresh'
// import { verifyJWT } from '@/http/middlewares/verify-jtw'
// import { profile } from './profile'

export async function usersRoutes (app: FastifyInstance) {
  app.post('/login', authenticate)
  // app.patch('/token/refresh', refresh)
  app.post('/users', CreateUser)
  // app.get('/users', { onRequest: [verifyJWT] }, GetUser)
  // app.put('/users/:id', UpdateUser)
  // app.delete('/users/:id', DeleteUser) 
  // app.get('/me', profile)
}