import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  objective: string | null
  role: 'nutritionist' | 'user'
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    objective,
    password,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userwithSameEmail = await this.usersRepository.findByEmail(email)
    const hashedPassword = await hash(password, 6)

    if (userwithSameEmail) {
      throw new Error('User already exists.')
    }

    const user = await this.usersRepository.create({
      email,
      name,
      objective: objective ?? '',
      role: role ?? 'user',
      password: hashedPassword,
    })

    return { user }
  }
}
