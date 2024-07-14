import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { CreateSnackCase } from './create-snack'
import { InMemorySnacksRepository } from '../../repositories/in-memory/in-memory-snacks-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'

let userRepository: InMemoryUsersRepository

let snackRepository: InMemorySnacksRepository
let sut: CreateSnackCase

describe('Create snack', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()

    snackRepository = new InMemorySnacksRepository()
    sut = new CreateSnackCase(snackRepository)
  })

  it('should be able to crate a snack', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    const { snack } = await sut.execute({
      name: 'Macarronada',
      description: 'macarrão com almondegas',
      isPartOfTheDiet: true,
      createdAt: new Date(),
      userId: createdUser.id,
    })

    expect(snack.id).toEqual(expect.any(String))
  })
})
