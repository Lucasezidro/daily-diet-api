import { Snack } from '@prisma/client'
import { SnacksRepository } from '../../repositories/snacks-repository'

interface CreateSnackCaseRequest {
  name: string
  description: string
  createdAt: Date
  isPartOfTheDiet: boolean
  userId: string
}

interface CreateSnackCaseResponse {
  snack: Snack
}

export class CreateSnackCase {
  constructor(private snackRepository: SnacksRepository) {}

  async execute({
    name,
    description,
    createdAt,
    isPartOfTheDiet,
    userId,
  }: CreateSnackCaseRequest): Promise<CreateSnackCaseResponse> {
    const snack = await this.snackRepository.create({
      name,
      description,
      createdAt,
      isPartOfTheDiet,
      userId,
    })

    return { snack }
  }
}
