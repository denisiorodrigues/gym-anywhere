import { expect, describe, it } from 'vitest'
import { RegisterUserCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon regsitration', async () => {
    const registerUseCase = new RegisterUserCase({
      findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

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
})
