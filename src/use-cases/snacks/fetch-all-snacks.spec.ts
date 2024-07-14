import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemorySnacksRepository } from '../../repositories/in-memory/in-memory-snacks-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { FetchAllSnacksCase } from './fetch-all-snacks'

let userRepository: InMemoryUsersRepository

let snackRepository: InMemorySnacksRepository
let sut: FetchAllSnacksCase

describe('Fetch all snacks', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()

    snackRepository = new InMemorySnacksRepository()
    sut = new FetchAllSnacksCase(snackRepository)
  })

  it('should be able to update a snack', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    await snackRepository.create({
      name: 'Macarronada',
      description: 'macarrão com almondegas',
      isPartOfTheDiet: true,
      createdAt: new Date(),
      userId: createdUser.id,
    })

    await snackRepository.create({
      name: 'Hamburguer',
      description: 'Big Mac',
      isPartOfTheDiet: false,
      createdAt: new Date(),
      userId: createdUser.id,
    })

    const { snacks } = await sut.execute({
      userId: createdUser.id,
    })

    expect(snacks).toHaveLength(2)
  })
})
