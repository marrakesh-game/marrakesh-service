import express from 'express'
import games from './routes/gameRouter'
const app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => res.sendStatus(200))

app.use('/games', games)
export default app
