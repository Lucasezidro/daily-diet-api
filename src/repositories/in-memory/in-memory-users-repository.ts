import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-id',
      name: data.name,
      email: data.email,
      password: data.password,
      objective: data.objective ?? '',
      role: data.role ?? 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async save(user: User): Promise<User> {
    const userIndex = this.items.findIndex((item) => item.id === user.id)

    if (userIndex >= 0) {
      this.items[userIndex] = user
    }

    return user
  }
}
