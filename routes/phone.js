const express = require('express')

const route = express.Router()

// phone list Model
const Phone = require('../models/phone')

// @routes GET /phone
// @des GET All Phone
route.get('/', async (req, res) => {
    try {
      const phone = await Phone.find()
      if (!phone) throw Error('Not items')
      res.status(200).json(phone)
    } catch (err) {
      res.status(400).json({ msg: err })
    }
  })

// @routes POST /phone
// @des Register an Phone
route.post('/', async (req, res) => {
    const newPhone = new Phone(req.body)
    try {
      const phone = await newPhone.save()
      if (!phone) throw Error('Something went wrong saving the phone')
  
      res.status(200).json(phone)
    } catch (err) {
      res.status(400).json({ msg: err })
    }
  })

  module.exports = route