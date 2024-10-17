import { PaginationQuery } from '@/@types/festifyRequest'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '@/use-cases/users/get-user'
import { FastifyReply } from 'fastify'

export async function GetUser (req: PaginationQuery, res: FastifyReply) {
  const prismaUsersRepository = new PrismaUsersRepository()

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || 10

  try {
    const userUseCase = new GetUserUseCase(prismaUsersRepository)
    const users = userUseCase.execute(page, pageSize)

    return users
  } catch (err) {
    // if (err instanceof UserAlreadyExistsError) {
    //   return res.status(409).send({ message: err.message })
    // }
    console.error(err)

    return res.status(500).send()
  }
}