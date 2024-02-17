import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { makeFetchUserChekInsHistoryUseCase } from '@/use-case/factories/make-fetch-user-check-ins-history'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fatchUserCheckInsHistory = makeFetchUserChekInsHistoryUseCase()

  const { checkIns } = await fatchUserCheckInsHistory.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
