import { createLogger } from 'bunyan'

const newLogger = (name: string, revision = process.env.REVISON || 'n/a') => createLogger({
  name,
  revision,
  src: process.env.NODE_ENV === 'development'
})

export default newLogger
