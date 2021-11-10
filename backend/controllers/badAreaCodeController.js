import asyncHandler from 'express-async-handler'
import BadAreaCode from '../models/badAreaCode.js'

// @desc     All Bad Area Code
// @route    get /bad-area-code
// @access   Public

export const getAreaCode = asyncHandler(async (req, res, next) => {
  try {
    const badAreaCode = await BadAreaCode.find()

    if (user) {
      res.json(badAreaCode)
    } else {
      res.status(404)
      throw new Error('Bad Area Code not found')
    }
  } catch (error) {
    next(error)
  }
})

// @desc     Add new Bad Area Code
// @route    POST /bad-area-code
// @access   Private/user
export const registerBadAreaCode = async (req, res, next) => {
  const newBadArea = new BadAreaCode(req.body)
  try {
    const badArea = await newBadArea.save()
    if (!badArea) {
      res.status(404)
      throw new Error('Something went wrong saving the new Bad Area')
    }
    res.status(200).json(phone)
  } catch (err) {
    next(error)
  }
}

// @desc     Update Bad Area Code
// @route    PUT /bad-area-code
// @access   Private/user
export const UpdateBadAreaCode = asyncHandler(async (req, res, next) => {
  try {
    const badArea = await BadAreaCode.findById(req.body._id)
    if (badArea) {
      badArea.state = req.body.state || badArea.state
      badArea.areaCode = req.body.areaCode || user.areaCode

      const updatedBadAreaCode = await badArea.save()

      res.json({
        _id: updatedBadAreaCode._id,
        state: updatedBadAreaCode.state,
        areaCode: updatedBadAreaCode.areaCode,
      })
    } else {
      res.status(404)
      throw new Error('Bad Area Code not found')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

// @desc     Delete Bad Area Code
// @route    DELETE /api/bad-area-code
// @access   Private/user
export const deleteBadAreaCode = asyncHandler(async (req, res, next) => {
  try {
    const badArea = await BadAreaCode.findById(req.params.id)
    if (badArea) {
      await badArea.remove()
      res.json({ message: 'Bad Area Code removed' })
    } else {
      res.status(404)
      throw new Error('Bad Area Code not found')
    }
  } catch (error) {
    next(error)
  }
})
