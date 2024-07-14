import { Prisma, Snack } from '@prisma/client'
import { SnacksRepository } from '../snacks-repository'

export class InMemorySnacksRepository implements SnacksRepository {
  public items: Snack[] = []

  async create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack> {
    const snack = {
      id: 'snack-id',
      name: data.name,
      description: data.description,
      createdAt: (data.createdAt as Date) ?? new Date(),
      updatedAt: new Date(),
      isPartOfTheDiet: data.isPartOfTheDiet,
      userId: data.userId,
    }

    this.items.push(snack)

    return snack
  }

  async update(snack: Snack): Promise<Snack> {
    const snackIndex = this.items.findIndex((item) => item.id === snack.id)

    if (snackIndex >= 0) {
      this.items[snackIndex] = snack
    }

    return snack
  }

  async delete(snack: Snack): Promise<void> {
    const snackIndex = this.items.findIndex((item) => item.id === snack.id)

    this.items.splice(snackIndex, 1)
  }

  async fetchAll(userId: string): Promise<Snack[]> {
    const snacks = this.items.filter((item) => item.userId === userId)

    return snacks
  }

  async fetchOneById(snackId: string): Promise<Snack | null> {
    const snack = this.items.find((item) => item.id === snackId)

    if (!snack) {
      return null
    }

    return snack
  }

  async countByUserId(userId: string): Promise<number> {
    const snack = this.items.filter((item) => item.userId === userId).length

    return snack
  }

  async quantityOfDaysOnDiet(): Promise<number> {
    const daysInTheDiet = this.items.filter(
      (item) => item.isPartOfTheDiet === true,
    ).length

    return daysInTheDiet
  }

  async quantityOfDaysOffDiet(): Promise<number> {
    const daysInTheDiet = this.items.filter(
      (item) => item.isPartOfTheDiet === false,
    ).length

    return daysInTheDiet
  }
}
