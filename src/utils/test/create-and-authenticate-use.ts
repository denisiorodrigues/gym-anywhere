import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password_hash: await hash('123456', 6),
      role : isAdmin ? 'ADMIN' : 'MEMBER'
    }
  })

  const responseAuth = await request(app.server).post('/sessions').send({
    email: 'jhondoe@email.com',
    password: '123456',
  })

  const { token } = responseAuth.body

  return {
    token,
  }
}
