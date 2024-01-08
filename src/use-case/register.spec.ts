import { expect, describe, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon regsitration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    const isPAsswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPAsswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
