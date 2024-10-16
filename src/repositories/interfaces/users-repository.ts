import { PaginationType } from '@/@types/paginate'
import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  async findById (id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user;
  }

  
}