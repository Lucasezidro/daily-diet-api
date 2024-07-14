import { SnacksRepository } from '../../repositories/snacks-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface CountSnacksOnDietCaseRequest {
  userId: string
}

interface CountSnacksOnDietCaseResponse {
  snacksOnDiet: number
}

export class CountSnacksOnDietCase {
  constructor(
    private snackRepository: SnacksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: CountSnacksOnDietCaseRequest): Promise<CountSnacksOnDietCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    const snacksOnDiet = await this.snackRepository.quantityOfDaysOnDiet()

    return { snacksOnDiet }
  }
}
