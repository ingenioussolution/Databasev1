import express from 'express'
import {
  getTemporal,
  registerModelTemporal,
  updateModelTemporal,
} from '../controllers/TemporalDataController.js'

const route = express.Router()

route.get('/', getTemporal)
route.post('/', registerModelTemporal)
route.put('/:phone', updateModelTemporal)

export default route
