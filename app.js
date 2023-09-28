import express, { json } from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies.js'
import 'dotenv/config'

const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(cors())

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})