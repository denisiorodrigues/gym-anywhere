import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface RegisteruseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisteruseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
