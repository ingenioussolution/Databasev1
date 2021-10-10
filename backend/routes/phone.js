import express from 'express'
import {
  getPhone,
  registerPhone,
} from '../controllers/phoneController.js'

const router = express.Router()

router.get('/', getPhone)
router.post('/', registerPhone)

export default router