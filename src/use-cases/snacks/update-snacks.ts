import { Snack } from '@prisma/client'
import { SnacksRepository } from '../../repositories/snacks-repository'

interface UpdateSnackCaseRequest {
  id: string
  name: string
  description: string
  createdAt: Date
  isPartOfTheDiet: boolean
}

interface UpdateSnackCaseResponse {
  snack: Snack
}

export class UpdateSnackCase {
  constructor(private snackRepository: SnacksRepository) {}

  async execute({
    id,
    name,
    description,
    isPartOfTheDiet,
  }: UpdateSnackCaseRequest): Promise<UpdateSnackCaseResponse> {
    const snack = await this.snackRepository.fetchOneById(id)

    if (!snack) {
      throw new Error('Snack not found.')
    }

    snack.name = name
    snack.description = description
    snack.isPartOfTheDiet = isPartOfTheDiet

    await this.snackRepository.update(snack)

    return { snack }
  }
}
