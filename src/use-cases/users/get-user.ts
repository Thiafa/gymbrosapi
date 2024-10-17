import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'

interface GetUserUseCaseResponse {
  users: User[]
  from: number
  to: number
  page: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export class GetUserUseCase {
  constructor (private readonly userRepository: UsersRepository) {}

  async execute (page: number, pageSize: number): Promise<GetUserUseCaseResponse> {
    const { data, totalCount } = await this.userRepository.getAll(page, pageSize)

    if (!data) {
      // throw new ResourceNotFoundError()
      console.error('User not found')
    }

    const from = (page - 1) * pageSize + 1
    const to = from + data.length - 1
    const hasNextPage = to < totalCount
    const hasPreviousPage = from > 1

    return {
      users: data,
      from,
      to,
      page,
      pageSize,
      totalCount,
      hasNextPage,
      hasPreviousPage
    }
  }
}