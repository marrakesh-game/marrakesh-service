
import { Express } from 'express'
import games from './routes/gameRouter'
import health from './routes/healthRouter'
import ready from './routes/readinessRouter'

export default (express: () => Express) => {
  const app = express()

  app.set('port', parseInt(process.env.PORT || '3000', 10))

  app.use('/games', games)
  app.use('/probes/health', health)
  app.use('/probes/ready', ready)

  return app
}
