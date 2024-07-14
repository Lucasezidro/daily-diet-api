import { PrismaSnacksRepository } from '../repositories/prisma/prisma-snacks-repository'
import { UpdateSnackCase } from '../use-cases/snacks/update-snacks'

export function makeUpdateSnacks() {
  const snackRepository = new PrismaSnacksRepository()
  const updateSnackUseCase = new UpdateSnackCase(snackRepository)

  return updateSnackUseCase
}
