import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '../../lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }

  async save(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    })

    return updatedUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
