import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3001), // Coerce, converte o valor para a confifiguração posterior
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Inválid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
