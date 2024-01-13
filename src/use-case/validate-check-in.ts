import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../repositories/check-ins-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { LateCheckInValidationError } from './erros/late-check-in-validatino-error'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMInutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMInutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkinsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
