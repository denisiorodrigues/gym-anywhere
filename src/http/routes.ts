import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  /** Rotas públicas */
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Rotas com autenticação */
  app.get('/me', profile)
}
