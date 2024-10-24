import { type GroupRepository } from '@/repositories/interfaces/groups-repository'
import { Group } from '@prisma/client'
// import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface CreateGroupUseCaseRequest {
  title: string
  description: string
  authorId: number
}

interface CreateGroupUseCaseResponse {
  user: Group
}

export class CreateUserUseCase {
  constructor(private readonly groupsRepository: GroupRepository) { }

  async execute({
    title,
    description,
    authorId
  }: CreateGroupUseCaseRequest): Promise<CreateGroupUseCaseResponse> {
    const group = await this.groupsRepository.create({
      title,
      description,
      authorId
    })

    return { group }
  }
}