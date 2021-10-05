import express from 'express'
import {
  getPhoneList,
  registerPhoneList,
  updatePhoneList,
} from '../controllers/phoneListController.js'

const route = express.Router()

route.get('/', getPhoneList)
route.post('/', registerPhoneList)
route.put('/:phone', updatePhoneList)

export default route
