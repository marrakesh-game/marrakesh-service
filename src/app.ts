import { Express } from 'express'
import games from './routes/gameRouter'
import players from './routes/playerRouter'
import health from './routes/healthRouter'
import ready from './routes/readinessRouter'

export default (express: () => Express) => {
  const app = express()

  app.set('port', parseInt(process.env.PORT || '3000', 10))

  app.use('/players', players)
  app.use('/games', games)
  app.use('/probes/health', health)
  app.use('/probes/ready', ready)

  return app
}
