import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(dados: Prisma.GymCreateInput): Promise<Gym>
}
