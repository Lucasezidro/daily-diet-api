import { PrismaSnacksRepository } from '../repositories/prisma/prisma-snacks-repository'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { CountSnacksOffDietCase } from '../use-cases/snacks/count-snacks-off-diet'

export function makeCountSnacksOffDiet() {
  const usersRepository = new PrismaUsersRepository()

  const snackRepository = new PrismaSnacksRepository()
  const countSnacksOffDiet = new CountSnacksOffDietCase(
    snackRepository,
    usersRepository,
  )

  return countSnacksOffDiet
}
