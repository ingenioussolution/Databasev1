import CleanData from '../models/cleanDataModel.js'
import PhoneList from '../models/phoneslist.js'
import ExistData from '../models/existDataModel.js'
import asyncHandler from 'express-async-handler'

export const CleanOldData = asyncHandler(async (req, res, next) => {
  // let requestCount = 100 //parseInt(req.query.count) || 100000
  // let count = await CleanData.countDocuments()
  // const skipCount = 100
  // const total = Math.ceil(count / requestCount)

  const cursor = CleanData.find({}).cursor()
  for (let ph = await cursor.next(); ph != null; ph = await cursor.next()) {
    const phoneExists = await PhoneList.findOne({
      phone: ph.phone,
    })
    //console.log(ph.phone)

    if (phoneExists) {
      console.log('Phone Exists')

      const modelExist = await ExistData.findOne({
        phone: ph.phone,
      })

      if (modelExist) {
        const DeletePhone = await CleanData.findOne({
          phone: ph.phone,
        })
        if (DeletePhone) {
          console.log('Phone Update delete')
          await DeletePhone.remove()
        } else {
          res.status(404)
          throw new Error('Phone not found')
        }
      } else {
        const phoneCreated = await ExistData.create({
          firstName: ph.firstName,
          lastName: ph.lastName,
          phone: ph.phone,
          source: ph.source,
        })

        if (phoneCreated) {
          const DeletePhone = await CleanData.findOne({
            phone: ph.phone,
          })
          if (DeletePhone) {
            console.log('Phone Update delete')
            await DeletePhone.remove()
          } else {
            res.status(404)
            throw new Error('Phone not found')
          }
        } else {
          res.status(400)
          throw new Error('Invalid Phone data')
        }
      }
    } else {
      console.log('New phone')
    }

    // console.log('count: ', count)

    // for (let i = 1; i <= total; i++) {
    //   console.log('i:', i, total)

    //   const TemporalData = await CleanData.find({})
    //     .limit(requestCount)
    //     .skip(skipCount * (i - 1)).lean()

    //   console.log('TemporalData', TemporalData.length)

    // if (TemporalData) {
    //   console.log('start')
    //   await TemporalData?.forEach(async (prev, phoneCount) => {
    //     await prev
    //     const phoneExists = await PhoneList.findOne({
    //       phone: TemporalData[phoneCount].phone,
    //     })

    //     if (phoneExists) {
    //       console.log('Phone Exists')

    //       const modelExist = await ExistData.findOne({
    //         phone: TemporalData[phoneCount].phone,
    //       })

    //       if (modelExist) {
    //         const DeletePhone = await CleanData.findOne({
    //           phone: TemporalData[phoneCount].phone,
    //         })
    //         if (DeletePhone) {
    //           console.log('Phone Update delete')
    //           await DeletePhone.remove()
    //         } else {
    //           res.status(404)
    //           throw new Error('Phone not found')
    //         }
    //       } else {
    //         const phoneCreated = await ExistData.create({
    //           firstName: TemporalData[phoneCount].firstName,
    //           lastName: TemporalData[phoneCount].lastName,
    //           phone: TemporalData[phoneCount].phone,
    //           source: TemporalData[phoneCount].source,
    //         })

    //         if (phoneCreated) {
    //           const DeletePhone = await CleanData.findOne({
    //             phone: TemporalData[phoneCount].phone,
    //           })
    //           if (DeletePhone) {
    //             console.log('Phone Update delete')
    //             await DeletePhone.remove()
    //           } else {
    //             res.status(404)
    //             throw new Error('Phone not found')
    //           }
    //         } else {
    //           res.status(400)
    //           throw new Error('Invalid Phone data')
    //         }
    //       }
    //     } else {
    //       console.log('New phone')
    //     }
    //   }) // end For
    // }
  }
  res.status(201).json({
    message: 'Import Successfully !!!!',
  })
})
