import express from 'express'
import {
  getCarrier,
  registerCarrier,
} from '../controllers/carrierController.js'

const router = express.Router()

router.get('/', getCarrier)
router.post('/', registerCarrier)

export default router