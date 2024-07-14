import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemorySnacksRepository } from '../../repositories/in-memory/in-memory-snacks-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { FetchOneSnackByIdCase } from './fetch-one-snack-by-id'

let userRepository: InMemoryUsersRepository

let snackRepository: InMemorySnacksRepository
let sut: FetchOneSnackByIdCase

describe('Fetch one snack by id', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()

    snackRepository = new InMemorySnacksRepository()
    sut = new FetchOneSnackByIdCase(snackRepository)
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

    const { snack } = await sut.execute({
      snackId: createdSnack.id,
    })

    expect(snack.id).toEqual(createdSnack.id)
  })
})
