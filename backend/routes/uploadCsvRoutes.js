import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import csv from 'csv-parser'
import csvtojson from 'csvtojson'
import fastcsv from 'fast-csv'
import { fileURLToPath } from 'url'
import TemporalData from '../models/TemporalData.js'

//app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router()

// Multer Upload Storage
// `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'upload/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}${path.extname(file.originalname)}`
    )
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

// Upload CSV file using Express Rest APIs
// router.post('/', upload.single('file'), (req, res) => {
//   try {
//     if (req.file == undefined) {
//       return res.status(400).send({
//         message: 'Please upload a CSV file!',
//       })
//     }

// Import CSV File to MongoDB database
//     let csvData = []
//     const __dirname = path.dirname(fileURLToPath(import.meta.url))
//     let filePath = path.join(__dirname, `../../${req.file.path}`)
//     //.pipe(csv())
//     fs.createReadStream(filePath)
//       .pipe(fastcsv.parse({ headers: true }))
//       .on('data', (row) => {
//         csvData.push(row)
//       })
//       .on('end', () => {
//         console.log('data', csvData)
//         TemporalData.insertMany(csvData, (err, result) => {
//           if (err) console.log(err)
//           if (result) {
//             res.status(200).send({
//               message:
//                 'Upload/import the CSV data into database successfully: ' +
//                 req.file.originalname,
//             })
//             client.close()
//           }
//         })
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: 'Fail to import data into database!',
//           error: err.message,
//         })
//       })
//   } catch (error) {
//     console.log('catch error-', error)
//     res.status(500).send({
//       message: 'Could not upload the file: ' + req.file.originalname,
//     })
//   }
// })

let temp
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({
        message: 'Please upload a CSV file!',
      })
    }
    csvtojson({ ignoreEmpty: true })
      .fromFile(req.file.path)
      .then((jsonObj) => {
        // console.log('jsonObj: ', jsonObj.length)
        for (let x = 0; x < jsonObj.length; x++) {
          temp = Boolean(jsonObj[x].clicker)
          jsonObj[x].clicker = temp
          temp = Boolean(jsonObj[x].converter)
          jsonObj[x].converter = temp
          temp = Boolean(jsonObj[x].hardBounce)
          jsonObj[x].hardBounce = temp
          temp = Boolean(jsonObj[x].suppressed)
          jsonObj[x].suppressed = temp
          temp = Boolean(jsonObj[x].recentAbuse)
          jsonObj[x].recentAbuse = temp
          temp = Boolean(jsonObj[x].validMobile)
          jsonObj[x].validMobile = temp
          temp = Boolean(jsonObj[x].blackListAlliance)
          jsonObj[x].blackListAlliance = temp
          temp = Boolean(jsonObj[x].prepaid)
          jsonObj[x].prepaid = temp
          temp = Boolean(jsonObj[x].validity)
          jsonObj[x].validity = temp
          temp = Boolean(jsonObj[x].risky)
          jsonObj[x].risky = temp
          temp = Boolean(jsonObj[x].burstOptOut)
          jsonObj[x].burstOptOut = temp
          temp = parseFloat(jsonObj[x].monthlyIncome)
          jsonObj[x].monthlyIncome = temp
          temp = parseFloat(jsonObj[x].fraudScore)
          jsonObj[x].fraudScore = temp
        }

        jsonObj.map(async (data) => {
          const uniquePhone = await TemporalData.findOne({ phone: data.phone })
          if (uniquePhone) {
            console.log('phone exist', data.phone)
          } else {
            console.log('phone NO exist', data.phone)
            TemporalData.insertMany(data, (err, result) => {
              if (err) console.log(err)
              if (result) {
                res.status(200).send({
                  message:
                    'Upload/import the CSV data into database successfully: ' +
                    req.file.originalname,
                })
              }
            })
          }
        })
      })
  } catch (error) {
    console.log('catch error-', error)
    res.status(500).send({
      message: 'Could not upload the file: ' + req.file.originalname,
    })
  }
})

export default router
