// carrier Model
import Carrier from '../models/carrier.js'
import asyncHandler from 'express-async-handler'

// @routes GET /carrier
// @des GET All PhoneCarrier
export const getPhoneCarrier = async (req, res) => {
  try {
    const carrier = await Carrier.find({})
    if (!carrier) throw Error('Not items')
    res.status(200).json(carrier)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

// @routes POST /carrier
// @des Register an PhoneCarrier
export const registerPhoneCarrier = asyncHandler(async (req, res, next) => {
  try {
    const { phone, name, wireless, status, results } = req.body
    const phoneExists = await Carrier.findOne({ phone: phone })
    console.log(phoneExists)
    if (phoneExists) throw Error('Carrier already exists')

    const carrier = await Carrier.create({
      phone,
      name,
      wireless,
      status,
      results,
    })
    console.log(carrier)
    if (carrier) {
      res.status(201).json({
        _id: carrier._id,
        phone: carrier.phone,
        name: carrier.name,
        wireless: carrier.wireless,
        status: carrier.status,
        results: carrier.results,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    next(error)
  }
})
