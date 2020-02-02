import { createLogger } from 'bunyan'

const version = process.env.VERSION
const newLogger = (name: string) => createLogger({
  name,
  version,
  src: process.env.NODE_ENV === 'development'
})

export default newLogger
