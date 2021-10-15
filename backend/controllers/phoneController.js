// phone list Model
import Phone from '../models/phone.js'
import asyncHandler from 'express-async-handler'

// @routes GET /phone
// @des GET All Phone
export const getPhone = async (req, res) => {
  try {
    const phone = await Phone.find()
    if (!phone) throw Error('Not items')
    res.status(200).json(phone)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

// @routes POST /phone
// @des Register an Phone
export const registerPhone = async (req, res) => {
  const newPhone = new Phone(req.body)
  try {
    const phone = await newPhone.save()
    if (!phone) throw Error('Something went wrong saving the phone')

    res.status(200).json(phone)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}


// @desc     Delete talent
// @route    Delete /api/talents/:id
// @access   Private/Admin
export const deletePhone = asyncHandler(async (req, res, next) => {
  try {
    const phone = await Phone.findById(req.params.id)
    if (phone) {
      await phone.remove()
      res.json({ message: 'Talent removed' })
    } else {
      res.status(404)
      throw new Error('Talent not found')
    }
  } catch (error) {
    next(error)
  }
})