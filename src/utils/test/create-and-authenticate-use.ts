import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Jhon Doe',
    email: 'jhondoe@email.com',
    password: '123456',
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
