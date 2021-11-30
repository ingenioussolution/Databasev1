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
let allUpload = []
// Import csv file
router.post('/', protect, upload.single('file'), async (req, res) => {
  console.log(req.body.progress);
  try {
    if (req.file === undefined) {
      return res.status(400).send({
        message: 'Please upload a CSV file!',
      })
    }
    csvtojson({ ignoreEmpty: true })
      .fromFile(req.file.path)
      .then((jsonObj) => {
        if (jsonObj) {
          console.log('jsonObj: ', jsonObj.length)
          const csvCount = jsonObj.length
          for (let x = 0; x < jsonObj.length; x++) {
            if (jsonObj[x].clicker) {
              temp = Boolean(jsonObj[x].clicker)
              jsonObj[x].clicker = temp
            }
            if (jsonObj[x].converter) {
              temp = Boolean(jsonObj[x].converter)
              jsonObj[x].converter = temp
            }
            if (jsonObj[x].hardBounce) {
              temp = Boolean(jsonObj[x].hardBounce)
              jsonObj[x].hardBounce = temp
            }
            if (jsonObj[x].suppressed) {
              temp = Boolean(jsonObj[x].suppressed)
              jsonObj[x].suppressed = temp
            }
            if (jsonObj[x].recentAbuse) {
              temp = Boolean(jsonObj[x].recentAbuse)
              jsonObj[x].recentAbuse = temp
            }
            if (jsonObj[x].validMobile) {
              temp = Boolean(jsonObj[x].validMobile)
              jsonObj[x].validMobile = temp
            }
            if (jsonObj[x].blackListAlliance) {
              temp = Boolean(jsonObj[x].blackListAlliance)
              jsonObj[x].blackListAlliance = temp
            }
            if (jsonObj[x].prepaid) {
              temp = Boolean(jsonObj[x].prepaid)
              jsonObj[x].prepaid = temp
            }

            if (jsonObj[x].validity) {
              temp = Boolean(jsonObj[x].validity)
              jsonObj[x].validity = temp
            }
            if (jsonObj[x].risky) {
              temp = Boolean(jsonObj[x].risky)
              jsonObj[x].risky = temp
            }
            if (jsonObj[x].burstOptOut) {
              temp = Boolean(jsonObj[x].burstOptOut)
              jsonObj[x].burstOptOut = temp
            }
          }
          jsonObj?.map(async (data) => {
            const uniquePhone = await TemporalData.findOne({
              phone: data.phone,
            })
            csvData.push(data)
            console.log('count csv', csvData.length)
            if (uniquePhone) {
              console.log('phone exist', data.phone)
            } if(!uniquePhone) {
              console.log('phone NO exist', data.phone)
              await allUpload.push(data)
              await TemporalData.insertMany(data, (err) => {
                
                if (err) {
                  return console.log(err)
                }
              })
            }

            let rowsAll = csvData.length
            const totalUpload = allUpload.length
            if (csvCount === rowsAll) {
              console.log('allUpload: ', allUpload.length)
              csvData = []
              allUpload = []
              return res.json({
                message:
                  'Upload/import the CSV data into database successfully',
                 totalUpload: totalUpload,
                 totalRows: csvCount
              })
            }
          })
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
