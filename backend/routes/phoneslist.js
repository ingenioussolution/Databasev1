import express from 'express'
import {
  getPhoneList,
  registerPhoneList,
  updatePhoneList,
  AddPhoneList,
  getPhoneListFrontEnd,
  getPhoneListByStatus,
  getPhoneListByCreditScore,
  getPhoneListFrontEnd1,
} from '../controllers/phoneListController.js'

import {UploadData, getPhoneListPagination} from '../controllers/UploadPhoneList.js'
const route = express.Router()

route.get('/', getPhoneListFrontEnd)
route.get('/status', getPhoneListByStatus)
route.get('/pagination', getPhoneListPagination)
route.get('/filters', getPhoneListFrontEnd1)
route.post('/', registerPhoneList)
route.post('/register-data', AddPhoneList)
route.post('/register-data-temporal', UploadData)
route.post('/register-clean-data', getPhoneList)
route.put('/:phone', updatePhoneList)

export default route
