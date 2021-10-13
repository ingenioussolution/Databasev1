import express from 'express'
import {
  getModelTemporalList,
  registerModelTemporal,
  updateModelTemporal,
} from '../controllers/modelTemporalController.js'

const route = express.Router()

route.get('/', getModelTemporalList)
route.post('/', registerModelTemporal)
route.put('/:phone', updateModelTemporal)

export default route
