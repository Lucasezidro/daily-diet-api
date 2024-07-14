import { PrismaSnacksRepository } from '../repositories/prisma/prisma-snacks-repository'
import { CountSnacksByUserIdCase } from '../use-cases/snacks/count-snacks-by-user-id'

export function makeCountSnacksByUserId() {
  const snackRepository = new PrismaSnacksRepository()
  const countSnacksByUserId = new CountSnacksByUserIdCase(snackRepository)

  return countSnacksByUserId
}
