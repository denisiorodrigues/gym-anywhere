import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const chekcInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchNearbyGymsUseCase(chekcInsRepository)

  return useCase
}
