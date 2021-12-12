import express from 'express'
import {
  getModelTemporalList,
  getTemporal,
  registerModelTemporal,
  updateModelTemporal,
} from '../controllers/TemporalDataController.js'

const route = express.Router()

route.get('/', getTemporal)
route.get('/get-temp', getModelTemporalList)
route.post('/', registerModelTemporal)
route.put('/:phone', updateModelTemporal)

export default route
