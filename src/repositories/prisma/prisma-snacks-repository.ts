import { Prisma, Snack } from '@prisma/client'
import { SnacksRepository } from '../snacks-repository'
import { prisma } from '../../lib/prisma'

export class PrismaSnacksRepository implements SnacksRepository {
  async create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack> {
    const snack = await prisma.snack.create({
      data,
    })

    return snack
  }

  async update(snack: Snack): Promise<Snack> {
    const updatedSnack = await prisma.snack.update({
      where: {
        id: snack.id,
      },
      data: snack,
    })

    return updatedSnack
  }

  async delete(snack: Snack): Promise<void> {
    await prisma.snack.delete({
      where: {
        id: snack.id,
      },
    })
  }

  async fetchAll(userId: string): Promise<Snack[]> {
    const snacks = await prisma.snack.findMany({
      where: {
        userId,
      },
    })

    return snacks
  }

  async fetchOneById(snackId: string): Promise<Snack | null> {
    const snack = await prisma.snack.findUnique({
      where: {
        id: snackId,
      },
    })

    return snack
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.snack.count({
      where: {
        id: userId,
      },
    })

    return count
  }

  async quantityOfDaysOnDiet(): Promise<number> {
    const count = await prisma.snack.count({
      where: {
        isPartOfTheDiet: true,
      },
    })

    return count
  }

  async quantityOfDaysOffDiet(): Promise<number> {
    const count = await prisma.snack.count({
      where: {
        isPartOfTheDiet: false,
      },
    })

    return count
  }
}
