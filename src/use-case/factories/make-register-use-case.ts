import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserCase } from '../register'

export function makeRegisterUseCase() {
  const usesRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserCase(usesRepository)

  return registerUseCase
}
