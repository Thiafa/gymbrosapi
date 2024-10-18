import { type UsersRepository } from '@/repositories/interfaces/users-repository'
import { type User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) { }

  async execute(
    {
      name,
      email,
      password
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return {
      user
    }
  }
}