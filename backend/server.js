import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import fs from 'fs'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewere/errorMiddlewere.js'


//Routes
import phoneslistRoutes from './routes/phoneslist.js'
import phoneRoutes from './routes/phone.js'
import carrierRoutes from './routes/carrierRouters.js'
import ModelTemporal from './routes/TemporalDataRouters.js'
import userRoutes from './routes/userRoutes.js'
import badAreaCodeRoutes from './routes/badAreaCodeRouters.js'
import settingsRoutes from './routes/siteSettingsRoutes.js'
import uploadRoutes from './routes/uploadCsvRoutes.js'
import homeFilter from './routes/homeFilterRouters.js'
import partner from './routes/partnerRouters.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const envFile = path.join(dirname, `../.env.${process.env.NODE_ENV}`)
const exists = fs.existsSync(envFile)

if (process.env.NODE_ENV && exists) {
  dotenv.config({
    path: envFile,
  })
} else dotenv.config()

connectDB()
const app = express()

//Body Parser Middleware
app.use(express.json())

app.use(cors())
app.options('*', cors())

// Use routes
app.use('/phoneslist', phoneslistRoutes)
app.use('/users', userRoutes)
app.use('/phone', phoneRoutes)
app.use('/carrier', carrierRoutes)
app.use('/data-temporal', ModelTemporal)
app.use('/bad-area-code', badAreaCodeRoutes)
app.use('/settings', settingsRoutes)
app.use('/upload-csv', uploadRoutes)
app.use('/filters', homeFilter)
app.use('/partners', partner)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.SITE_LIVE === 'true') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5002
app.listen(PORT, () => console.log(`Server run at port ${PORT}`))
