import { PaginationType } from '@/@types/paginate'
import { type Prisma, type User } from '@prisma/client'

export interface UsersRepository {
  findById: (id: string) => Promise<User | null>
  getAll: (page: number, pageSize: number) => Promise<PaginationType<User>>
  findByEmail: (email: string) => Promise<User | null>
  create: (data: Prisma.UserCreateInput) => Promise<User>
  update: (id: string, data: Prisma.UserUpdateInput) => Promise<User>
  delete: (id: string) => Promise<User>
}