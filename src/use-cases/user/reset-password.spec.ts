import { InMemoryUsersRepository } from './../../repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { ResetPasswordUseCase } from './reset-password'

let userRepoitory: InMemoryUsersRepository
let sut: ResetPasswordUseCase

describe('Register user account', () => {
  beforeEach(() => {
    userRepoitory = new InMemoryUsersRepository()
    sut = new ResetPasswordUseCase(userRepoitory)
  })

  it('should be able to reset password', async () => {
    const createdUser = await userRepoitory.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
      password: '654321',
    })

    expect(user.password).toEqual('654321')
  })

  it('should not be able to reset password of another user', async () => {
    await userRepoitory.create({
      name: 'John Doe',
      email: 'john@acme.com',
      objective: 'Perder peso',
      password: await hash('123456', 6),
      role: 'user',
    })

    await expect(() =>
      sut.execute({
        userId: 'another-user-id',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
