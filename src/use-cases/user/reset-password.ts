import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'

interface ResetPasswordUseCaseRequest {
  userId: string
  password: string
}

interface ResetPasswordUseCaseResponse {
  user: User
}

export class ResetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    password,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    user.password = password

    await this.usersRepository.save(user)

    return { user }
  }
}
