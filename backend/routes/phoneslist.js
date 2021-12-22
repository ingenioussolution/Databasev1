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

import { ExportCSV } from '../controllers/UploadPhoneList.js'
import {ImportDataAll, DeleteWrongPhone} from '../controllers/importDataController.js'

import { protect } from '../middlewere/authMiddlewere.js'

const route = express.Router()

route.get('/', protect, getPhoneListFrontEnd)
route.get('/status', getPhoneListByStatus)
route.get('/filters', getPhoneListFrontEnd1)
route.get('/export-csv', protect, ExportCSV)
route.post('/', registerPhoneList)
route.post('/register-data', AddPhoneList)
route.post('/import-data', ImportDataAll)
route.post('/register-clean-data', getPhoneList)
route.put('/:phone', updatePhoneList)
route.delete('/delete-phones', DeleteWrongPhone)

export default route