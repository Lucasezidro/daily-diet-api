import { SnacksRepository } from '../../repositories/snacks-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface CountSnacksOffDietCaseRequest {
  userId: string
}

interface CountSnacksOffDietCaseResponse {
  snacksOnDiet: number
}

export class CountSnacksOffDietCase {
  constructor(
    private snackRepository: SnacksRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: CountSnacksOffDietCaseRequest): Promise<CountSnacksOffDietCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    const snacksOnDiet = await this.snackRepository.quantityOfDaysOffDiet()

    return { snacksOnDiet }
  }
}
