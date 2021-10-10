import express from 'express'
import {
  getPhoneCarrier,
  registerPhoneCarrier,
} from '../controllers/carrierController.js'

const router = express.Router()

router.get('/', getPhoneCarrier)
router.post('/', registerPhoneCarrier)

export default router