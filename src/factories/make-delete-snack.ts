import { PrismaSnacksRepository } from '../repositories/prisma/prisma-snacks-repository'
import { DeleteSnackCase } from '../use-cases/snacks/delete-snack'

export function makeDeleteSnacks() {
  const snackRepository = new PrismaSnacksRepository()
  const deleteSnackUseCase = new DeleteSnackCase(snackRepository)

  return deleteSnackUseCase
}
