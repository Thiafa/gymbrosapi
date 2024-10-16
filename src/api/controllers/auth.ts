import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string().min(3, 'O nome deve ter mais de 3 caracteres'),
    email: z.string().min(3, 'O email deve ter mais de 3 caracteres'),
    password: z.string().min(6, 'A senha deve ter mais de 6 caracteres'),
  })
  

}