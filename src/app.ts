import express from 'express'
import games from './routes/gameRouter'
import health from './routes/healthRouter'
import ready from './routes/readinessRouter'
const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => res.sendStatus(200))

app.use('/games', games)
app.use('/health', health)
app.use('/ready', ready)
export default app
