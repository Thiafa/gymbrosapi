import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { NotFoundError } from '@/use-cases/errors/not-found-error';
import { User } from '@prisma/client';

interface GetUsersProfileUseCaseRequest { id: string }
interface GetUsersProfileUseCaseResponse { user: User }

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) { }

  async execute({
    id
  }: GetUsersProfileUseCaseRequest): Promise<GetUsersProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new NotFoundError
    }

    return {
      user
    }
  }

}