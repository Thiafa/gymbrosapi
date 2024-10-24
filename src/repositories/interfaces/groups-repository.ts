import { PaginationType } from '@/@types/paginate'
import { Group, type Prisma } from '@prisma/client'

export interface GroupRepository {
  findById: (id: string) => Promise<Group | null>
  getAll: (page: number, pageSize: number) => Promise<PaginationType<Group>>
  findByEmail: (email: string) => Promise<Group | null>
  create: (data: Prisma.GroupCreateInput) => Promise<Group>
  update: (id: string, data: Prisma.GroupUpdateInput) => Promise<Group>
  delete: (id: string) => Promise<Group>
}