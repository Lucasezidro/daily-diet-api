import { Snack } from '@prisma/client'
import { SnacksRepository } from '../../repositories/snacks-repository'

interface FetchOneSnackByIdCaseRequest {
  snackId: string
}

interface FetchOneSnackByIdCaseResponse {
  snack: Snack
}

export class FetchOneSnackByIdCase {
  constructor(private snackRepository: SnacksRepository) {}

  async execute({
    snackId,
  }: FetchOneSnackByIdCaseRequest): Promise<FetchOneSnackByIdCaseResponse> {
    const snack = await this.snackRepository.fetchOneById(snackId)

    if (!snack) {
      throw new Error('Snack not found.')
    }

    return { snack }
  }
}
