import express from 'express'
import multer from 'multer'
import path from 'path'
import csvtojson from 'csvtojson'
import TemporalData from '../models/TemporalData.js'
<<<<<<< HEAD
=======
   
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0

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
<<<<<<< HEAD
})
=======
}) 
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0

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

<<<<<<< HEAD
=======

>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
let temp
let csvData = []
let NewArray = []
let insertData = []

const size = 10000
// Import csv file
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({
        message: 'Please upload a CSV file!',
      })
<<<<<<< HEAD
    }
=======
      
    }
  
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0

    csvtojson({ ignoreEmpty: true, maxRowLength: 65535 })
      .fromFile(req.file.path)
      .then((jsonObj) => {
        if (jsonObj) {
          console.log('jsonObj: ', jsonObj.length)

          const chunk = (arr, size) =>
            Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
              NewArray.push(arr.slice(i * size, i * size + size))
            )
          console.log('chunk', chunk(jsonObj, size))
          console.log('NewArray', NewArray.length)

          for (let x = 0; x < NewArray.length; x++) {
            //console.log('length: ', NewArray[x].length)
            //console.log('x: ', x)

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

              insertData.push(z)
            })
            NewArray[x].map(async (data) => {
              const uniquePhone = await TemporalData.findOne({
                phone: data.phone,
              })

              csvData.push(data)
              console.log('csvData: ', csvData.length)
              // if (uniquePhone) {
              //   console.log('phone exist')
              // }
              if (!uniquePhone) {
                //console.log('phone NO exist')

                await TemporalData.insertMany(data, (err) => {
                  console.log('New')

                  if (err) {
                    return console.log(err)
                  }
                })
              }
              let rowsAll = csvData.length
              if (rowsAll === jsonObj.length) {
                csvData = []
                NewArray = []
                console.log('complete!!!')
                return res.json({
                  message:
                    'Upload/import the CSV data into database successfully',
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
//----------------

router.post('/add-csv', protect, upload.single('file'), async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({
        message: 'Please upload a CSV file!',
      })
    }
<<<<<<< HEAD
    csvtojson({ ignoreEmpty: true, maxRowLength: 65535, fork: false })
      .fromFile(req.file.path)
      .then((jsonObj) => {
        if (jsonObj) {
=======
    csvtojson({ ignoreEmpty: true, maxRowLength: 65535, fork:false })
      .fromFile(req.file.path)
      .then((jsonObj) => {
        if (jsonObj) {  
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
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
<<<<<<< HEAD
=======
                  //
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
                  TemporalData.insertMany(data, (err) => {
                    if (err) console.log('duplicate', data.phone)
                  })

                  console.log('Upload/import successfully')
                } catch (e) {}
<<<<<<< HEAD
=======
                // process.exit()
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
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
//----------------
router.post('/test', upload.single('file'), async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({
        message: 'Please upload a CSV file!',
      })
    }

<<<<<<< HEAD
    csvtojson({ ignoreEmpty: true, maxRowLength: 65535, fork: false })
=======
    csvtojson({ ignoreEmpty: true })
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
      .fromFile(req.file.path)
      .then((jsonObj) => {
        if (jsonObj) {
          console.log('jsonObj: ', jsonObj.length)
<<<<<<< HEAD

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
=======
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
          //
          jsonObj?.map(async (data) => {
            const uniquePhone = await TemporalData.findOne({
              phone: data.phone,
            })
            csvData.push(data)
            console.log('count csv', csvData.length)
            if (uniquePhone) {
              console.log('phone exist', data.phone)
            }
            if (!uniquePhone) {
              console.log('phone NO exist', data.phone)
              //await allUpload.push(data)

              await TemporalData.insertMany(data, (err) => {
                if (err) {
                  return console.log(err)
                }
              })
            }
            let rowsAll = csvData.length
            // const totalUpload = allUpload.length
            if (csvCount === rowsAll) {
              // console.log('allUpload: ', allUpload.length)
              csvData = []
              //allUpload = []
              return res.json({
                message:
                  'Upload/import the CSV data into database successfully',
                //totalUpload: totalUpload,
                totalRows: csvCount,
              })
            }
          })
>>>>>>> 76be99decc225a1f1b4f07eaab78bbcf1b6026f0
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
