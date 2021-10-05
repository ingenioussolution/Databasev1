import express from 'express'
import {
  getPhone,
  registerPhone,
} from '../controllers/phoneController.js'

const route = express.Router()

route.get('/', getPhone)
route.post('/', registerPhone)

export default route