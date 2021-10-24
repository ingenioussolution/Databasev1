import express from 'express'
import {
  getPhoneList,
  registerPhoneList,
  updatePhoneList,
  AddPhoneList,
  getPhoneListFrontEnd,
  getPhoneListByStatus,
getPhoneListByCreditScore,
getPhoneListByCombineFilters,
} from '../controllers/phoneListController.js'

const route = express.Router()

route.get('/', getPhoneListFrontEnd)
route.get('/status', getPhoneListByStatus)
route.get('/credit-score', getPhoneListByCreditScore)
route.get('/filters', getPhoneListByCombineFilters)
route.post('/', registerPhoneList)

route.post('/register-data-temporal', AddPhoneList)
route.post('/register-clean-data', getPhoneList)

route.put('/:phone', updatePhoneList)


export default route
