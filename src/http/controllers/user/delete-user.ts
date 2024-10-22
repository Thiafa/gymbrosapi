import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from '@/use-cases/users/delete-user'
import { FastifyReply, FastifyRequest } from "fastify";

export async function DeleteUser(req: FastifyRequest, res: FastifyReply) {
  const userId = req.params.id

  const prismaUsersRepository = new PrismaUsersRepository()

  try {
    const deleteUseCase = new DeleteUserUseCase(prismaUsersRepository)
    await deleteUseCase.execute({ userId })
    return res.status(200).send({ message: "User delete successfuly" })
  } catch (error) {
    console.error('Error ', error)
    return res.status(500).send()
  }
}