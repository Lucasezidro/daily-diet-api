import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { ResetPasswordUseCase } from '../use-cases/user/reset-password'

export function makeResetPassword() {
  const userRepository = new PrismaUsersRepository()
  const resetPasswordUseCase = new ResetPasswordUseCase(userRepository)

  return resetPasswordUseCase
}
