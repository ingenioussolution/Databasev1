import express from 'express'
import {
  getPhoneList,
  RegisterDataList,
  updatePhoneList,
  AddPhoneList,
  getPhoneListFrontEnd,
  getPhoneListFrontEnd1,
  getMasterCCC,
  getCountFilters,
} from '../controllers/phoneListController.js'

import { ExportCSV, Export_Master_CCC_CSV } from '../controllers/UploadPhoneList.js'
import {ImportDataAll} from '../controllers/importDataController.js'

import { protect } from '../middlewere/authMiddlewere.js'

const route = express.Router()
route.get('/', protect, getPhoneListFrontEnd)
route.get('/master-ccc', protect, getMasterCCC)
route.get('/count-filter', protect, getCountFilters)
route.get('/filters', getPhoneListFrontEnd1)
route.get('/export-csv', protect, ExportCSV)
route.get('/export-master-ccc-csv', protect, Export_Master_CCC_CSV)
route.post('/', RegisterDataList)
route.post('/register-data', AddPhoneList)
route.post('/import-data', ImportDataAll)
route.post('/register-clean-data', getPhoneList)
route.put('/:phone', updatePhoneList)
//route.delete('/delete-phones', DeleteWrongPhone)

export default route