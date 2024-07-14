import { InMemoryUsersRepository } from './../../repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { hash } from 'bcryptjs'

let userRepoitory: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register user account', () => {
  beforeEach(() => {
    userRepoitory = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepoitory)
  })

  it('should be able to register an account', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: '123456',
      role: 'user',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register an account with same email twice', async () => {
    await userRepoitory.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'john@acme.com',
        objective: 'Perder peso',
        password: '123456',
        role: 'user',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
