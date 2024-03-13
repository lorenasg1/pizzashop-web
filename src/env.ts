import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  // VITE_API_URL: z.string().url().default('http://localhost:50789'),
  VITE_API_URL: z.string(),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'false'),
})

export const env = envSchema.parse(import.meta.env)
