import { PrismaSnacksRepository } from '../repositories/prisma/prisma-snacks-repository'
import { FetchOneSnackByIdCase } from '../use-cases/snacks/fetch-one-snack-by-id'

export function makeFetchOneSnackById() {
  const snackRepository = new PrismaSnacksRepository()
  const fetchOneSnackById = new FetchOneSnackByIdCase(snackRepository)

  return fetchOneSnackById
}
