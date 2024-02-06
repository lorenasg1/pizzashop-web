import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:3333'),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'false'),
})

export const env = envSchema.parse(import.meta.env)
