import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemorySnacksRepository } from '../../repositories/in-memory/in-memory-snacks-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { DeleteSnackCase } from './delete-snack'

let userRepository: InMemoryUsersRepository

let snackRepository: InMemorySnacksRepository
let sut: DeleteSnackCase

describe('Update snacks', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()

    snackRepository = new InMemorySnacksRepository()
    sut = new DeleteSnackCase(snackRepository)
  })

  it('should be able to update a snack', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    const createdSnack = await snackRepository.create({
      name: 'Macarronada',
      description: 'macarrão com almondegas',
      isPartOfTheDiet: true,
      createdAt: new Date(),
      userId: createdUser.id,
    })

    await sut.execute({
      snackId: createdSnack.id,
    })

    expect(snackRepository.items).toHaveLength(0)
  })
})
