import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usesRepository = new PrismaUsersRepository()
  const autheticateUseCase = new AuthenticateUseCase(usesRepository)

  return autheticateUseCase
}
