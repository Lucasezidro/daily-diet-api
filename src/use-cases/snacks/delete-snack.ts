import { SnacksRepository } from '../../repositories/snacks-repository'

interface DeleteSnackCaseRequest {
  snackId: string
}

export class DeleteSnackCase {
  constructor(private snackRepository: SnacksRepository) {}

  async execute({ snackId }: DeleteSnackCaseRequest): Promise<void> {
    const snack = await this.snackRepository.fetchOneById(snackId)

    if (!snack) {
      throw new Error('Snack not found.')
    }

    await this.snackRepository.delete(snack)
  }
}
