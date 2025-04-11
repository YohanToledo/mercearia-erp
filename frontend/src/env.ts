import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']).optional(),
  VITE_SESSION_KEY: z.string().default('token'),
  VITE_API_URL: z.string().default('http://localhost:3000'),
  VITE_ENABLE_API_DELAY: z.string().transform(value => value === 'true').default('true'),
  VITE_SOFTWARE_VERSION: z.string().default('0.0.1'),
})

export const env = envSchema.parse(import.meta.env)
