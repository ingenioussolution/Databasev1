import express from 'express'
import {
  getPhoneList,
  registerPhoneList,
  updatePhoneList,
  AddPhoneList,
  getPhoneListFrontEnd,
  getPhoneListByStatus,
  getPhoneListFrontEnd1,
} from '../controllers/phoneListController.js'

import {ExportCSV} from '../controllers/UploadPhoneList.js'

const route = express.Router()

route.get('/', getPhoneListFrontEnd)
route.get('/status', getPhoneListByStatus)
route.get('/filters', getPhoneListFrontEnd1)
route.get('/export-csv', ExportCSV)
route.post('/', registerPhoneList)
route.post('/register-data', AddPhoneList)
route.post('/register-clean-data', getPhoneList)
route.put('/:phone', updatePhoneList)

export default route
