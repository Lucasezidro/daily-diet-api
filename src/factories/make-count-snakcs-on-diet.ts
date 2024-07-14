import { PrismaSnacksRepository } from '../repositories/prisma/prisma-snacks-repository'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { CountSnacksOnDietCase } from '../use-cases/snacks/count-snacks-on-diet'

export function makeCountSnacksOnDiet() {
  const usersRepository = new PrismaUsersRepository()

  const snackRepository = new PrismaSnacksRepository()
  const countSnacksOnDietUseCase = new CountSnacksOnDietCase(
    snackRepository,
    usersRepository,
  )

  return countSnacksOnDietUseCase
}
