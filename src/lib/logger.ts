import { createLogger } from 'bunyan'

const newLogger = (name: string) => createLogger({
  name
})

export default newLogger