import request from 'supertest'
import { app } from '@/app'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-use'

describe('Nearby GYMS (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should bo able to list nearby gyms ', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Gym',
        description: 'Some description',
        phone: '1199999999',
        latitude: -3.7250784,
        longitude: -38.5657111,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Malhação',
        description: 'Some description',
        phone: '1199999999',
        latitude: -3.8379007,
        longitude: -38.4423192,
      })

    // const response = await request(app.server)
    //   .get('/gyms/nearby')
    //   .set('Authorization', `Bearer ${token}`)
    //   .query({
    //     latitude: -3.7321827,
    //     longitude: -38.5609648,
    //   })
    //   .send()

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Malhação',
      }),
    ])
  })
})
