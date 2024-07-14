import { Prisma, Snack } from '@prisma/client'

export interface SnacksRepository {
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>
  update(snack: Snack): Promise<Snack>
  delete(snack: Snack): Promise<void>

  fetchAll(userId: string): Promise<Snack[]>
  fetchOneById(snackId: string): Promise<Snack | null>

  countByUserId(userId: string): Promise<number>
  quantityOfDaysOnDiet(): Promise<number>
  quantityOfDaysOffDiet(): Promise<number>
}
