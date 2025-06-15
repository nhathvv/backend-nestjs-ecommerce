import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
config()
if (!fs.existsSync(path.resolve('.env'))) {
  console.log(`Not found file .env!`)
  process.exit(1)
}
const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  SECRET_API_KEY: z.string(),
})
function validateEnv(config: Record<string, unknown>) {
  const result = EnvSchema.safeParse(config)
  if (!result.success) {
    result.error.errors.forEach((err) => {
      console.error(`- ${err.path.join('.')}: ${err.message}`)
    })
    process.exit(1)
  }
  return result.data
}

const envConfig = validateEnv(process.env)
export default envConfig
