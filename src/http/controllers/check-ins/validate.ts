import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeValidateCheckInUseCase } from '@/use-case/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsShema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsShema.parse(request.params)

  const validateMeckInUseCase = makeValidateCheckInUseCase()

  await validateMeckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
