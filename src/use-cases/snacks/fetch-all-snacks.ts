import { Snack } from '@prisma/client'
import { SnacksRepository } from '../../repositories/snacks-repository'

interface FetchAllSnacksCaseRequest {
  userId: string
}

interface FetchAllSnacksCaseResponse {
  snacks: Snack[]
}

export class FetchAllSnacksCase {
  constructor(private snackRepository: SnacksRepository) {}

  async execute({
    userId,
  }: FetchAllSnacksCaseRequest): Promise<FetchAllSnacksCaseResponse> {
    const snacks = await this.snackRepository.fetchAll(userId)

    return { snacks }
  }
}
