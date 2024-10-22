import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'
import { NotFoundError } from '@/use-cases/errors/not-found-error'

interface DeleteUserCaseRequest {
  userId: string
}

interface DeleteUserCaseResponse {
  user: User
}

export class DeleteUserUseCase  {
  constructor(private readonly userRepository: UsersRepository) { }

  async execute({
    userId
  }: DeleteUserCaseRequest): Promise<DeleteUserCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundError()
    }

    const userResult = await this.userRepository.delete(userId)

    return { user: userResult }
  }
}