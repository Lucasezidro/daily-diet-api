import { PrismaSnacksRepository } from '../repositories/prisma/prisma-snacks-repository'
import { FetchAllSnacksCase } from '../use-cases/snacks/fetch-all-snacks'

export function makeFetchAllSnacks() {
  const snackRepository = new PrismaSnacksRepository()
  const fetchAllSnacksUseCase = new FetchAllSnacksCase(snackRepository)

  return fetchAllSnacksUseCase
}
