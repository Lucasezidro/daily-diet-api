import { SnacksRepository } from '../../repositories/snacks-repository'

interface CountSnacksByUserIdCaseRequest {
  userId: string
}

interface CountSnacksByUserIdCaseResponse {
  countSnacks: number
}

export class CountSnacksByUserIdCase {
  constructor(private snackRepository: SnacksRepository) {}

  async execute({
    userId,
  }: CountSnacksByUserIdCaseRequest): Promise<CountSnacksByUserIdCaseResponse> {
    const countSnacks = await this.snackRepository.countByUserId(userId)

    return { countSnacks }
  }
}
