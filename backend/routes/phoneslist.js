import express from 'express'
import {
  getPhoneList,
  registerPhoneList,
  updatePhoneList,
  AddPhoneList,
  getPhoneListFrontEnd,

} from '../controllers/phoneListController.js'

const route = express.Router()

route.get('/', getPhoneListFrontEnd)
route.post('/', registerPhoneList)
route.post('/register-data-temporal', AddPhoneList)
route.post('/register-clean-data', getPhoneList)

route.put('/:phone', updatePhoneList)


export default route
