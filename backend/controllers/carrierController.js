// carrier Model
import Carrier from '../models/carrierModel.js'
import asyncHandler from 'express-async-handler'

// @routes GET /carrier
// @des GET All PhoneCarrier
export const getCarrier = async (req, res) => {
  try {
    const listCarrier = await Carrier.find({})
    if (listCarrier) {
      res.json(listCarrier)
      
    } else {
      throw Error('Not items')
    }
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

// @routes POST /carrier
// @des Register an PhoneCarrier
export const registerCarrier = asyncHandler(async (req, res, next) => {
  try {
    const { carrier, status } = req.body
    const carrierExists = await Carrier.findOne({
      carrier: { $regex: `${carrier}`, $options: 'i' },
    })

    if (carrierExists) throw Error('Carrier already exists')

    const carrierList = await Carrier.create({
      carrier,
      status,
    })

    if (carrierList) {
      res.status(201).json({
        _id: carrier._id,
        name: carrier.name,
        status: carrier.status,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    next(error)
  }
})
