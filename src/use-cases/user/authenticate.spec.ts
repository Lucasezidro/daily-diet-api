import { InMemoryUsersRepository } from './../../repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'

let userRepoitory: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Register user account', () => {
  beforeEach(() => {
    userRepoitory = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepoitory)
  })

  it('should be able to authenticate', async () => {
    const createdUser = await userRepoitory.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    const { user } = await sut.execute({
      email: createdUser.email,
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await userRepoitory.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    await expect(() =>
      sut.execute({
        email: 'wrongemail@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const createdUser = await userRepoitory.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    await expect(() =>
      sut.execute({
        email: createdUser.email,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
