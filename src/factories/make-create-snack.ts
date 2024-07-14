import { PrismaSnacksRepository } from '../repositories/prisma/prisma-snacks-repository'
import { CreateSnackCase } from '../use-cases/snacks/create-snack'

export function makeCreateSnack() {
  const snackRepository = new PrismaSnacksRepository()
  const createSnackUseCase = new CreateSnackCase(snackRepository)

  return createSnackUseCase
}
