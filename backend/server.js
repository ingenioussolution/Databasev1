import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewere/errorMiddlewere.js'


//Routes
import phoneslistRoutes from './routes/phoneslist.js'
import phoneRoutes from './routes/phone.js'
import carrierRoutes from './routes/carrierRouters.js'
import ModelTemporal from './routes/TemporalDataRouters.js'

dotenv.config()
connectDB()
const app = express()

//Body Parser Middleware
app.use(express.json())

app.use(cors())
app.options('*', cors())

// Use routes
app.use('/phoneslist', phoneslistRoutes)
app.use('/phone', phoneRoutes)
app.use('/carrier', carrierRoutes)
app.use('/data-temporal', ModelTemporal)

app.get('/', (req, res) => {
  res.send('Hello from node')
})

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5002
app.listen(PORT, () => console.log(`Server run at port ${PORT}`))
