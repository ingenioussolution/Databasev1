import express from 'express'
import multer from 'multer'
import path from 'path'
import csvtojson from 'csvtojson'
import TemporalData from '../models/TemporalData.js'

const router = express.Router()
import { protect } from '../middlewere/authMiddlewere.js'

// Multer Upload Storage
// `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'upload/')
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

const size = 10000
// Import csv file slot

router.post('/add-csv', protect, upload.single('file'), async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({
        message: 'Please upload a CSV file!',
      })
    }
    csvtojson({ ignoreEmpty: true, maxRowLength: 65535, fork: false })
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
            NewArray[x].map(async (z) => {
              if (z.clicker) {
                temp = Boolean(z.clicker)
                z.clicker = temp
              }
              if (z.converter) {
                temp = Boolean(z.converter)
                z.converter = temp
              }
              if (z.hardBounce) {
                temp = Boolean(z.hardBounce)
                z.hardBounce = temp
              }
              if (z.suppressed) {
                temp = Boolean(z.suppressed)
                z.suppressed = temp
              }
              if (z.recentAbuse) {
                temp = Boolean(z.recentAbuse)
                z.recentAbuse = temp
              }
              if (z.validMobile) {
                temp = Boolean(z.validMobile)
                z.validMobile = temp
              }
              if (z.blackListAlliance) {
                temp = Boolean(z.blackListAlliance)
                z.blackListAlliance = temp
              }
              if (z.prepaid) {
                temp = Boolean(z.prepaid)
                z.prepaid = temp
              }

              if (z.validity) {
                temp = Boolean(z.validity)
                z.validity = temp
              }
              if (z.risky) {
                temp = Boolean(z.risky)
                z.risky = temp
              }
              if (z.burstOptOut) {
                temp = Boolean(z.burstOptOut)
                z.burstOptOut = temp
              }
            })

            NewArray[x].map(async (data) => {
              const uniquePhone = await TemporalData.findOne({
                phone: data.phone,
              })
              csvData.push(data)
              if (!uniquePhone) {
                try {
                  TemporalData.insertMany(data, (err) => {
                    if (err) console.log('duplicate', data.phone)
                  })

                  console.log('Upload/import successfully')
                } catch (e) {}
              } else {
                console.log('duplicate', duplicate++)
              }
              let rowsAll = csvData.length
              let count = await TemporalData.countDocuments()
              if (rowsAll === jsonObj.length) {
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
            })
          }
        }
      })
  } catch (error) {
    console.log('catch error-', error)
    return res.status(500).send({
      message: 'Could not upload the file: ' + req.file.originalname,
    })
  }
})
//------------ using now ---- file upload csv faster ----
router.post('/test', upload.single('file'), async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({
        message: 'Please upload a CSV file!',
      })
    }

    csvtojson({ ignoreEmpty: true, maxRowLength: 65535, fork: false })
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
              if (data.clicker) {
                temp = Boolean(data.clicker)
                data.clicker = temp
              }
              if (data.converter) {
                temp = Boolean(data.converter)
                data.converter = temp
              }
              if (data.hardBounce) {
                temp = Boolean(data.hardBounce)
                data.hardBounce = temp
              }
              if (data.suppressed) {
                temp = Boolean(data.suppressed)
                data.suppressed = temp
              }
              if (data.recentAbuse) {
                temp = Boolean(data.recentAbuse)
                data.recentAbuse = temp
              }
              if (data.validMobile) {
                temp = Boolean(data.validMobile)
                data.validMobile = temp
              }
              if (data.blackListAlliance) {
                temp = Boolean(data.blackListAlliance)
                data.blackListAlliance = temp
              }
              if (data.prepaid) {
                temp = Boolean(data.prepaid)
                data.prepaid = temp
              }

              if (data.validity) {
                temp = Boolean(data.validity)
                data.validity = temp
              }
              if (data.risky) {
                temp = Boolean(data.risky)
                data.risky = temp
              }
              if (data.burstOptOut) {
                temp = Boolean(data.burstOptOut)
                data.burstOptOut = temp
              }

              csvData.push(data)
              console.log(csvData.length)
              TemporalData.insertMany(data, (err) => {
                if (err) console.log('duplicate', data.phone, duplicate++)
              })
              let count = await TemporalData.countDocuments()
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
    return res.status(500).send({
      message: 'Could not upload the file: ' + req.file.originalname,
    })
  }
})

export default router 
