import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../use-cases/user/register'

export function makeRegisterUser() {
  const userRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUseCase(userRepository)

  return registerUserUseCase
}
