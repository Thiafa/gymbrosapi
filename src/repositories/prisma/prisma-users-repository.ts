import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../interfaces/users-repository'
import { prisma } from '@/lib/prisma'
import { PaginationType } from '@/@types/paginate'

export class PrismaUsersRepository implements UsersRepository {
  async findById (id: string) {
    console.log(typeof id)
    const userId = Number(id)
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    return user
  }

  async getAll (page: number, pageSize: number): Promise<PaginationType<User>> {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const [data, totalCount] = await Promise.all([
      await prisma.user.findMany({
        skip,
        take
      }),
      prisma.user.count()
    ])

    return { data, totalCount }
  }

  async findByEmail (email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async create (data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async update (id: string, data: Prisma.UserUpdateInput) {
    const userId = Number(id)
    const user = await prisma.user.update({
      where: { id: userId },
      data
    })

    return user
  }

  async delete (id: string) {
    const userId = Number(id)
      const user = await prisma.user.delete({
        where: { id: userId }
      }) 
      return user
    
  }
}