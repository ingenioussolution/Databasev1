import express from 'express'
import multer from 'multer'
import path from 'path'
import csvtojson from 'csvtojson'
import BlackList from '../models/apiBlackListModel.js'
import {getApiDataList, getCleanPhone,ImportApiData} from '../controllers/blackListController.js'
import { protect } from '../middlewere/authMiddlewere.js'
import mongoose from 'mongoose'

const router = express.Router()

// list API Black List Routes
router.get('/', getApiDataList)
router.post('/clean-bl-api', getCleanPhone )
router.post('/import-bl-api', ImportApiData)


// Multer Upload Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploadApi/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}${path.extname(file.originalname)}`)
  },
})

// Filter for CSV file
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true)
  } else {
    cb('Please upload only csv file.', false)
  }
}
const upload = multer({
  storage,
  fileFilter: csvFilter,
})

let temp
let csvData = []
let NewArray = []
let size = 2000
router.post('/uploadApi', upload.single('file'), async (req, res) => {
  try {
    const user = req.query.user
    if (req.file === undefined) {
      return res.status(400).send({
        message: 'Please upload a CSV file!',
      })
    }

    csvtojson({ ignoreEmpty: true, fork: false })
      .fromFile(req.file.path)
      .then((jsonObj) => {
        if (jsonObj) {
          console.log('jsonObj: ', jsonObj.length)

          let duplicate = 0

          const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
              NewArray.push(arr.slice(i * size, i * size + size))
            )
          console.log('chunk', chunk(jsonObj, size))
          console.log('NewArray', NewArray.length)

          for (let x = 0; x < NewArray.length; x++) {
            NewArray[x].reduce(async (prev, data) => {
              await prev

              if (data.blackListAlliance) {
                temp = Boolean(data.blackListAlliance)
                data.blackListAlliance = temp
              }

              if(!data.user){
                data.user = mongoose.Types.ObjectId(user)
                temp =  data.user
                data.user = temp
              }

              csvData.push(data)

             console.log(data);
              BlackList.insertMany(data, (err) => {
                if (err) console.log('duplicate', data.phone, duplicate++)
              })
              let count = await BlackList.countDocuments()
              if (csvData.length === jsonObj.length) {
                csvData = []
                NewArray = []
                console.log('complete!!!')
                return res.json({
                  message:
                    'Upload/import the CSV data into database successfully',
                  total: count,
                  duplicate: duplicate,
                })
              }

              return Promise.resolve()
            }, Promise.resolve())
          }
        }
      })
  } catch (error) {
    console.log('catch error-', error)
    if (res.status(503)) {
      res.status(503).send({
        message: 'Upload in progress',
      })
    }

    return res.status(500).send({
      message: 'Could not upload the file: ' + req.file.originalname,
    })
  }
})
export default router
