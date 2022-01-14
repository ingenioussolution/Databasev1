import CleanData from '../models/cleanDataModel.js'
import PhoneList from '../models/phoneslist.js'
import ExistData from '../models/existDataModel.js'
import asyncHandler from 'express-async-handler'

export const CleanOldData = asyncHandler(async (req, res, next) => {
  const cursor = CleanData.find({}).cursor()
  for (let ph = await cursor.next(); ph != null; ph = await cursor.next()) {
    const phoneExists = await PhoneList.findOne({
      phone: ph.phone,
    })

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
  }
  res.status(201).json({
    message: 'Import Successfully !!!!',
  })
})
