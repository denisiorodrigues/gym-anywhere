import request from 'supertest'
import { app } from '@/app'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should bo able to register', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jhondoe@email.com',
      }),
    )
  })
})
